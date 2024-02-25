<template>
    <div>
        <div class="info">
            评论
        </div>
        <div class="container" v-if="contentList">
            <singleContent :contentList="contentList"/>
        </div>
        <div class="text-area">
            <el-input
                    v-model="text"
                    maxlength="100"
                    placeholder="Please input"
                    show-word-limit
                    type="textarea"
                    :rows="3"
                />
                <div class="content-textarea-button">
                    <button class="m-button bar on" @click="replySubmit()">回复</button>
                    <button class="m-button bar ">取消</button>
                </div>
        </div>
    </div>
</template>
    
<script setup>
import singleContent from "./singleContent.vue"
import {localContent, localAddContent} from "../../request/localApi/content";
import {onMounted, ref} from "vue"
import { usemusicStore } from "../../store/music";

const musicStore = usemusicStore();

let contentList = ref(null);
const IndexMap = new Map()
const text = ref('hello world');

async function replySubmit()
{
    let user_id = localStorage.getItem("userId");
    if(!user_id)
    {
        alert("请先登录");
        return;
    }
    let musicId = musicStore.getCurrentMusicId();
    let content = text.value;
    let status = await localAddContent(musicId,'music',content, user_id)
    if(!status.data.data.status)
    {
        alert("回复失败")
        return;
    }

    text.value = '';
    let new_content = await getContent(musicId)
    contentList.value = contentDivide(new_content);
}

async function getContent(musicId)
{
    let result = await localContent('music', musicId);
    if(!result.data.data.status)
    {
        return false;
    }
    let content = result.data.data.data.content
    return content;
}


//评论数据分割
const contentDivide = (content) =>{
    if(!content){
        return []
    }

    IndexMap.clear()

    //content排序
    content.sort((a, b) =>{
        return a.id - b.id
    } )
    
    let father = []
        // 如果数据包含father_id就添加到数据集的子属性中，没有就保存到father中
    content.forEach((item)=>{
        //console.log(item)
        if(!item.father_id || item.father_id == 0){
            const rets =  father.push({father : item, son : [], subShow : false, reply : false})
            IndexMap.set(item.id, rets-1)
        }else{
            const index = IndexMap.get(item.father_id)
            if(index >= 0){
                father[index].son?.push(item)
            }
        }
    })

    return father
    
}

onMounted(async () => {
    let musicId = musicStore.getCurrentMusicId();
    let content = await getContent(musicId);
    //console.log(content)
    contentList.value = contentDivide(content);
    //console.log(contentList.value)
})

</script>
    
<style scoped>
    .info{
        color: white;
        font-size: 20px;
        padding: 10px;
        margin-left: .3rem;
    }

    .text-area{
        position: fixed;
        bottom: 0;
        width: 100%;
        height : 15%;
        /* border: 1px solid white; */
        /* display: flex; */
        padding: 0 10px;
    }

    .content-textarea-button{
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        padding-top: 10px;
    }

    .m-button{
        padding: 4px 8px;
        border-radius: 6px;
    }
    .container{
        overflow: auto;
        height: 70%;
    }
</style>