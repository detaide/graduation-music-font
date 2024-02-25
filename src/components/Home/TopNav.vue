<script setup>
</script>
<template >
  <!-- 头部 -->
  <div class="topNav">
    <!-- 头部左边 -->
    <div class="left-icon">
      <i class="iconfont icon-list"></i>
    </div>
    <router-link to="/search">
      <!-- 搜索框div -->
      <div class="filter">
        <div class="filter-left"></div>
        <!-- 放大镜div -->
        <div class="search">
          <i class="iconfont icon-sousuo"></i>
        </div>
        <!-- 输入框 readonly=“readonly”-->
        <input
          
          class="filter-inner"
          type="text"
          placeholder="我爱的这个世界"
        /></div>
      </router-link> 
    <!-- 扫一扫 -->
    <div class="QRcode">
      <i class="iconfont icon-saoyisao"></i>
    </div>
  </div>
</template>
<style scoped >
.topNav {
  width: 100%;
  display: flex;
  height: 1.2rem;
  background-color: #242323;
  align-items: center;
  padding: 0rem 1em;
}
.left-icon {
  width: 0.5rem;
  height: 100%;
}
.left-icon i {
  color: #fff;
  font-size: 0.8rem;
}
.filter {
  position: relative;
  display: flex;
  height: 0.8rem;
  width: 87%;
  /* background-color: aqua; */
  margin-left: 0.67rem;
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
.QRcode {
  position: absolute;
  right: 0;
  margin-right: 0.4rem;
  color: rgb(120, 120, 98);
}
.QRcode i {
  margin-top: 0.1rem;
  font-size: 0.5rem;
}
.filter-inner {
  color:rgb(234, 229, 229);
  padding-left: 0.9rem;
  height: 100%;
  width: 100%;
  border: none;
  border-radius: 1rem;
  font-size: 0.32rem;
  background-color: rgb(61, 51, 59);
}
</style>