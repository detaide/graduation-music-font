<script setup>
import searchTop from "./searchTop.vue";
import { onMounted, onUpdated, watch } from "vue";
import { usemusicStore } from "../../store/music";
const props = defineProps(["music"]);
const musicStore = usemusicStore()
onUpdated(() => {
  //console.log(props.music);
});
const updateIndex = (item,i)=>{
  //console.log('当前音乐',item);
  musicStore.addMusicToPlayList(item.id)
  musicStore.updatePlay(musicStore.playlist.length-1)
}
const playMusic = (item,i)=>{
  musicStore.addMusicToPlayList(item.id);
  musicStore.updatePlay(musicStore.playlist.length - 1);
}

function changePlayList()
{
  //console.log("p" , props.music)
	let currTime = new Date().getTime();
	let newList = [];
	props.music.forEach((track, index) =>
	{
		newList.push({
			musicId : track.id,
			order : currTime + index
		})
	})
	musicStore.updatePlayList(newList);
	// musicStore.updatePlayListInfo();
}

</script>
<template>
  <div class="searchResult">
    <!-- 搜索结果 -->
    <div class="bottom-container">
      <!-- 搜索结果头部 -->
      <div class="topbar">
        <div class="topleft">
          <svg
            class="icon"
            aria-hidden="true"
            style="width: 30px; height: 30px"
          >
            <use xlink:href="#icon-bofang-copy" @click="changePlayList"></use>
          </svg>
          <p>播放全部</p>
          <!-- <div>({{ changeCount(item.playlist.playCount) }})</div> -->
        </div>
        <div class="topright">
          <i class="iconfont icon-xiazai1"></i>
          <i class="iconfont icon-24gf-playlistMusic3"></i>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="list" v-for="(song, i) in props.music" :key="i">
        <!-- 歌曲序号 -->
        <!-- <div class="serialNumber" @click="updateIndex(song,i)"> -->
           <div class="serialNumber" @click="playMusic(song,i)">
          {{ i + 1 }}
        </div>
        <div class="song">
          <div class="songInfo" @click="playMusic(song,i)">
            <!-- 歌词名称 -->
            <div class="songTitle">{{ song.name }}</div>
            <!-- 歌手名字 -->
            <ul class="songCreator-wrapper">
              <li class="songCreator" v-for="(item, i) in song.ar" :key="i">
                {{ `${item.name}&nbsp;&nbsp;`  }}
              </li>
            </ul>
            <!-- <div class="songCreator" v-for="(nameitem,index) in track.ar" :key="index">{{ nameitem.name}}</div> -->
          </div>
          <!-- MV -->
          <div class="mvicon">
            <i class="iconfont icon-shipin" v-if="song.mv"></i>
          </div>
        </div>
        <!-- 更多 -->
        <div class="more"><i class="iconfont icon-gengduo-shuxiang"></i></div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.searchResult {
  background-color: rgb(49, 54, 54);
  width: 100vw;
  /* height: 40vh; */
  overflow: auto;
  margin-top: 1.4rem;
}

/* 从此处开始为copyitemMusic.bottom组件 */

.bottom-container {
  /* max-height: calc(100vh-80px); */
  line-height: normal;
  /* height: 65%; */
  width: 100%;
  /* background-color: red; */
  overflow: auto;
  border-radius: 0.45rem 0.45rem 0 0;
  position: relative;
  margin-bottom: 0.9rem;
  height: auto;
}
.topbar {
  display: flex;
  justify-content: space-between;
  color: #fff;
  padding: 0.3rem 0.4rem;
  border-radius: 0.45rem 0.45rem 0 0;
  border-bottom: 0.02rem solid rgb(197, 188, 188);
}
.topbar .topleft {
  display: flex;
  width: 35%;
  justify-content: space-between;
  align-items: center;
}
.topbar .topleft p {
  font-size: 0.35rem;
}
.topbar .topleft div {
  color: rgb(177, 191, 201);
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
  font-size: 0.36rem;
  font-weight: 550;
  color: #dcd8d8;
  margin-top: 0.1rem;
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
  font-size: 0.28rem;
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
  padding-top: 0.1rem;
  text-align: center;
  padding-right: 3%;
}
.more i {
  font-size: 0.6rem;
  color: #dcd8d8;
}
</style>