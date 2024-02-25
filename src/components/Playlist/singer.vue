<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getSingerDetail } from "@/request/api/item.js";
const data = ref();
onMounted(async () => {
  let id = useRoute().query.id;
  let res = await getSingerDetail(id);
  //console.log(res);
  data.value = res.data.data;
  //console.log(data);
});
</script>
<template>
  <div class="singer">
    <!-- 背景图片 -->
    <img class="bgimg"
      :src="data?.artist?.cover"
      alt=""
    />
    <!-- 头部 -->
    <div class="topbar">
      <div class="leftbox">
        <i class="iconfont icon-zuojiantou1" @click="$router.go(-1)"></i>
      </div>
      <div class="rightbox">
        <i class="iconfont icon-gengduo-shuxiang"></i>
      </div>
    </div>
    <!-- 作者的信息简介 -->
    <div class="top">
      <img :src="data?.artist?.avatar" alt="" style="width: 1.5rem" />
      <div class="userid">{{data?.artist.name}}</div>
      <div class="detail">
        <!-- <div class="concern">{{ }}关注</div>
        <div class="icon">|</div>
        <div class="fancy">{{  }}粉丝</div>
        <div class="icon">|</div>
        <div class="level">IP地址{{  }}</div> -->
        <div class="briefDesc">{{data?.artist?.briefDesc}}</div>
        <div class="imageDesc">{{data?.identify?.imageDesc}}</div>
      </div>
      
    </div>
  </div>
</template>
<style scoped>
.singer{
    width: 100vw;
    height: 100vh;
    position: relative;
    
}
.bgimg{
    width: 100vw;
    height: 280px;
    z-index: -10; 
    filter: grayscale(0.4);
    /* position: absolute;
    top: 0px; */

}
.topbar {
  height: 80px;
  width: 100%;
  display: flex;
  padding: 0.2rem 0.3rem;
  justify-content: space-between;
  color: #fff;
  position: fixed;
  top: 0px;
  left: 0;
  z-index: 1;
  /* 头部透明背景 0.08*/
  background-color: rgba(241, 231, 231, 0.03)
}
.leftbox {
  display: flex;
  font-size: 0.44rem;
  align-items: center;
  /* color: #fff; */
}
.leftbox i {
  font-size: 0.7rem;
  margin-right: 0.3rem;
}
.rightbox {
  display: flex;
  align-items: center;
}
.rightbox i {
  font-size: 0.6rem;
  padding-left: 0.5rem;
}

/* 作者信息头部 */
.top {
  text-align: center;
  margin: -30px 18px 0 18px;
  position: relative;
  background-color: rgb(44, 44, 44);
  padding: 40px 0 20px 0;
  border-radius: 15px;
}
.top img {
  border-radius: 50%;
  position: absolute;
  top: -0.75rem;
  left: 40%;
}
.userid {
  color: #fff;
  font-size: 25px;
  margin: 5px 0;
}
.detail {
  display: flex;
  justify-content: center;
  font-size: 16px;
  color: rgb(109, 109, 109);
}
.detail .icon { 
  margin: 0 6px;
}
.concern,
.fancy,
.level {
  font-weight: bold;
}
</style>