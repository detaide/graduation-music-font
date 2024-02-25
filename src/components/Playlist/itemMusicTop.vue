<script setup>
import { onMounted, reactive, useAttrs, watch } from "vue";
import { getCurrentInstance, ref, onUpdated, isRef, isReactive } from "vue";
// import playlistImage from 
const props = defineProps(["playlist"]);
const item = ref(props.playlist);
// //console.log(item);
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
<template>
  <!-- <div class="top-container" :style="{'background-image' : `url('${item.playlist?.coverImgUrl ?item.playlist.coverImgUrl : './bg-1.png'}')`}"> -->
  <div class="top-container" >
    <!-- {{$attrs.playlist}} -->
    <img :src="item.playlist.coverImgUrl || './bg-1.png'" alt="" class="bgimg" />
    <div class="topbar">
      <div class="leftbox">
        <i class="iconfont icon-zuojiantou1" @click="$router.go(-1)"></i>
        <p>歌单</p>
      </div>
      <div class="rightbox">
        <i class="iconfont icon-sousuo"></i>
        <i class="iconfont icon-gengduo-shuxiang"></i>
      </div>
    </div>
    <div class="main-wrapper">
      <div class="playList">
        <div class="author-picture">
          <img :src="item.playlist.coverImgUrl || './playlist.png'" alt="" />
          <div class="playcount-wraper">
            <i class="iconfont icon-playfill"></i>
            <p class="playcount">{{ changeCount(item.playlist.playCount) }}</p>
          </div>
        </div>
        <div class="playListInfo">
          <div class="playListTitle">{{ item.playlist.name }}</div>
          <div class="author">
            <!-- 作者头像 -->
            <div class="author-avatar">
              <img :src="item.playlist.creator?.avatarUrl || './avator.png'" alt="" />
            </div>
            <div class="author-nickname">
              {{ item.playlist.creator?.nickname || item.playlist?.nickname}}
            </div>
            <div class="concern">
              <i class="iconfont icon-add" style="font-size: 12px;"></i>
              <p>关注</p>
            </div>
          </div>
          <div class="musicTag-box">
            <div class="musicTag" v-for="tag in item.playlist.tags" :key="tag">
              {{ tag }}<i class="iconfont icon-xuanzeqixiayige"></i>
            </div>
            <!-- <div class="musicTag">流行<i class="iconfont icon-xuanzeqixiayige"></i></div> -->
          </div>
        </div>
      </div>
      <div class="playListMes">
        <p>{{ item.playlist.description }}</p>
      </div>
      <div class="operate">
        <div class="share">
          <i class="iconfont icon-zhuanfa"></i>
          <p>{{ changeCount(item.playlist.shareCount) }}</p>
        </div>
        <div class="comments">
          <i class="iconfont icon-pinglun"></i>
          <p>{{ changeCount(item.playlist.commentCount) }}</p>
        </div>
        <div class="collection">
          <i class="iconfont icon-tianjiadingdan1"></i>
          <p>{{ changeCount(item.playlist.subscribedCount) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.top-container {
  height: 40%;
  width: 100%;
  position: relative;
  padding: 1.6rem 0.4rem 0.2rem 0.4rem;
  background-size: cover;
  z-index: 10;
}
.top-container .bgimg {
  /* height: 40%; */
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  filter: blur(1.5rem);
  z-index: -2;
}
.topbar {
  height: 80px;
  /* background-color: #fff; */
  width: 100%;
  /* height: 1rem; */
  display: flex;
  padding: 0.2rem 0.3rem;
  justify-content: space-between;
  /* position: relative; */
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


.author-picture{
    position: relative;
    max-width: 115px;
}
.playcount-wraper{
    position:absolute;
    top: 0.1rem;
    right: .2rem;
    display: flex;
}
.playcount-wraper i,
.playcount-wraper p{
    color: #fff;
    font-size: 0.28rem;
    font-weight: bold;
}
.playList {
  display: flex;
  /* height: 100px; */
  margin-top: 10px;
  margin-bottom: 10px;
}
.playList .author-picture {
  width: 60%;
  margin-right: 0.4rem;

}
.playList .author-picture img {
  width: 100%;
  height: 100%;
  border-radius: 20px;
  vertical-align: bottom;
  display: flex;

}
.playListInfo {
  overflow: hidden;
}
.playListInfo .playListTitle {
  font-size: 0.4rem;
  color: #fff;

  white-space: nowrap;
  text-overflow: ellipsis;
}
.playListInfo .author {
  display: flex;
  margin: 0.1rem 0rem 0.2rem 0;
  padding-right: 20px;
  /* justify-content: space-between; */
  align-items: center;
  width: 4rem;
  flex-direction: row;
  gap: 10px;
}
/* 作者头像 */
.playListInfo .author .author-avatar {
  width: 0.7rem;
}
.playListInfo .author .author-avatar img {
  width: 100%;
  border-radius: 50%;
  vertical-align: bottom;
}
.playListInfo .author .author-nickname {
  color: rgb(212, 219, 224);
  text-align: center;
  margin: 0 0.02rem;
  /* width: 2.3rem; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.playListInfo .author .concern {
  display: flex;
  color: rgb(177, 191, 201);
  background-color: rgb(71, 87, 111);
  width: 1rem;
  height: 0.4rem;
  border-radius: 10px;
  /* justify-content: center; */
  padding-left: 0.08rem;
  align-items: center;
  font-size: 12px;
}
.playListInfo .author .concern i {
  color: #fff;
  font-size: 15px;
}
.playListInfo .musicTag-box {
  display: flex;
}

.playListInfo .musicTag {
  display: flex;
  /* width: 45px; */
  color: #fff;
  background-color: rgb(88, 104, 128);
  margin-right: 0.2rem;
  border-radius: 5px;
  font-size: 0.2rem;
  padding-left: 7px;
  /* justify-content: center; */
  align-items: center;
}
.playListInfo .musicTag i {
  font-size: 0.2rem;
}
.operate {
  display: flex;
  justify-content: space-around;
}
.operate div {
  display: flex;
  height: 0.8rem;
  width: 2rem;
  background-color: rgb(230, 198, 159);
  border-radius: 0.6rem;
  align-items: center;
  /* text-align: center; */
  justify-content: center;
  font-size: 0.33rem;
}
.playListMes {
  color: rgb(212, 219, 224);
  overflow: hidden;
  margin: 0.1rem 0 0.2rem;
  width: 93%;
}
.playListMes p {
  padding-left: 0.1rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* text-indent:-2em */
}
.operate div {
  background-color: rgb(100, 115, 138);
  color: #fff;
  font-size: 0.3rem;
}
.operate div i {
  font-size: 0.4rem;
  margin-right: 0.1rem;
}
</style>