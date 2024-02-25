<script setup>
import { inject, computed, onUpdated, onMounted, watch, ref } from "vue";
import { usemusicStore } from "../../store/music";
import { eventBus } from "../../utils/EventBus";
import playTable from "../Playlist/playTable.vue"
import content from "../contents/contents.vue"
import recentDialog from "../Playlist/recentDialog.vue"

const musicStore = usemusicStore();
const currentTime2 = ref();
const { run, play, paused } = inject("play");
const { SwitchTotheprevious, SwitchTothenext, handleSeek } = inject("autoplay")
const dialogShow = ref(false)
const love = ref(null);
const playTableShow = ref(false);
const playOrder = ref(null);
const contentDialog = ref(false);
const orderShow = ref(0);

// 计算属性法 1
/* 第一种写法中的 Totalsec 变量是基于 currentTime 的值计算得出的，而 currentTime 的值是 musicStore.currentTime 的一个快照（即复制），因此它不会在 musicStore.currentTime 变化时自动更新。如果你希望 Totalsec 能够在 musicStore.currentTime 变化时自动更新，你需要手动在 musicStore.currentTime 变化时更新 currentTime */
const currentTime = ref(musicStore.currentTime);
const calculateTime1 = computed(() => {
	// //console.log('这里是calculate计算属性');
	let Totalsec = currentTime.value; //总秒数
	let min = parseInt((Totalsec / 60) % 60); //分
	let sec = parseInt(Totalsec % 60); //秒
	// //console.log(currentTime.value,Totalsec,min,sec);
	min = min < 10 ? "0" + min : min;
	sec = sec < 10 ? "0" + sec : sec;
	// //console.log(`${min}:${sec}`);
	return `${min}:${sec}`;
});
watch(
	() => musicStore.currentTime,
	(newValue) => {
		currentTime.value = newValue;
	}
);

// 计算属性法 2  最简洁  这种写法直接在 calculateTime1 计算属性中使用 musicStore.currentTime，没有中间变量。这意味着 calculateTime1 会直接监听 musicStore.currentTime 的变化，当 musicStore.currentTime 发生变化时，calculateTime2 会自动更新。
// const calculateTime2 = computed(()=>{
//     let Totalsec = musicStore.currentTime
//     let min = parseInt(Totalsec/60%60) //分
//     let sec = parseInt(Totalsec%60) //秒
//     min = min<10 ? '0'+ min: min;
//     sec = sec<10 ? '0'+ sec : sec;
//     return `${min}:${sec}`
// })

//switch监听法3 显示音乐当前时间
// function f1(v){
//     let Totalsec = v//总秒数
//     let min = parseInt(Totalsec/60%60) //分
//     let sec = parseInt(Totalsec%60) //秒
//     min = min<10 ? '0'+ min: min;
//     sec = sec<10 ? '0'+ sec : sec;
//     // //console.log(`${min}:${sec}`);
//     return `${min}:${sec}`
// }
// // 监听store的当前时间，变化时，传递新的时间
// watch(()=>musicStore.currentTime,(newValue)=>{
//     // //console.log(newValue);
//     // currentTime.value = newValue
//     currentTime2.value = f1(newValue)

// })
// 获得歌曲总时长
function calculateTotalTime() {
	let Totalsec = musicStore.duration; //总秒数
	let min = parseInt((Totalsec / 60) % 60); //分
	let sec = parseInt(Totalsec % 60); //秒
	// 两种写法
	if (min < 10) {
		min = `0${min}`;
	}
	if (sec < 10) {
		sec = `0${sec}`;
	}
	// min = min<10 ? '0'+ min: min;
	// sec = sec<10 ? '0'+ sec : sec;
	return `${min}:${sec}`;
}

function showRecentPlay()
{
    dialogShow.value = true;
}



eventBus.on("addToPlayTable", async (item) =>
{
	let userId = localStorage.getItem("userId");
	playTableShow.value = false;
	let status = await musicStore.addPlayList(userId, item.id, musicStore.getCurrentMusicId());
	if(!status)
	{
		alert("添加失败");
		return;
	}
	love.value.classList.toggle("active");

})

function showPopup(i) {
	show.value[i] = true;
}

function deleteFinish()
{
	for(let i=0; i<show.value.length; i++)
	{
		show.value[i] = false;
	}

}

async function add2Love()
{
	if(love.value.classList.contains("active"))
	{
		// love.value.classList.toggle("active");
		return;
	}
	playTableShow.value = true;
}

async function contentShow()
{
	contentDialog.value = true;
}

function orderTrigger()
{
	orderShow.value = (orderShow.value + 1) % 3;
	musicStore.updateOrder(orderShow.value);
}

