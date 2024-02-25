<script setup>
import { useRoute } from "vue-router";
import { onMounted, reactive, ref } from "vue";
import { getPlaylistDetail } from "@/request/api/item.js";
import itemMusicTop from "./itemMusicTop.vue";
import itemMusicBottom from "./itemMusic.bottom.vue";
import { usemusicStore } from "@/store/music.js";

// import FooterMusic from "../UI/FooterMusic.vue";
const state = reactive({
  playlist: {},
  // id:''
});

const musicStore = usemusicStore();

onMounted(async () => {
  // 获取该歌单的id
  let id = useRoute().query.id;
  // //console.log(id);
  // 该函数，传入id，调用接口，获得歌单详细歌曲
  let res = await getPlaylistDetail(id);
  // //console.log('1',res);
  state.playlist = res.data.playlist;
});

</script>
<template>
  <div class="itemMusic">
    <!-- <v-if></v-if>      -->
    <itemMusicTop v-show="state?.playlist" :playlist="state"></itemMusicTop>
    <itemMusicBottom v-show="state?.playlist" :playlist="state" ></itemMusicBottom>
    <!-- <FooterMusic></FooterMusic> -->
  </div>
</template>
<style scoped>
.itemMusic{
  height:100vh;
  width: 100vw;
  position: relative;
  /* z-index: 200; */
  background-color: rgb(8, 8, 8);
  /* display: flex;
  flex-direction: column; */
  overflow: auto;
}
</style>