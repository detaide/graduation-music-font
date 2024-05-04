<script setup>
import searchTop from "@/components/Search/searchTop.vue";
import FooterMusic from "@/components/UI/FooterMusic.vue";
import { onMounted, ref, watch, provide } from "vue";
import { Search, SearchMV } from "@/request/api/search.js";
import searchHistory from "./searchHistory.vue";
import searchMV from "../../views/searchMV.vue";
import {useRoute} from "vue-router"
const keywordArr = ref([]);
const isShowHistory = ref(true);
const props = defineProps(['mv']);
let Songs = ref([{name:'laier'}])
const mvResult = ref(null);
const route = useRoute();
provide("isShowHistory", isShowHistory);
// 处理从子组件传来的搜索结果
const childEmit = (Arr, songs) => {
  keywordArr.value = Arr;
  // 存储在localStorage
  localStorage.setItem("Arr", JSON.stringify(keywordArr.value));
  if(props?.mv)
  {
    mvResult.value = songs;
    //console.log("mvSutl", mvResult)
    return;
  }
  // //console.log("父组件keywordArr", keywordArr.value);
  Songs.value = songs
  //console.log("Songs.value!!!", Songs.value);
};
// 监听关键字数组数据
// watch(keywordArr, (newVal) => {
//   //console.log('keywordArr changed:', newVal)
// }, { deep: true })

// 读取localStorage
onMounted(async () => {
  const localdata = localStorage.getItem("Arr");
  if (localdata) {
    keywordArr.value = JSON.parse(localdata);
  }
  route.query.page && keywordArr.value.length && (isShowHistory.value = false);
  if(keywordArr.value.length)
  {
    let searchData = await SearchMV(keywordArr.value[keywordArr.value.length - 1]);
    mvResult.value = searchData?.data.result;
  }
});
// 删除历史记录按钮
const deleteHistory = () => {
  if (confirm("你确定要删除历史记录么？")) {
    keywordArr.value = null;
    localStorage.clear();
  }
};
// 点击历史标签获取搜索结果
const tagSearch = async (item) => {
  //console.log("isMV? : ", props?.mv)
  if(props?.mv)
  {
    let searchData = await SearchMV(item);
    //console.log("mv : ", searchData);
    mvResult.value = searchData?.data.result;
    isShowHistory.value = false
    return;
  }

  let searchdata = await Search(item);
  Songs.value = searchdata.data.result?.songs;
  isShowHistory.value = false
  //console.log(Songs.value);
};
</script>
<template >
  <div class="search">
    <!-- 搜索头部组件 -->
    <searchTop @Arr="childEmit" :mv="props?.mv"></searchTop>
    <!-- 搜索历史 -->
    <div class="historybox" v-show="isShowHistory">
      <!-- 搜索历史的头部 -->
      <div class="Tophistorybox">
        <div class="tag">搜索历史</div>
        <i class="iconfont icon-shanchu" @click="deleteHistory()"></i>
      </div>
      <!-- 搜索历史的列表 -->
      <div class="historyList">
        <span
          class="historyItem"
          v-for="(item, i) in keywordArr"
          :key="i"
          @click="tagSearch(item)"
          >{{ item }}</span
        >
      </div>
    </div>
    <search-result v-show="!isShowHistory && !props?.mv"  :music='Songs'></search-result>
    <searchMV v-show="!isShowHistory && props?.mv" :mvResult="mvResult" v-if="mvResult"/>
    <!-- <router-view></router-view> -->
    <!-- <div class="wrapper">
      <FooterMusic></FooterMusic>
    </div> -->
  </div>
</template>
<style scoped>
.search {
  width: 100vw;
  height: 100vh;
  position: relative;
  /* flex-direction: column; */
  z-index: 1;
  /* background-color: rgb(27, 27, 37); */
  background-color: #fff;
}
.historybox {
  /* width: 70%vw; */
  /* height: 30vh; */
  /* background-color: #bfa; */
  padding: 0 0.4rem;
  margin-top: 1.4rem;
}
.Tophistorybox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* margin-bottom: 16px; */
  /* background-color: rgb(111, 23, 219); */
}
.Tophistorybox i {
  font-size: 27px;
  color: #b0aeae;
}
.tag {
  font-size: 0.32rem;
  /* color: #fff; */
  color: black;
}
.historyList {
  /* background-color: aqua; */
  display: flex;
  flex-wrap: wrap;
}
.historyItem {
  background-color: rgb(51, 52, 57);
  padding: 9px 14px;
  margin: 5px 20px 5px 0px;
  /* border: 1px solid rgb(169, 165, 165); */
  border-radius: 30px;
  font-size: 0.3rem;
  color: #b0aeae;
  white-space: nowrap;
}

.wrapper {
  position: fixed;
  /* 这个z-index很关键，不然子元素层级再高也没用，必须父元素层级要高 ，这里至少要和item Music Top的头的z-index一样，即可覆盖*/
  z-index: 2;
  width: 100%;
  height: 50px;
  left: 0;
  bottom: 0;
  /* background-color: red; */
}
</style>