<script setup>
    
</script>
<template>
    <div class="historybox">哈哈哈啦啦啦
      <!-- <div class="Tophistorybox">
        <div class="tag">搜索历史</div>
        <i class="iconfont icon-shanchu" @click="deleteHistory()"></i>
      </div>
      <div class="historyList">
        <span
          class="historyItem"
          v-for="(item, i) in keywordArr"
          :key="i"
          @click="tagSearch(item)"
          >{{ item }}</span
        >
      </div> -->
    </div>
</template>
<style scoped>
 .historybox {
  width: 70%vw;
  height: 30vh;
  /* background-color: #bfa; */
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
  color: #fff;
}
.historyList {

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
</style>