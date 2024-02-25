<template>
    <div class="daily-container">
        <div class="topcontainer">
            <i class="iconfont icon-zuojiantou1 back" @click="$router.go(-1)"></i>
            <div class="top-show">
                <div class="left-box">
                    <!-- <img src="" alt="" class="image"> -->
                    <div>{{ month }} </div>
                    <div> / </div>
                    <div>{{ day }}</div>
                </div>
                <div class="right-box">
                    <div class="title" style="font-size: 22px; font-weight: bold; color: aliceblue;">每日推荐</div>
                    <div class="description">每天都是新的一天,一起享受满满的热情吧</div>
                </div>
            </div>
            <div class="recommeng-reaon">
                <div style="text-wrap: nowrap;">推荐原因</div>
                <div class="reason" v-for="(item, index) in recommandReason" :key="index">{{ item.reason }}</div>
            </div>
        </div>
        <div class="bottom-container">
            <itemMusicBottom v-if="state?.playlist" :playlist="state" ></itemMusicBottom>
        </div>
    </div>
</template>
    
<script setup >
    import itemMusicBottom from "./itemMusic.bottom.vue";
    import {ref, onMounted} from "vue";
    import {getDailyRecommand} from "@/request/api/item.js"

    const state = ref({})
    const recommandReason = ref(null)

    let currentTime = new Date();

    let month = currentTime.getMonth() + 1 > 10 ? currentTime.getMonth() + 1 : '0' + (currentTime.getMonth() + 1)
    let day = currentTime.getDate() + 1 > 10 ? currentTime.getDate()  + 1 : '0' + (currentTime.getDate() + 1);

    onMounted(async () => {
        let dailySongsRes = await getDailyRecommand();
        state.value.playlist = {
            tracks : dailySongsRes.data.data.dailySongs
        };
        recommandReason.value = dailySongsRes.data.data.recommendReasons.slice(0,7);
        //console.log(dailySongsRes)
    })
</script>
    
<style scoped>

.back{
    position: absolute;
    width: 30px;
    height: 30px;
    left:  5%;
    top: 2%;
    color: white;
    font-size: 25px;
}

.daily-container{
    /* width: 100%; */
    /* height: 100%; */
    height: 100vh;
    width: 100vw;
    position: relative;
    
}

.daily-container::before{
    content: '';
    background-image: url('@/assets/bg-1.png');
    background-size: auto;
    width: 100%;
    height: 100%;
    display: block;
    z-index: -100;
    position: absolute;
    filter: blur(.8rem);
}

.topcontainer{
    width: 100%;
    height: 30%;
    border: 1px solid white;
    padding: 40px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.top-show{
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.recommeng-reaon{
    width: 100%;
    height: 28%;
    /* border: 1px solid white; */
    justify-content: flex-start;
    align-items: center;
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
    
}

.recommeng-reaon *
{
    color: aliceblue;
}

.reason{
    border: 1px solid aliceblue;
    text-wrap: nowrap;
    font-size: 12px;
    border-radius: 6px;
    padding: 2px;
    color: rgb(247, 15, 15);
}

.left-box{
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: row;
    gap: 4px;
    align-items: center;
    justify-content: center;
}

.left-box *{
    color: aliceblue;
    font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 45px;
}

.image{
    width: 2rem;
    height: 2rem;
    border-radius: 10px;
    border: 1px solid white;
    
}

.right-box *{
    color: aliceblue;

}

.right-box{
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-width: 150px;
}


    
</style>