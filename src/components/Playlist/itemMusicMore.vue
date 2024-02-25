<script setup>
import {deleteMusicList} from '@/request/api/user.js'
import {inject, onMounted} from 'vue'
import router from '../../router'
import {deleteLocalPlayList} from '@/request/localApi/songs.js'

const props = defineProps(["item","i","id", 'local', "playTableInfo"])
const emit = defineEmits(["addToPlayTableEmit", "deleteFinish"]);

const deleteML = async()=>{
    // //console.log(props)
    let msg = "您真的确定要删除吗？\n\n请确认！"; 
        // 接口删除失败
        // let res = await deleteMusicList(props.item)
        // //console.log('执行了',res);

        // 不用api的数组删除元素
        // UserList.value.splice(props.i,1)
        let userId = localStorage.getItem("userId")
        // //console.log(props.playTableInfo)
        let res = await deleteLocalPlayList(props?.item?.local_id, userId, props.playTableInfo.id);
        emit("deleteFinish", '');
}
const toSinger = ()=>{
    router.push({
        path:'/singer',
        query:{id:props.id}
    })
}

function addToPlayTableHandle()
{
    emit("addToPlayTableEmit", '');
}

onMounted(() => {
    //console.log("local : ", props.local)
})

</script>
<template>
    <div class="deletepopup">
        <div class="topbar">歌单:{{props.item.playtable_name}}</div>
        <div class="more">
            <div class="download"><i class="iconfont icon-play1"></i><span>下一首播放</span></div>
            <div class="download" @click="toSinger()"><i class="iconfont icon-jurassic_user"></i><span>歌手</span></div>
            <div class="download"><i class="iconfont icon-yinle1"></i><span>专辑</span></div>
            <div class="download" @click="addToPlayTableHandle()"><i class="iconfont icon-tianjiadingdan1"></i><span>添加到歌单</span></div>
            <div class="download"><i class="iconfont icon-xiazai1"></i><span>下载</span></div>
            <div class="share"><i class="iconfont icon-fenxiang"></i><span>分享</span></div>
            <div class="edit" ><i class="iconfont icon-dingdan"></i><span>编辑歌单信息</span></div>
            <div class="delete" @click="deleteML()" v-show="props.local"><i class="iconfont icon-shanchu"></i><span>删除</span></div>
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
    color: #fff;
}
.more{
    display: flex;
    flex-direction: column;
    padding: 0 30px;
}
.more div{
    padding: 12px 0;
    font-size: 16px;
    color: #fff;
}
.more div i{
    font-size: 20px;
    margin-right: 8px;
}
</style>