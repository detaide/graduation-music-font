<script setup>
import { ref, onUpdated, watch, onMounted, watchEffect, provide } from "vue";
import { usemusicStore } from "../../store/music";
import Songdetailpage from "@/components/Songdetail/Songdetailpage.vue";
import { getLyric, getSongDetail } from "../../request/api/item";
import { eventBus } from "../../utils/EventBus";
import recentDialog from "../Playlist/recentDialog.vue"
const musicStore = usemusicStore();
// const nonReactiveValue = ref(musicStore.playlist[musicStore.playListIndex]?.id);
// const name = ref(musicStore.playlist.name);
const audio = ref(null);
// 是否处于播放状态
const run = ref(false);
const dialogShow = ref(false)
/* 在Vue3中，setup代表的是beforeCreate/created生命周期钩子，在setup执行时，template中的元素还没挂载到页面上，所以必须在onMounted之后才能获取到元素 */
// console.dir(audio.value)
// 点击播放
function play() {
    audio.value.play();
    return (run.value = !run.value);
}
// 点击暂停
function paused() {
    audio.value.pause();
    clearInterval(interVal);
    return (run.value = !run.value);
}
provide("play", { run, play, paused });
provide('autoplay', { SwitchTotheprevious, SwitchTothenext, handleSeek })
// 但这种方法存在问题，当播放两个歌单的第一首时，下标不变，而导致歌曲不播放！！！
//当下标Index发生变化时(watch只能监听响应性数据，故这里监听musicSotre)，设置自动播放，并修改图标
// watch(musicStore,()=>{
//   if (musicStore.playListIndex ){
//     audio.value.autoplay = true
//     //console.log('audio',audio);
//     // 若为暂停状态，则更改图标
//     if(audio.value.paused){
//       run.value = true
//     }
//   }
// })
//修改版，当下标的id发生变化，被监听到，同时要注意的是，要加onMounted，因为这会在组件初始化期间访问未准备好的DOM元素audio.value，为了解决这个问题，您可以确保在使用 audio 对象之前等待 DOM 元素准备好。您可以使用 onMounted 钩子来执行初始化操作，以确保在组件已挂载到 DOM 后才访问 DOM 元素。
onMounted(async () => {

    await musicStore.getAllPlayListInfo();

    watchEffect(() => {
        if (audio.value) {
            //console.log('这是audio', audio);
            audio.value.autoplay = true;
            // 监听音乐开始播放
            audio.value.addEventListener("play", () => {
                //console.log("音乐开始播放了");
                // 开始计时
                updateTime();
                // 传入音乐的总时长
                musicStore.getDuration(audio.value.duration)

                // //console.log('音乐的总时长为：',audio.value.duration);
                // 播放时，设置run为true，设置为播放图标
                run.value = true;
            });
            // 监听音乐暂停
            audio.value.addEventListener("paused", () => {
                //console.log("暂停了");
                clearInterval(interVal);
                // return (run.value = !run.value);
            });
            // 监听音乐结束
            audio.value.addEventListener("ended", () => {
                //console.log("当前歌曲播放完毕")
                SwitchTothenext()
            })
        }
    });
});
// 切换上一首
function SwitchTotheprevious() {
    Switch(-1);
    // if (musicStore.playListIndex > 0) {
    //     musicStore.playListIndex--;
    // } else if ((musicStore.playListIndex = 0)) {
    //     musicStore.playListIndex = 0;
    // }
}
// 切换下一首
function SwitchTothenext() {
    Switch(1);
    // // //console.log(musicStore.playListIndex == musicStore.playlist.length - 1);
    // if (musicStore.playListIndex < musicStore.playlist.length - 1) {
    //     musicStore.playListIndex++;
    // } else if ((musicStore.playListIndex == musicStore.playlist.length - 1)) {
    //     musicStore.playListIndex = 0;
    //     audio.value.play();
    //     return (run.value = true);
    // }
}

function Switch(direct)
{
    
    // 随机播放
    let order = musicStore.playOrder;
    //console.log(order, direct)
    let playLength = musicStore.playlist.length;
    if(order == 2)
    {
        let randomIndex = Math.floor(Math.random() * (playLength + 1));
        musicStore.playListIndex = randomIndex;
        audio.value.play;
        return (run.value = true);
    }

    if(order === 0)
    {
        // 顺序播放
        let next = musicStore.playListIndex + (direct * 1);
        if(next >= musicStore.playlist.length)
        {
            next = 0;
        }
        if(next < 0)
        {
            next = musicStore.playlist.length - 1;
        }
        musicStore.playListIndex = next;
        //console.log(next)
        audio.value.play;
        return (run.value = true);
    }

    //单曲循环
    if(order == 1)
    {
        audio.value.play;  // 加上这一行
        return;
    }
}
// 进度条拖动事件
function handleSeek(event) {
    // 获取用户选择的新的播放位置
    const newTime = event.target.value;
    // 将新的播放位置设置为 currentTime
    musicStore.currentTime = newTime;
    // 更新音乐播放器的播放位置
    audio.value.currentTime = newTime;
};

