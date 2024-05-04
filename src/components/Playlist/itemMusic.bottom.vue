<script setup>
import { getPlaylistAll } from '@/request/api/item.js'
import { onMounted, ref } from 'vue';
import FooterMusic from '../UI/FooterMusic.vue';
import { usemusicStore } from '../../store/music';
import itemMusicMore from './itemMusicMore.vue'
import playTable from './playTable.vue';
import {eventBus} from '../../utils/EventBus';

const musicStore = usemusicStore()
const props = defineProps(["playlist", 'local']);
const item = props.playlist;
const tracks = props.playlist.playlist.tracks;
const playTableShow = ref(false);
let currentPlaylist = null;

const show = ref([])
// 计算播放数量
function changeCount(num) {
	if (num > 100000000) {
		return (num / 100000000).toFixed(1) + '亿'
	} else if (num > 10000) {
		return (num / 10000).toFixed(0) + '万'
	} else {
		return num
	}
}
onMounted(() => {
	if (props.playlist.playlist.tracks) {
		show.value = ref(Array(props.playlist.playlist.tracks?.length).fill(false));
	}
	//console.log("item : ", item);
})
function showPopup(i) {
	console.log("show")
	show.value[i] = true;
}

async function playMusic(v, i) {
	let index = await musicStore.addMusicToPlayList(v.id);
	console.log(index);
	musicStore.updatePlay(index || (musicStore.playlist.length - 1));
}


function addToPlayTableEmit(item)
{
	playTableShow.value = true;
	currentPlaylist = item;
}

function changePlayList()
{
	let currTime = new Date().getTime();
	let newList = [];
	item.playlist.tracks.forEach((track, index) =>
	{
		newList.push({
			musicId : track.id,
			order : currTime + index
		})
	})
	console.log(newList)
	musicStore.updatePlayList(newList);
	// musicStore.updatePlayListInfo();
}

eventBus.on("addToPlayTable", async (item) =>
{
	let userId = localStorage.getItem("userId");
	playTableShow.value = false;
	if(!currentPlaylist)
	{
		return;
	}
	let status = await musicStore.addPlayList(userId, item.id, currentPlaylist.id);
	if(!status)
	{
		alert("添加失败");
	}
	currentPlaylist = null;
	for(let i=0; i<show.value.length; i++)
	{
		show.value[i] = false;
	}
})


function deleteFinish()
{
	for(let i=0; i<show.value.length; i++)
	{
		show.value[i] = false;
	}
	location.reload();
}

</script>
<template>
	<div class="bottom-container" style="overflow-y: scroll; height: 80%;">
		<img class="bgimg" :src="item.playlist.coverImgUrl" alt=""/>
		<div class="topbar">
			<div class="topleft">
				<svg class="icon" aria-hidden="true" style="width: 30px;height: 30px;">
					<use xlink:href="#icon-bofang-copy" @click="changePlayList"></use>
				</svg>
				<p>播放全部</p>
				<div>({{ (changeCount(item.playlist.tracks?.length)) }})</div>
			</div>
			<div class="topright">
				<i class="iconfont icon-xiazai1"></i>
				<i class="iconfont icon-24gf-playlistMusic3"></i>
			</div>
		</div>
		<div class="list" v-show="tracks != 0" v-for="(track, i) in item.playlist.tracks" :key="i" >
			<div class="serialNumber" @click="playMusic(track)">{{ i + 1 }}</div>
			<div class="song">
				<div class="songInfo" @click="playMusic(track, i)">
					<div class="songTitle">{{ track.name }}</div>
					<ul class="songCreator-wrapper">
						<li class="songCreator" v-for="(nameitem, index) in track.ar" :key="index">{{
							`${nameitem.name}&nbsp;&nbsp;&nbsp;` }}</li>
					</ul>
					<!-- <div class="songCreator" v-for="(nameitem,index) in track.ar" :key="index">{{ nameitem.name}}</div> -->
				</div>
				<div class="mvicon" v-if="track.mv != 0"><i class="iconfont icon-shipin"></i></div>
			</div>
			<div class="more" @click='showPopup(i)'><i class="iconfont icon-gengduo-shuxiang"></i></div>
			<!-- 歌曲的更多选线遮罩层 -->
			<van-popup v-model:show="show[i]" position="bottom" duration="0.1" round :style="{ height: '50%' }">
				<itemMusicMore :item="track" :i=i :id=track.ar[0].id @addToPlayTableEmit="addToPlayTableEmit(track)" 
					:local="props?.local" :playTableInfo="props.playlist.playlist.playTableInfo"
					@deleteFinish="deleteFinish()"
				></itemMusicMore>
			</van-popup>

			
		</div>
		<!-- <div class="wrapper">
      <FooterMusic></FooterMusic>
    </div> -->
	<van-popup
		v-model:show="playTableShow"
		style="width: 100%; border-radius: 20px;background-color: rgb(44, 44, 44); max-height: 350px;"
		class="playTableVan"
	>
		<playTable class="playTable"/>
	</van-popup>
	</div>
</template>
<style scoped>
.bottom-container {
	/* max-height: calc(100vh-80px); */
	line-height: normal;
	/* height: 65%; */
	width: 100%;
	background-color: #aaa;
	overflow: auto;
	border-radius: 0.45rem 0.45rem 0 0;
	position: relative;
	margin-bottom: 0.9rem;
	height: auto;
}

.bottom-container img {
	width: 100vw;
	height: 100%;
	filter: blur(6rem);
	position: absolute;
	left: 0;
	bottom: 0;
	z-index: -1;
}

.topbar {
	display: flex;
	justify-content: space-between;
	/* color: #fff; */
	color: #222;
	padding: 0.3rem 0.4rem;
	border-radius: 0.45rem 0.45rem 0 0;
	border-bottom: 0.02rem solid rgb(197, 188, 188);
}

.topbar .topleft {
	display: flex;
	width: 50%;
	justify-content: space-between;
	align-items: center;
}

.topbar .topleft p {
	font-size: 0.35rem;
}

.topbar .topleft div {
	/* color: rgb(177, 191, 201); */
}

.topbar .topright {
	display: flex;
	width: 20%;
	justify-content: space-between;
	align-items: center;
}

.topbar .topright i {
	font-size: 0.4rem;
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
	/* color: #b7aeae; */
	color: #444;
}

.list .song {
	width: 70%;
	height: 100%;
	display: flex;
	
}

.list .song .songInfo {
	width: 78%;
	height: 100%;
color: #444;

}

.list .song .songInfo .songTitle {
	height: 50%;
	font-size: .36rem;
	font-weight: 550;
	/* color: #dcd8d8; */
	margin-top: .1rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: #444;
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
	/* color: #bab5b5; */
	color: #444;


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

.wrapper {
	position: fixed;
	/* 这个z-index很关键，不然子元素层级再高也没用，必须父元素层级要高 ，这里至少要和item Music Top的头的z-index一样，即可覆盖*/
	z-index: 2;
	width: 100%;
	height: 50px;
	left: 0;
	bottom: 0;
	/* background-color: red; */
}

.playTable{
	width: 100%;
	
}


</style>