onMounted(() =>
{
	//console.log(Object.values(musicStore.playlistInfo).sort((a, b) => b.order - a.order))
})
</script>
<template>
	<div class="songdetailBottom">
		<div class="menu">
			<i class="iconfont icon-aixin1" @click="add2Love()" ref="love"></i>
			<i class="iconfont icon-xiazai"></i>
			<i class="iconfont icon-31haoyou"></i>
			<i class="iconfont icon-pinglun1" @click="contentShow()"></i>
			<i class="iconfont icon-gengduo-shuxiang"></i>
		</div>
		<!-- 进度条 -->
		<div class="process">
			<!-- 对应方法一 -->
			<p>{{ calculateTime1 }}</p>
			<!-- 对应方法二 -->
			<!-- <p>{{currentTime2}}</p> -->
			<input type="range" class="range" min="0" :max="musicStore.duration" step="0.05"
				v-model="musicStore.currentTime" @input="handleSeek" />
			<p>{{ calculateTotalTime() }}</p>
		</div>
		<div class="operate">
			<div class="playOrder" ref="playOrder">
				<i class="iconfont icon-xunhuan" v-show="orderShow == 0" @click="orderTrigger(0)"></i>
				<i class="iconfont icon-xunhuan" v-show="orderShow == 1" @click="orderTrigger(1)"></i>
				<i class="iconfont icon-xunhuan" v-show="orderShow == 2" @click="orderTrigger(2)"></i>
			</div>
			
			<i class="iconfont icon-shangyishoushangyige" @click="SwitchTotheprevious()"></i>
			<div class="playbtn">
				<i v-show="run == false" class="iconfont icon-bofang" @click="play()"></i>
				<i v-show="run == true" class="iconfont icon-zanting1" @click="paused()"></i>
			</div>
			<i class="iconfont icon-xiayigexiayishou" @click="SwitchTothenext()"></i>
			<i class="iconfont icon-24gf-playlist" @click="showRecentPlay()"></i>
		</div>
	</div>

	<van-popup 
		:style="{height : '50%', borderRadius : '20px'}"
		position="bottom"
		v-model:show="dialogShow"
	>
		<recentDialog :musicStore="musicStore"/>
	</van-popup>

	<van-popup
		v-model:show="playTableShow"
		style="width: 100%; border-radius: 20px;background-color: rgb(44, 44, 44); max-height: 350px;"
		class="playTableVan"
	>
		<playTable/>
	</van-popup>

	<!-- <van-popup
		v-model:show="contentDialog"
		style="width: 100%; height: 100%;border: 20px; background-color: linear-gradient(to bottom, #1c2435, #555050);"
		class="contensShow"
	>
		<content/>
	</van-popup> -->
	<van-popup
		:style="{height : '70%', borderRadius : '20px'}"
		position="bottom"
		class="contensShow"
		v-model:show="contentDialog"
	>
		<content class="contentContainer"/>
	</van-popup>
	

</template>
<style scoped>

.icon-aixin1.active{
	color: red;
}

.songdetailBottom {
	height: 13vh;
	width: 100vw;
	position: relative;
}

.menu {
	width: 100vw;
	display: flex;
	justify-content: space-around;
	color: #fff;
	/* font-size: 20px; */
	padding: 10px;
}

.menu i {
	font-size: 30px;
}

/* 进度条盒子 */
.process {
	padding: 0 20px;
	font-size: 14px;
	color: #bfb2b2;
	width: 100vw;
	/* background-color: #bfa; */
	height: 20px;
	display: flex;
	justify-content: space-around;
	align-items: center;
}

/* 进度条 */
.process .range {
	width: 60vw;
	height: 0.3vh;
}

.operate {
	width: 100vw;
	display: flex;
	justify-content: space-around;
	align-items: center;
	color: #fff;
	/* font-size: 20px; */
	padding: 8px 20px 8px;
}

.operate i {
	font-size: 25px;
}

.operate .playbtn i {
	font-size: 40px;
}

.recentDialog{
	position: absolute;
	right: 0;
	bottom: 0;
	border: 1px solid white;
	height: 100%;
	border-radius: 20px;
	width: 100%;
	background-image: linear-gradient(to bottom, #1c2435, #555050);
	padding-top: 20px;
	
}

.list {
	display: flex;
	width: 100%;
	height: 1.2rem;
	/* background-color: red; */
}

.list .serialNumber {

	line-height: 1.2rem;
	text-align: center;
	font-size: 0.45rem;
	width: 15%;
	color: #b7aeae;

}

.list .song {
	width: 70%;
	height: 100%;
	display: flex;
}

.list .song .songInfo {
	width: 78%;
	height: 100%;


}

.list .song .songInfo .songTitle {
	height: 50%;
	font-size: .36rem;
	font-weight: 550;
	color: #dcd8d8;
	margin-top: .1rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	/* line-height: 20%; */

}

.songCreator-wrapper {
	display: flex;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.list .song .songInfo .songCreator {

	height: 50%;
	font-size: .28rem;
	/* font-weight: 550; */
	color: #bab5b5;


}

.list .song .mvicon {
	padding-top: 0.25rem;
	width: 22%;
	padding-right: 0.2rem;
	text-align: right;
}

.list .song .mvicon i {
	font-size: 0.4rem;
	color: #dcd8d8;
}

.more {
	width: 15%;
	padding-top: .1rem;
	text-align: center;
	padding-right: 3%;
}

.more i {
	font-size: 0.6rem;
	color: #dcd8d8;
}

.contentContainer{
	position: absolute;
	right: 0;
	bottom: 0;
	border: 1px solid white;
	height: 100%;
	border-radius: 20px;
	width: 100%;
	background-image: linear-gradient(to bottom, #1c2435, #555050);
	padding-top: 20px;

}
</style>