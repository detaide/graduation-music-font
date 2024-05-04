<template>
    <div class="container">
        <div class="mv-box" v-for="(item, index) in props?.mvResult.mvs" :key="index" @click="jump2PlayMv(item)">
            <div class="left" :style="{'background-image' : `url('${item.cover ?item.cover : './bg-1.png'}')`}"></div>
            <div class="right">
                <div class="title">{{ item.name }}</div>
                <div class="artist">作者:{{ item.artistName }}</div>
                <div class="playCount">{{  item.playCount + "播放" }}</div>
            </div>
        </div>
    </div>
</template>
    
<script setup >
    // import router from "@/router/index.js";
    import {useRouter} from "vue-router"
    import {onMounted, watch} from "vue"
    const props = defineProps(['mvResult']);
    const router = useRouter();

    onMounted(() => {
        //console.log("p", props.mvResult)  
    })

    // watch(router.query, () =>
    // {
    //     console.log(router.query)
    // })

    function jump2PlayMv(item)
    {
        //console.log(item);
        router.push({
            path:'/MVPlay',
            query:{id:item.id}
        })
    }

</script>
    
<style scoped>
.container{
    /* width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    overflow: auto; */
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 90px 20px;
}


.mv-box{
    display: flex;
    flex-direction: row;
    gap: 20px;
    height: 150px;
    width: 100%;
    /* border: 1px solid white; */
    padding: 15px;
    background-color: #bbb;
    border-radius: 12px;
}
.left{
    /* border: 1px solid white; */
    width: 180px;
    height: 120px;
    border-radius: 10px;
    background-size: cover;
}

.right{
    /* width: 50%;
    height: 100%;
    border: 1px solid black; */
    color: white;
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-top: 20px;
}

.playCount{
    font-size: 12px;
}
</style>