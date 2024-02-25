<script setup>
import { ref ,inject, watch} from "vue";
import { usemusicStore } from "../../store/music";
import { Vue3Marquee } from 'vue3-marquee'
const props = defineProps('showPopup')
// import { defineEmits } from "vue";
// const emit = defineEmits()

const musicStore = usemusicStore();
// 关注歌手
const concerShow = ref(true);
// 是否显示关注歌手
function concerShowisShow() {
  if (musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId].ar.length === 1) {
    concerShow.value = true
    // //console.log('true?',concerShow.value);
    return concerShow.value
  } else {
    concerShow.value = false
    // //console.log('false?',concerShow.value);
    return concerShow.value
  }
}

let songsName = ref(null);
let songsAr = ref(null);

watch(musicStore.lyricList, () =>
{

  songsName.value = musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId].name;
  songsAr.value = musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId].ar;

})

// 注入 来自FooterMusic的一个方法，控制是否显示pop层
const {showPopup} = inject('Pop')
</script>
<template>
  <div class="songdetailTop">
    <div class="topleft"><i class="iconfont icon-31xiala" @click="showPopup()"></i></div>
    <div class="songdetail">
      <!-- 歌曲名字及跑马灯效果 -->
      <div class="songname">
        <Vue3Marquee >
          {{ songsName }}
        </Vue3Marquee>
      </div>
      <!-- 歌手名字 -->
      <ul class="songauthorname">
        <li
          v-for="(i, index) in songsAr"
          :key="index"
        >
          {{ i.name + "&nbsp;" }}
        </li>
        <!-- <li class="concern" >关注</li> -->
        <li class="concern" v-show="concerShowisShow()">关注</li>
      </ul>
    </div>
    <div class="topright"><i class="iconfont icon-fenxiang2"></i></div>
  </div>
</template>
<style scoped>
.songdetailTop {
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(241, 231, 231, 0.08);
  height: 10vh;
  width: 100vw;
  padding: 20px 15px ;
}
.songdetailTop i {
  color: #fff;
  font-size: 30px;
}
.songdetail {
  text-align: center;
  height: 80px;
  width: 75%;
  /* background-color: red; */
  padding: 20px 0;
}
.songdetail .songname {
  font-size: 20px;
  padding: 0 40px;
}
.songdetail .songauthorname {
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: rgb(247, 250, 250); */
}
.songdetail .songauthorname li {
  color: #f0eded;
  font-size: 18px;
  /* height: 100%; */
  /* background-color: rgb(247, 250, 250); */
}
.songdetail .songauthorname .concern {
  /* border: 1px solid #ccc9c9; */
  background-color: rgba(232, 229, 229, 0.4);
  color: #f3efef;
  border-radius: 6px;
  width: 40px;
  font-size: 15px;
  height: 20px;
  /* vertical-align: middle; */
  line-height: 20px;
}
</style>