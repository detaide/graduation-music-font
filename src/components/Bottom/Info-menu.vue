<script setup>
  import {ref} from 'vue'
  const page = ref(null);
  const mv = ref(null);
  const mine = ref(null)

  function handle(i)
  {
    page.value.classList.remove('active');
    mv.value.classList.remove('active');
    mine.value.classList.remove('active');
    switch(i)
    {
      case 'page' : page.value.classList.add('active'); break;
      case "mv" : mv.value.classList.add('active'); break;
      case "mine" : mine.value.classList.add('active'); break;
    }
  }
</script>
<template >
  <div class="info-menu">
    <div class="active" @click="handle('page')" ref="page">
      <router-link to="/">
        <i class="iconfont icon-wangyiyunyinle1-copy"></i>
        <p>发现</p>
      </router-link>    
    </div>
    <!-- <div class="active">
      <router-link to="/podcasts">
        <i class="iconfont icon-_gongguanchuanbo"></i>
        <p>播客</p>
      </router-link>
      
    </div> -->
    <div class="" @click="handle('mv')" ref="mv">
      <router-link to="/mv" >
        <i class="iconfont icon-huxingmanyou"></i>
        <p>MV</p>
      </router-link>
      
    </div>
    <!-- <div class="active">
      <router-link to="/developments">
        <i class="iconfont icon-xiaoxi-zhihui"></i>
        <p>动态</p>
      </router-link>
      
    </div> -->
    <div class="" @click="handle('mine')" ref="mine">
      <router-link to="/mine">
        <i class="iconfont icon-yinle"></i>
        <p>我的</p>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.info-menu {

/* height共1.5rem */
  height: 1.5rem;
  /* margin: .1rem .2rem 0rem .2rem; */
  background-color: #242323;
  display: flex;
  justify-content: space-around;
  /* margin: 0 0.2rem; */
  /* font-size: 0.25rem; */
  align-items: center;
  width: 100%;
  position: absolute;
  left:  0;
  bottom: 0;
  
}
.info-menu div{
    width: 20%;
    height: 100%;
    text-align: center;
}
.info-menu p{
    color: grey;
    font-size: 0.25rem;
    font-weight: bold;
    text-align: center;
}
.info-menu i{
    font-size: 0.6rem;
    color: grey;
}

.active *{
  color: red !important;
}
</style>