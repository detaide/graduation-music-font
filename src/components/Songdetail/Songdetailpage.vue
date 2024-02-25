<script setup>
import SongdetailTop from './SongdetailTop.vue';
import SongdetailMiddle from './SongdetailMiddle.vue';
import SongdetailBottom from './SongdetailBottom.vue';
import { usemusicStore } from '../../store/music';
const musicStore = usemusicStore()
// const props = defineProps('showPopup')

</script>
<template>
    <div class="songdetailPage">
        <img :src="musicStore.playlistInfo[musicStore.playlist[musicStore.playListIndex].musicId].al.picUrl" alt="">
        <SongdetailTop >头</SongdetailTop>
        <SongdetailMiddle>中间</SongdetailMiddle>
        <SongdetailBottom>底</SongdetailBottom>
    </div>
</template>
<style scoped>
.songdetailPage{
    /* background-color: #131212; */
    width: 100vw;
    height: 100vh;
    position: relative; 
}
/* 设置背景 */
.songdetailPage img{
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
    width: 100vw;
    height: 100vh;
    filter: blur(100px) ;
    /* filter:  */
    box-shadow: 0 0 500px 250px rgba(1, 1, 1, 1);
}
</style>