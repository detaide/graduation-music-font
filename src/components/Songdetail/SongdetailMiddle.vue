<script setup>
import { inject, onMounted, ref,watch, watchEffect } from "vue";
import { usemusicStore } from "../../store/music";
const musicStore = usemusicStore();
const { run } = inject("play");
const islyricShow = ref(false);
let arr = ref(null);
// 获取ul  dom元素
const lyricList = ref(null)
// 将数组要的数据分割出来
function lyric(v) {
  if (v.indexOf("]") == 9) {
    let min = v.slice(1, 3);
    let sec = v.slice(4, 6);
    let mill = v.slice(7, 9);
    let info = v.slice(10, v.length);
    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
    return { min, sec, mill, time, info };
  } else if (v.indexOf("]") == 10) {
    let min = v.slice(1, 3);
    let sec = v.slice(4, 6);
    let mill = v.slice(7, 10);
    let info = v.slice(11, v.length);
    let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
    // let time = parseInt(min) * 60 + parseInt(sec);
    // //console.log(min, sec, mill, time, info);
    return { min, sec, mill, time, info };
  }
  //   有的情况不会进入if分支，则会在调用函数时返回undefined，为了避免，设置返回空对象{}
  return {min:'', sec:'', mill:'', time:'', info:''};
}

// } else {
//   // 'lyricList.lyric' 为 'undefined'，可能是数据尚未加载或获取到
//   //console.log("'lyricList.lyric' 为 'undefined'，可能是数据尚未加载或获取到");
//   // return arr=[1]
// }

// let arr = musicStore.lyricList.lyric.split(/[\n\t]+/).map((v, i) => {
//   // map中的值要返回给arr
//   return lyric(v);
// });
// onMounted(()=>{
//   // const lyricactive = document.getElementsByClassName('lyricactive')[0]
// })

// 点击切换磁盘或歌词
function dishOrlyric(){
  return islyricShow.value = !islyricShow.value
}

watch(musicStore.lyricList, () =>
{
  arr.value = musicStore.lyricList.value.lyric.split(/[\n\t]+/).map((v, i) => {
      return lyric(v);
  });
  
  if (musicStore.lyricList.value.lyric) {
  arr.value = musicStore.lyricList.value.lyric.split(/[\n\t]+/).map((v, i) => {
    return lyric(v);
  });
  // 删掉数组最后一项，这一项为 "
  arr.value.pop()
  // //console.log('arr:',arr);
  // 为歌词数组的每一项设置属性，记录下一句要播放的时间
  arr.value.forEach((item, i) => {
    if (i < arr.value.length - 1) {
      item.next = arr.value[i + 1].time;
    } else {
      // arr的最后一项，将其next设置很大，以持续让这个li绑定active
      item.next = 10000000;
    }
  })
  //console.log(arr.value)

}
  // //console.log("lyricList:", arr.value)

})


// 监听获取到符合的li，设置scrollTop
watch(()=>{

  if(lyricList.value &&musicStore&& musicStore.currentTime){
    let lyricElement = document.querySelector('li.lyricactive')
    // //console.log('active:',[lyricElement]);
    if(lyricElement && lyricElement.offsetTop>250 ){
      lyricList.value.scrollTop = lyricElement.offsetTop - 250
      // //console.log('大于200了！');
    }
  }
  // //console.log(lyricList);
  // //console.log( 'lyricactive:',[lyricactive]);
  // if(lyricactive &&lyricactive.offsetTop>150){
  //   //console.log('大于300了！');
  // }
})
// watch(() => {
//   if (lyricList.value && musicStore.currentTime && arr) {
//     // 找到当前播放时间所对应的歌词行
//     let currentLyric = arr.find((item) => {
//       return (
//         musicStore.currentTime * 1010 >= item.time &&
//         musicStore.currentTime * 1010 < item.next
//       );
//     });

//     if (currentLyric) {
//       // 如果有匹配的歌词行，滚动到该行
//       let lyricElement = lyricList.value.querySelector(
//         `li[data-time="${currentLyric.time}"]`
//       );

//       if (lyricElement && lyricElement.offsetTop > 240) {
//         lyricList.value.scrollTop = lyricElement.offsetTop - 240;
//       }
//     }
//   }
// });

</script>
<template>
  <div class="songdetailMiddle">
    <!-- 指针和cd -->
    <div class="animation" v-show="!islyricShow">
      <!-- 指针图片 -->
      <img
        class="needle"
        src="@/assets/needle-ab.png"
        :class="{ active: run }"
        alt=""
      />
      <img class="cdbox" src="@/assets/cd.png" alt="" @click='dishOrlyric()'/>
      <!-- 两种写法 ，但是第二种不可行，两种状态直接选择一个，而不会动态选择-->
      <img
        class="alimg"
        :class="{ alimg_active: run, alimg_paused: !run }"
        :src="musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId].al.picUrl"
        alt=""
        @click='dishOrlyric()'
      />
      <!-- <img class="alimg" :class="[run ? alimg_active : alimg_paused]" :src="musicStore.playlist[musicStore.playListIndex].al.picUrl" alt=""> -->
    </div>
    <!-- 歌词 -->
    <div class="lyric-wrapper" v-show="islyricShow" @click='dishOrlyric()'>
      <ul ref="lyricList" class="lyricList">
          <!-- <li v-for="(item, i) in arr" :key="i" >{{ item.info }}</li> -->
          <li v-for="(item, i) in arr" :key="i"  :data-time="item.time" :class="{lyricactive:(musicStore.currentTime*1001<=item.next && musicStore.currentTime*1001>=(item.time || 0))}">{{ item.info }}</li>
          <!-- <li v-for="(item, i) in arr" :key="i" class="lyricactive">{{ item.info }}</li> -->
        </ul>
    </div>
  </div>
</template>
<style scoped>
.songdetailMiddle {
  width: 100vw;
  height: 70vh;
  position: relative;
  padding: 7px .6rem 20px 0.6rem;
}
.needle {
  position: absolute;
  left: 25%;
  right: 0;
  top: 7px;
  margin: auto;
  z-index: 100;
  width: 120px;
  transform-origin: 0px 0px;
  transform: rotate(-20deg);
  transition: all 2s;
}
.active {
  position: absolute;
  left: 25%;
  top: 0px;
  right: 0;
  margin: auto;
  z-index: 100;
  width: 120px;
  transform-origin: 0px 0px;
  transform: rotate(10deg);
  transition: all 2s;
}
.cdbox {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 320px;

  /* transform: rotateZ(360deg); */
}

.alimg {
  width: 210px;
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  animation: Rotate 14s linear infinite;
}
.alimg_active {
  animation-play-state: running;
}
.alimg_paused {
  animation-play-state: paused;
}
@keyframes Rotate {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.lyric-wrapper {
  width: 100%;
  height: 100%;
  /* padding: 20px 0; */
}
.lyricList {
  width: 100%;
  height: 100%;
  overflow: auto;
  text-align: center;
}
.lyricList li {
  /* width: 100%; */
  font-size: 20px;
  margin-bottom: 10px;
  color: rgb(187, 217, 217);
}
.lyricList li:nth-child(1) {
  margin-top: 200px;
}
.lyricList li:nth-last-child(1) {
  margin-bottom: 300px;
} 
.lyricList li.lyricactive{
  /* width: 100%;
  margin-bottom: 10px; */

  font-size: 30px;
  color: rgb(24, 205, 205);
}
</style>