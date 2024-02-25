<template>
    <div>
        <ul class="userlist">
			<div class="info">歌单</div>

			<li class="useritem" v-for="(item, i) in UserList" :key="i" @click="addToplayTable(item)">
				<div >
					<img :src="item.coverImgUrl" style="width: 1rem; border-radius: 10px" alt="" />
				</div>
				<div class="namebox" >
					<div class="name">{{ item.playtable_name }}</div>
					<div class="number">{{ item.count }}首</div>
				</div>

			</li>
		</ul>
    </div>
</template>
    
<script setup>

import { getUserData, getLikeList } from "@/request/api/user.js";
import { getPlaylistDetail, getPlaylistAll } from "@/request/api/item.js";
import { usemusicStore } from "@/store/music.js";
import { onMounted, onUpdated, reactive, ref, onBeforeMount, provide } from "vue";
import router from "@/router/index.js";
import { deleteMusicList } from '@/request/api/user.js'
import DeletePopup from "../UI/DeletePopup.vue";
import {bringPlayList, addPlayList2Local} from "../../request/localApi/user";
import {eventBus} from "@/utils/EventBus"

const musicStore = usemusicStore();
const userId = localStorage.getItem("userId");
// 使用reactive创建的对象是常量，那就不能再用来接受接口的返回值，可以用Objec.assign()方法，拷贝一下
const UserList = ref([]);

onMounted(async () => {
    // 这里用户歌单
    let result = await bringPlayList(userId);
    let resData = result.data.data
    // 用户歌单
    UserList.value = resData.data;
    musicStore.addPlayTable(resData.data, true);
});

function addToplayTable(item)
{
    eventBus.emit("addToPlayTable", item);
    
}

</script>
    
<style scoped>

.userlist {
	/* margin-top: 20px; */
	border-radius: 15px;
	background-color: rgb(44, 44, 44);
	padding: 5px 10px;
	color: #fff;
}

.userlist .info {
	margin: 10px;
	font-size: 15px;
	color: #9d9999;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.useritem {
	display: flex;
	margin-bottom: 7px;
	justify-content: space-around;
	padding: 0px 12px;
}

.useritem .namebox {
	width: 70%;
}

.useritem .namebox .name {
	font-size: 17px;
	color: #fff;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.useritem .namebox .number {
	font-size: 14px;
	color: #b9b4b4;
}

.useritem .more i {
	font-size: 23px;
	color: #a79d9d;
}
</style>