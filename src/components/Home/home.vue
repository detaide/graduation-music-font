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