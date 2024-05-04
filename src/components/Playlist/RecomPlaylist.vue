<script setup>
import { getRecomPlayLists } from "@/request/api/home.js";
import { onMounted, ref } from "vue";
// import route from '@/router/index'


// import axios from 'axios';
const MusicList = ref([]);
onMounted(async () => {
  let res = await getRecomPlayLists();
  //console.log('res', res)
  MusicList.value = res.data.result;
  // //console.log(res);
  // //console.log(MusicList.value);
});
function changeCount(num){
    if(num>100000000){
        return (num/100000000).toFixed(1)+'亿'
    }else if(num>10000){
        return (num/10000).toFixed(0)+'万'
    }else{
        return num
    }
}

</script>
<template >
  <div class="recomPlayLists">
    <div class="recomTop">
      <div class="recomInfo">
        <p>推荐歌单</p>
        <i class="iconfont icon-xuanzeqixiayige"></i>
      </div>
    </div>
    <div class="recomBody">
      <van-swipe class="recomSwiper" :loop="false" :width="150" show-indicators="false">
        <!-- 歌单item -->
        <van-swipe-item v-for="item in MusicList" :key="item"> 
          <!-- 点击跳转到歌单详情页，参数id -->
          <router-link :to="{path:'/itemmusic',query:{id:item.id}}">
           
         <!-- item图片模块 -->
            <div class="picture">
                <img :src="item.picUrl" alt="">
                <div class="playcount-wraper">
                    <i class="iconfont icon-playfill"></i>
                    <p class="playcount">{{ changeCount(item.playCount) }}</p>
                </div>
            </div>
          
        <!-- item图片描述 -->
            <div class="playInfo">{{ item.name }}</div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>
<style scoped>
.recomPlayLists {
  /* background-color: #000; */
  background-color: #fff;
}
.recomTop{
    padding: .06rem .2rem;
}
.recomInfo {
  display: flex;
  font-size: 0.4rem;
  /* color: #fff; */
  color: black;

}
.recomInfo p {
  font-weight: 550;
}
.recomInfo i {
  font-size: inherit;
}
.recomBody {
  /* height: 2.5rem; */
  background-color: #baf;
}
.recomSwiper{
    /* height: 2.5rem; */
    /* background-color: #000; */
    background-color: #fff;
}
.recomSwiper .picture img{
    height: 2.5rem;
}
.picture{
    position: relative;
}
.picture .playcount-wraper{
    position:absolute;
    top: 0.1rem;
    right: .2rem;
    display: flex;
}
.playcount-wraper i,
.playcount-wraper p{
    color: #fff;
    /* color: black; */
}
.recomSwiper .playInfo{
    /* color: #fff; */
    color: #444;
}
</style>