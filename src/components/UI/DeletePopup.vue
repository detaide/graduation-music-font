<script setup>
import {deleteMusicList} from '@/request/api/user.js'
import {inject} from 'vue'
import { deleteplayTable } from '../../request/localApi/user';

const props = defineProps(["item","i"])
const deleteML = async()=>{
    //console.log(props.item)
    let res = await deleteplayTable(props.item?.user_id, props.item?.id)
    location.reload();
}

</script>
<template>
    <div class="deletepopup">
        <div class="topbar">歌单:{{props.item.playtable_name}}</div>
        <div class="more">
            <div class="download"><i class="iconfont icon-xiazai1"></i><span>下载</span></div>
            <div class="share"><i class="iconfont icon-fenxiang"></i><span>分享</span></div>
            <div class="edit"><i class="iconfont icon-dingdan"></i><span>编辑歌单信息</span></div>
            <div class="delete" @click="deleteML()"><i class="iconfont icon-shanchu"></i><span>删除</span></div>
        </div>
    </div>
</template>
<style scoped>
 .deletepopup{
    background-color: rgb(59, 65, 65);
    width: 100vw;
    height: 100%;
    display: flex;
    flex-direction: column;
 }   
.topbar{
    width: 100%;
    font-size: 15px;
    padding: 12px 30px 10px 30px;
    border-bottom: 0.5px solid rgb(93, 89, 89);
}
.more{
    display: flex;
    flex-direction: column;
    padding: 0 30px;
}
.more div{
    padding: 9px 0;
    font-size: 16px;
}
.more div i{
    font-size: 20px;
    margin-right: 8px;
}
</style>