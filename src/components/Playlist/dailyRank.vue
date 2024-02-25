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
                    <div class="title" style="font-size: 22px; font-weight: bold; color: aliceblue;">排行榜</div>
                    <div class="description">排行的不是歌，而是你我的心情...</div>
                </div>
            </div>
        </div>
        <div class="bottom-container" v-if="rankDetail?.list">
            <rankItem v-for="(item, index) in rankDetail?.list" :key="index" :item="item" class="rankItem" @click="loadPlayList(item)"/>
        </div>
    </div>
</template>
    
<script setup >
    import itemMusicBottom from "./itemMusic.bottom.vue";
    import {ref, onMounted} from "vue";
    import {getDailyRecommand, getPlaylistDetail} from "@/request/api/item.js"
    import rankItem from "./rankItem.vue"
    import { getRankDetail } from "../../request/api/item";
    import router from "@/router/index.js";

    const rankDetail = ref(null)
    const recommandReason = ref(null)

    let currentTime = new Date();

    let month = currentTime.getMonth() + 1 > 10 ? currentTime.getMonth() + 1 : '0' + (currentTime.getMonth() + 1)
    let day = currentTime.getDate() + 1 > 10 ? currentTime.getDate()  + 1 : '0' + (currentTime.getDate() + 1);

    onMounted(async () => {
        let detailRes  = await getRankDetail()
        rankDetail.value = detailRes.data
        // router.push()
    })

    async function loadPlayList(item)
    {
        // let playlistDetail = await getPlaylistDetail(item?.id);
        // //console.log(playlistDetail)
        router.push({
            path:'/itemmusic',
            query:{id:item.id}
        })
    }

</script>
    
<style scoped>

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
    height: 20%;
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

.rankItem{
    width: 80%;
    height: 140px;
    border: 1px solid aliceblue;
    border-radius: 10px;
    margin: auto;
    padding: 5px 10px;
    background-color: #4f6d6d;
}

.bottom-container{
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 20px;
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