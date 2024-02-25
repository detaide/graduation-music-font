<template>
    <div>
        <div class="container">
            <div class="top-box">
                <div class="title">{{ props.item?.name }}</div>
                <div class="update-frequency">{{ props.item?.updateFrequency }}</div>
            </div>
            <div class="bottom-box">
                <img class="left-image" :src="props.item?.coverImgUrl">
                <div class="right-text">
                    <div class="track-item" v-for="(track, index) in props.item?.tracks" :key="index">
                        <span>{{ index + 1 }}</span>
                        <span>{{ track.first.length > 4 ? track.first.slice(0,4) + '...' : track.first }}</span>
                        <span>- {{ track.second.length > 4 ? track.second.slice(0,4) + '...' : track.second }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import {onMounted} from "vue"    

    const props = defineProps(["item"])

    onMounted(() => {
    })
    
</script>
    
<style scoped>
    .container{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 8px;
    }

    .top-box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .title{
        font-size: 20px;
        font-weight: bold;
        color: aliceblue;
    }
    .update-frequency{
        font-size: 12px;
        color: #aaa;
    }
    .bottom-box{
        display: flex;
        flex-direction: row;
        gap: 10px;
        justify-content: space-between;
    }
    .right-text{
        color: aliceblue;
    }
    .left-image{
        width: 60px;
        height: 60px;
        border-radius: 10px;
    }
    .track-item{
        display: flex;
        flex-direction: row;
        gap: 4px;
    }

</style>