const showRight = ref(false);
provide("Pop", { showRight, showPopup });
function showPopup() {
    showRight.value = !showRight.value;
}

let interVal = null;
// 更新歌曲时，获取对应歌词
onUpdated(async () => {
    // //console.log('long', musicStore.playlist[musicStore.playListIndex]?.musicId)
    let res = await getLyric(musicStore.playlist[musicStore.playListIndex].musicId);
    // //console.log('歌词：',res);
    musicStore.updatelyricList(res.data.lrc);

});

function updateTime() {
    // //console.log("updateTime called");
    // interVal = setTimeout(() => {
    // let t =audio.value.currentTime
    // let t = await musicStore.getCurrentTime(audio.value.currentTime)
    //   //console.log('t',t);

    // 获取当前音频的 currentTime
    let t = audio.value?.currentTime;
    // 在获取 currentTime 后调用 musicStore.getCurrentTime，并等待其结果
    musicStore.getCurrentTime(t);
    // //console.log("t", t);
    // }, 1000);
    interVal = setTimeout(updateTime, 1000)
}

// eventBus.on("changeAudioSource", async () =>
// {

// })

</script>
<template>
    <div class="footerMusic-bar" v-if="musicStore.playlistInfo">
        <!-- 歌单详情页弹出层 -->

        <van-popup v-model:show="showRight" position="bottom" duration="0.1" :style="{ height: '100%', width: '100%' }">
            <Songdetailpage :name="musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId]?.name"
                :authorname="musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId]?.ar[0]?.name" :showPopup="showPopup">
            </Songdetailpage>
        </van-popup>
        <div class="footerLeft" @click="showPopup">
            <!-- musicStore.playListIndex是异步加载的，而v-show，Vue仍然会在组件渲染期间访问该属性，因此在渲染期间，musicStore.playListIndex 必须是已定义和已初始化的。用v-if则在需要时(值为true时)访问该属性 -->
            <div v-if="musicStore.playListIndex !== null" class="pic">
                <img :src="musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId]?.al?.picUrl" />
            </div>
            <div class="MusciInfo">
                <p v-if="musicStore.playListIndex !== null" class="musicname">
                    {{ musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId]?.name }}
                </p>
                <p class="i">-</p>
                <!-- 歌手的名字(可能为数组) -->
                <p v-if="musicStore.playListIndex !== null" class="authorname">
                <ul>
                    <li v-for="(i, index) in musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId]?.ar" :key="index">{{ i.name }}
                    </li>
                </ul>

                </p>
            </div>
        </div>
        <div class="footerRight">
            <i v-show="run == false" class="iconfont icon-bofang" @click="play()"></i>
            <i v-show="run == true" class="iconfont icon-zanting" @click="paused()"></i>
            <i class="iconfont icon-24gf-playlistMusic" @click="dialogShow = true"></i>
        </div>
        <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId]?.id
            }.mp3`"></audio>
        
        <van-popup 
            :style="{height : '50%', borderRadius : '20px', overflow:'auto'}"
            position="bottom"
            v-model:show="dialogShow"
        >
            <recentDialog :musicStore="musicStore"/>
        </van-popup>

    </div>
</template>
<style scoped>
.footerMusic-bar {
    width: 100%;
    height: 1rem;
    /* background-color: rgb(34, 39, 39); */
    background-color: #fff;
    padding: 5px 20px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 5000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #ccc;
}

.footerLeft {
    width: 80%;
    display: flex;
    height: 100%;
}

.footerLeft .pic {
    width: 14%;
    /* font-size:0; */
    margin-right: 15px;
}

.footerLeft .pic img {
    width: 100%;
    height: 40px;
    vertical-align: bottom;
    border-radius: 50%;
}

.footerLeft .MusciInfo {
    width: 75%;
    display: flex;
    align-items: center;
    overflow: hidden;
    justify-content: left;
}

.footerLeft .MusciInfo .musicname {
    font-size: 17px;
    /* color: #fff; */
    color: black;
    /* overflow: hidden; */
    white-space: nowrap;
    /* text-overflow: ellipsis; */
    /* width: 100%; */
}

.footerLeft .MusciInfo .i {
    font-size: 30px;
    color: #6c6666;
    margin: 0 0.2rem 0.1rem 0.2rem;
}

.footerLeft .MusciInfo .authorname {
    font-size: 16px;
    color: #7f7a7a;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.footerLeft .MusciInfo .authorname ul {
    display: flex;
    align-items: center;
}

.footerLeft .MusciInfo .authorname li {
    /* display: flex;
  align-items: center;
  vertical-align:bottom; */
    text-align: justify;
    word-break: break-all;
}

.footerRight {
    width: 20%;
    display: flex;
    /* color: #fff; */
    color: black;
    font-size: 20px;
    justify-content: space-between;
}

.footerRight i {
    font-size: 25px;
}
</style>