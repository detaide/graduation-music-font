<script setup>
import TopNav from './TopNav.vue';
// import Bottom from '@/components/Bottom/Bottom.vue';  
import Swipe from '../Swipe/Swipe.vue'
import IconList from './Icon-List.vue';
import RecomPlaylist from '../Playlist/RecomPlaylist.vue';
// import FooterMusic from "../UI/FooterMusic.vue";


</script>
<template >
    <div class="home">
        <TopNav></TopNav>
        <div style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <div style="font-size: 20px; font-weight: bold; color: red; padding: 12px 0">仿网易云音乐播放器</div>
            <div>本播放器仅用于学生毕业训练设计成果展示</div>
        </div>
        <Swipe></Swipe>
        <IconList></IconList>
        <RecomPlaylist></RecomPlaylist> 
        <!-- <div class="Footer-wrapper">
            <Bottom></Bottom>
        </div>    -->
        <!-- <router-view></router-view>    -->
        <!-- <Bottom></Bottom> -->
        
    </div>

</template>
<style scoped>
.home{
    width: 100%;
    height: 100%;
    /* position: relative; */
}
.Footer-wrapper{

  position: absolute;
  width: 100%;
  height: 150px;
  left: 0;
  bottom: 0;
  /* background-color: red; */

}
</style>