<template>
    <div class="single-container" v-for="(item, index) in props?.contentList" :key="index">
        <div class="head-img" @click="jumpTo(item.father.username)">
        </div>
        <div class="right">
            <div class="info">
                <div class="nickname">{{ item.father.username }}</div>
                <div class="time">{{ timeForamtter(item.father.time) }}</div>
                <div class="delete" @click="deleteContent(item, item.father)">删除</div>
            </div>
            
            <div class="content">{{ item.father.content }}</div>
            <div class="status">
                <div class="thumbs" @click="thumbs(item.father)">
                    <i class="fa fa-thumbs-o-up">&nbsp;{{ item.father.thumbs }}</i>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script setup>
    import {onMounted, ref} from "vue"
    import {localAddThubms, localDeleteContent} from "../../request/localApi/content";
    import { eventBus } from "../../utils/EventBus";

    const props = defineProps(["contentList"]);

    function timeForamtter(time)
    {
        let _time = new Date(+time);
        let year = _time.getFullYear().toString().padStart(4, '0');
        let month = (_time.getMonth() + 1).toString().padStart(2, '0');
        let day = (_time.getDate() + 1).toString().padStart(2, '0');
        let hour = (_time.getHours() + 1).toString().padStart(2, '0')
        let min = (_time.getMinutes() + 1).toString().padStart(2, '0')
        return `${year}-${month}-${day} ${hour}:${min}`
    }

    async function thumbs(item)
    {
        let status = await localAddThubms(item.id);
        if(status.data.data.status)
        {
            item.thumbs += 1;
        }
    }

    async function deleteContent(item, obj)
    {
        let userId = localStorage.getItem("userId");

        if(!userId)
        {
            alert("请先登录");
            return ;
        }

        let status = await localDeleteContent(obj.id, userId);
        if(status.data.data.status)
        {
            let index = props.contentList.indexOf(item);
            if(index != -1)
            {
                props.contentList.splice(index, 1);
            }
        }
    }

</script>
    
<style scoped>
    .single-container{
        color: white;
        display: flex;
        width:100%;
        padding: 10px;
        overflow: hidden;
        position: relative;
    }

    .single-container::after{
        content: '';
        border-bottom: 1px solid #d1d0d0;
        position: absolute;
        width: 90%;
        bottom: 0;
        left: 5%;
    }

    .head-img{
       
       width: 40px;
       height: 40px;
       /* // border: 1px solid black; */
       border-radius: 50%;
       margin: 10px;
       background-image: url('../../assets//bg-1.png');
       background-size: cover;
       margin-right: 20px;
       cursor: pointer;
   }
   .right{
        display: flex;
        flex-direction: column;
        width: 80%;
   }

   .info{
        display: flex;
        flex-direction: row;
        gap: 20px;
        position: relative;
        width: 100%;
   }

   .delete{
        position: absolute;
        right: 5%;
   }

   .content{
        font-size: 20px;
   }

   

</style>
