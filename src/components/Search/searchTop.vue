<script setup>
import { ref, defineEmits, getCurrentInstance, onMounted ,inject} from "vue";
import { Search ,SearchMV} from "@/request/api/search.js";
import router from '@/router/index.js'
const keyword = ref("");
const searchArr = ref([]);
const emit = defineEmits(["Arr"]);
const isShowHistory = inject('isShowHistory')
const props = defineProps(['mv']);
const mvResult = ref(null)
// 读取localStorage
onMounted(() => {
  const localdata = localStorage.getItem("Arr");
  if (localdata) {
    searchArr.value = JSON.parse(localdata);
  }
});

const handleSubmit = async (event) => {
  if (keyword.value.split(" ").join("").length != 0) {
    isShowHistory.value = false
    event.preventDefault(); // 阻止表单默认的提交行为
          //console.log("提交的值是：" + keyword.value);

    if(props?.mv)
    {
      let searchData = await SearchMV(keyword.value);
      //console.log("mv : ", searchData);
      mvResult.value = searchData?.data.result;
      localStorage.setItem("Arr", JSON.stringify(searchArr.value));
      searchArr.value.unshift(keyword.value);
      // 去重
      searchArr.value = [...new Set(searchArr.value)];
      // //console.log(searchArr.value);
      // 固定数组长度
      if (searchArr.value.length > 10) {
        searchArr.value.splice(length - 1, 1);
      }
      // 更新本地关键字数组
      localStorage.setItem("Arr", JSON.stringify(searchArr.value));
      emit('Arr', searchArr.value, mvResult.value);
      return;
    }

    // 获取关键词的搜索结果
    let searchdata = await Search(keyword.value);
    let songs = searchdata.data.result.songs
          //console.log("搜索数据", searchdata);
          // //console.log("songs!", songs);

    // // 获取本地关键字数组
    // localStorage.setItem("arr", JSON.stringify(searchArr.value));
    // 在这里可以进一步处理提交的值
    searchArr.value.unshift(keyword.value);
    // 去重
    searchArr.value = [...new Set(searchArr.value)];
    // //console.log(searchArr.value);
    // 固定数组长度
    if (searchArr.value.length > 10) {
      searchArr.value.splice(length - 1, 1);
    }
    // 更新本地关键字数组
    localStorage.setItem("Arr", JSON.stringify(searchArr.value));
    // 清空搜索关键字
    keyword.value = "";
          //console.log("keyword!", keyword.value);
          //console.log("子组件searchArr!", searchArr.value);
    emit("Arr", searchArr.value,songs);

    // 进行跳转
    
    // router.push({path:'/search/searchresult'})
  }
};
// const getSearchContent= async()=>{
//     let data = await Search()
//     //console.log('搜索数据',data);
// }
const goBack = ()=>{
  router.back()
}
</script>
<template>
  <div class="topNav">
    <!-- 头部左边 -->
    <div class="left-icon">
      <i class="iconfont icon-zuo"  @click="goBack()" v-show="!props?.mv"></i>
    </div>
    <!-- 搜索框div -->
    <div class="filter">
      <!-- 放大镜div -->
      <div class="search">
        <i class="iconfont icon-sousuo" ></i>
      </div>
      <!-- 输入框 -->
      <input
        class="filter-inner"
        type="text"
        placeholder="我爱的这个世界"
        v-model="keyword"
      />
    </div>
    <!-- 搜索 -->
    <div class="searchBtn" @click="handleSubmit($event)">搜索</div>
    
    <!-- <input class="searchBtn" type="submit" value="提交" @click="handleSubmit($event)"/> -->
  </div>
</template>
<style scoped>
.topNav {
  padding: 0 0.4rem;
  width: 100%;
  display: flex;
  top: 0;
  left: 0;
  position: fixed;
  height: 1.4rem;
  /* background-color: rgb(40, 30, 38); */
  align-items: center;
  /* padding: 0rem 0.4rem; */
  /* justify-content: space-between; */
  justify-content: space-around;
  z-index: 1;
  /* 头部透明背景 0.08*/
  background-color: rgba(241, 231, 231, 0.03)
}
.left-icon {
  width: 0.5rem;
}
.left-icon i {
  color: #e4e0e0;
  font-size: 0.6rem;
}
.filter {
  position: relative;
  display: flex;
  height: 0.8rem;
  width: 70%;
  /* background-color: aqua; */

  margin-left: 0.4rem;
  border-radius: 1rem;
  align-items: center;
}
.filter .search {
  position: absolute;
  left: 0.3rem;
  top: 0.1rem;
  color: rgb(120, 120, 98);
}
.filter .search i {
  margin-top: 0.1rem;
  font-size: 0.4rem;
}
.filter-inner {
  padding-left: 0.9rem;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 1rem;
  font-size: 0.32rem;
  color: rgb(160, 160, 172);

  background-color: rgb(61, 51, 59);
}
.searchBtn {
  width: 15vw;
  font-size: 20px;
  color: rgb(218, 219, 222);
  text-align: right;
  border: none;
}
</style>