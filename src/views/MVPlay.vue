<template>
    <div class="container" v-if="mvInfo">
        <i class="iconfont icon-zuojiantou1 back" @click="backHandle"></i>
        <div class="videoInfo" >
            <video class="video" controls>
                <!-- TODO 请解除下行注释，因为请求消耗我流量，并关闭第二个source -->
                <!-- <source :src="mvInfo.url ?? '../assets/demo.mp4'" type="video/mp4"> -->
                <source src="../assets/demo.mp4" type="video/mp4">

            </video>
            <div class="info">
                <div class="title">{{ mvInfo.name }}</div>
                <div class="publish">发布时间:{{ mvInfo.publishTime }}</div>
                <div class="artist">作者：{{ mvInfo.artistName }}</div>
            </div>
        </div>
        <div class="right-fix">
            <!-- 点赞 -->
            <div class="sub">点赞 {{ mvInfo.subCount }}</div> 
            <div class="play">播放 {{ mvInfo.playCount }}</div>
            <div class="comment">评论 {{ mvInfo.commentCount }}</div>
            <div class="share"> 分享 {{ mvInfo.shareCount }}</div>
            
        </div>
        
    </div>
</template>
    
<script setup >
// import router from "@/router/index.js";
import { useRoute } from "vue-router";
import {mvDetail, mvURL} from "../request/api/search"
import {onMounted, ref} from "vue"
import {useRouter} from "vue-router"

let id = useRoute().query.id;
let mvInfo = ref(null);
let router = useRouter();
onMounted(async () =>
{
    let result = await mvDetail(id)
    //console.log(result)
    let mvURLResult = await mvURL(id, result.data?.data?.brs[result.data?.data?.brs.length - 1]?.br || null);
    mvInfo.value = result.data.data;
    mvInfo.value.url = mvURLResult.data.data.url;
    //console.log(mvInfo.value)
    // mvInfo.value = result.data;
    // let mvURLRes
})
    
function backHandle()
{
    router.push({
        name : "mv", 
        query : {page : true}
    })
}

</script>
    
<style scoped>
    .container{
        width: 100%;
        height: 100%;

    }

    .right-fix{
        position: fixed;
        /* top: 50%; */
        right: 5%;
        display: flex;
        gap: 10px;
        flex-direction: column;
        bottom: 20%;
        color: white;
        /* transform: translate(0, -50%); */
    }

    .right-fix *{
        width: 50px;
        height: 50px;
        border: 1px solid white;
    }
    

    .videoInfo{
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
    }
    .video{
        /* width: 100%; */
        /* height: 300px; */
        width: 100%;
        aspect-ratio: 16/9;

    }

    .info{
        color: white;
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: center;
        justify-content: center;
    }

    .info .title
    {
        font-size: 26px;
    }

    .back{
        position: absolute;
        width: 30px;
        height: 30px;
        left:  5%;
        top: 2%;
        color: white;
        font-size: 25px;
    }
</style>