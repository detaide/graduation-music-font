<script setup>
import {ref,onMounted} from 'vue'
import axios from 'axios'
import {getBanner} from '../../request/api/home'
const images = ref([
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg',
      'https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg',
    ])
onMounted(async()=>{
    // axios.get('http://localhost:3000/banner')
    // .then((response)=>{
    //     images.value = response.data.banners
    //     //console.log(response);
    // })

  // 这里res就是axios返回的response
  let res = await getBanner()
  images.value = res.data.banners
  //console.log(res);
})

</script>
<template >
  <div class="swipe">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<style >
.van-swipe{
    position: relative;
    margin: 0 auto;
}
.van-swipe-item{
    width: 100%;
    padding: 0.2rem;
    /* margin: 0 auto; */
}
.van-swipe-item img{
    width: 100%;
    height: 3.5rem;
    border-radius: 0.2rem;
}
/* 轮播图的小点 位置依然没有调整好 */
.van-swipe__indicator{
    background-color: #000;

    bottom: -0.4rem;
    position: absolute;
    /* z-index: 999999; */
}

</style>