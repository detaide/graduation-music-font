<script setup>
import InfoMenu from './Info-menu.vue';
// import Play from './Play.vue'
import FooterMusic from '../UI/FooterMusic.vue';
import { usemusicStore } from '../../store/music';
const musicStore = usemusicStore()
</script>
<template >
    <div class="bottom">
        <div class="footerbox" v-show="musicStore.isFooterMusic">
            <FooterMusic class="ha" ></FooterMusic>
        </div>
        <div class="menubox" v-show="musicStore.isMusicMenu">
            <InfoMenu ></InfoMenu>
        </div>
        
    </div>
</template>
<style scoped >
.bottom{
    width: 100vw;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 10;
    background-color: #123ad8;
    /* border: .1rem solid black; */
    display: flex;
    flex-direction: column; 
    
}
.footerbox{
    width: 100vw;
    height: 1rem;
    background-color: aqua;
    position: relative;
}
.menubox{
    width: 100vw;
    height: 1.5rem;
    background-color: orange;
    position: relative;
}
</style>