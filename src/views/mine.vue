<script setup>
import { getUserData, getLikeList } from "@/request/api/user.js";
import { getPlaylistDetail, getPlaylistAll } from "@/request/api/item.js";
import { usemusicStore } from "@/store/music.js";
import { onMounted, onUpdated, reactive, ref, onBeforeMount, provide } from "vue";
import router from "@/router/index.js";
import { deleteMusicList } from '@/request/api/user.js'
import DeletePopup from "../components/UI/DeletePopup.vue";
import {bringPlayList, addPlayList2Local, addPlayTable2Local} from "../request/localApi/user";

const playTableInput = ref(null);
const musicStore = usemusicStore();
const userId = localStorage.getItem("userId");
//console.log(userId);
const likelist = ref([]);
const show = ref(null);
// 使用reactive创建的对象是常量，那就不能再用来接受接口的返回值，可以用Objec.assign()方法，拷贝一下
const userData = reactive({});
const UserList = ref([]);
const playTableEdit = ref(null);


onMounted(async () => {
	
	// 这里用户歌单
	let result = await bringPlayList(userId);
	let resData = result.data.data
	
	// 用户歌单
	UserList.value = resData.data;
	musicStore.addPlayTable(resData.data);
	// 初始化 show 为与 UserList 长度相同的布尔数组
	show.value = Array(UserList.value.length).fill(false);
});
const openlist = (item) => {
	router.push({
		path: "/itemmusicLocal",
		query: { id: item.id },
	});
};

function showPopup(i) {
	console.log("show")
	show.value[i] = true;
}

function addPlayTabelCancel()
{
	playTableEdit.value = false;
	playTableInput.value = '';
}

async function addPlayTableSubmit()
{
	let response = await addPlayTable2Local(userId, playTableInput.value)
	let resData = response.data.data;
	if(!resData.status)
	{
		alert("添加失败");
		return;
	}

	likelist.value.push(resData.data.playtable_id);
	musicStore.addPlayTable([resData.data.playtable_id]);
	playTableEdit.value = false;
	location.reload()
}

function addPlayTable()
{
	playTableEdit.value = true;
}

function logout()
{
	localStorage.setItem("userId", '');
	musicStore.isLogin = false;
}

</script>
<template >
	<div class="userbox">
		<!-- 头部导航 -->
		<div class="topbar">
			<div class="leftbox">
				<i class="iconfont icon-list"></i>
			</div>
			<!-- 跳转到搜索页面 -->
			<router-link to="/search">
				<div class="rightbox">
					<i class="iconfont icon-sousuo"></i>
				</div>
			</router-link>
		</div>
		<!-- 我的信息简介 -->
		<div class="top">
			<img :src="userData.profile?.avatarUrl || './avator.png'" alt="" style="width: 1.5rem" class="avatar"/>
			<div class="userid">{{ userData.profile?.nickname }}</div>
			<div class="detail">
				<div class="concern">{{ userData.profile?.follows }}关注</div>
				<div class="icon">|</div>
				<div class="fancy">{{ userData.profile?.followeds }}粉丝</div>
				<div class="icon">|</div>
				<div class="level">Lv.{{ userData.level || 0 }}</div>
			</div>
		</div>
		<ul class="function">
			<li>
				<div class="iconfont icon-24gf-playCircle"></div>
				<span>最近播放</span>
			</li>
			<li>
				<div class="iconfont icon-bendisucai"></div>
				<span>本地下载</span>
			</li>
			<li>
				<div class="iconfont icon-shangchuanyunpan"></div>
				<span>云盘</span>
			</li>
			<li>
				<div class="iconfont icon-huiyuanqiagoumai"></div>
				<span>已购</span>
			</li>
			<li>
				<div class="iconfont icon-haoyoutuijie"></div>
				<span>我的好友</span>
			</li>
			<li>
				<div class="iconfont icon-shoucangjia"></div>
				<span>收藏和赞</span>
			</li>
			<li>
				<div class="iconfont icon-_gongguanchuanbo"></div>
				<span>我的播客</span>
			</li>
			<li>
				<div class="iconfont icon-iconxd"></div>
				<span>乐迷团</span>
			</li>
		</ul>
		<!-- 点击跳转到歌单详情页，参数id -->
		<ul class="userlist">
			<div class="info">歌单 <div @click="addPlayTable()"><el-icon><CirclePlus /></el-icon></div></div>

			<li class="useritem" v-for="(item, i) in UserList" :key="i">
				<div @click="openlist(item)">
					<img :src="item.coverImgUrl || './playlist.png'" style="width: 1rem; border-radius: 10px; margin-right: 10px;" alt="" />
				</div>
				<div class="namebox" @click="openlist(item)">
					<div class="name">{{ item.playtable_name }}</div>
					<div class="number">{{ item.count }}首</div>
				</div>
				<div class="more">
					<i class="iconfont icon-gengduo-shuxiang" @click="showPopup(i)"></i>
				</div>
				<!-- 歌单的更多选线遮罩层 -->
				<van-popup v-model:show="show[i]" position="bottom" duration="0.1" round :style="{ height: '30%' }">
					<DeletePopup :item="item" :i=i></DeletePopup>
				</van-popup>
			</li>
		</ul>
		<div class="logout" @click="logout">
			<router-link to="/">退出</router-link>
		</div>
	</div>

	<van-popup
		v-model:show="playTableEdit"
		style="width: 100%;height: 20vh;border-radius: 20px;padding: 20px;"
	>
		<div class="toolbar">
			<div class="cancel" @click="addPlayTabelCancel()">取消</div>
			<div class="submit" @click="addPlayTableSubmit()">完成</div>
		</div>

		<el-input v-model="playTableInput" placeholder="输入新建歌单标题" />
	</van-popup>
	<!-- <div class="playTableDialog" ref="playTableEdit">
		
	</div> -->
</template>
<style scoped >
.van-popup van-popup--bottom {
	border-radius: 20px;
}

.avatar{
	height: 1.5rem;
	border-radius: 50%;
	border: 1px solid #aaa;
	background-color: #9d9999;
}

.userbox {
	width: 100vw;
	height: 100vh;
	/* background-color: red; */
	padding: 0 20px;
	margin-bottom: 360px;
	background: linear-gradient(white, #ccc);
}

.topbar {
	height: 80px;
	/* background-color: #fff; */
	width: 100%;
	/* height: 1rem; */
	display: flex;
	padding: 0.2rem 0.4rem;
	justify-content: space-between;
	/* position: relative; */
	/* color: #fff; */
	position: fixed;
	top: 0px;
	left: 0;
	z-index: 1;
	/* 头部透明背景 0.08*/
	background-color: rgba(241, 231, 231, 0.03);
	border-bottom: 1px solid #ccc;
}

.leftbox {
	display: flex;
	font-size: 0.44rem;
	align-items: center;
	/* color: #fff; */
}

.leftbox i {
	font-size: 0.8rem;
	margin-right: 0.3rem;
}

.rightbox {
	display: flex;
	align-items: center;
}

.rightbox i {
	font-size: 0.6rem;
	margin-top: 5px;
	color: #fff;
	/* padding-left: 0.5rem; */
}

.top {
	text-align: center;
	margin-top: 140px;
	position: relative;
	background-color: rgb(44, 44, 44);
	padding: 40px 0 20px 0;
	border-radius: 15px;
}

.top img {
	border-radius: 50%;
	position: absolute;
	top: -0.75rem;
	left: 40%;
}

.userid {
	color: #fff;
	font-size: 25px;
	margin: 5px 0;
}

.detail {
	display: flex;
	justify-content: center;
	font-size: 16px;
	color: rgb(109, 109, 109);
}

.detail .icon {
	margin: 0 6px;
}

.concern,
.fancy,
.level {
	font-weight: bold;
}

.function {
	margin-top: 20px;
	display: flex;
	flex-wrap: wrap;
	background-color: rgb(44, 44, 44);
	border-radius: 15px;
	padding: 5px 10px 10px 10px;
}

.function li {
	width: 25%;
	height: 1.5rem;
	font-size: 13px;
	color: #fff;
	text-align: center;
	position: relative;
}

.function div {
	font-size: 35px;
	height: 56px;
	color: rgb(246, 60, 61);
}

.function li div.icon-bendisucai::before {
	font-size: 45px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 55px;
	margin: auto;
	height: 40px;
	width: 40px;
}

.function li div.icon-huiyuanqiagoumai::before {
	font-size: 45px;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 55px;
	margin: auto;
	height: 40px;
	width: 40px;
}

.userlist {
	margin-top: 20px;
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
	justify-content: space-between;
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

.playTableDialog{
	width: 100%;
	height: 0;
	background-color: white;
	border-radius: 20px;
	display: flex;
	position: absolute;
	bottom: 0;
	visibility: hidden;
	padding: 10px 20px;
	flex-direction: column;
	gap: 20px;
}

.playTableDialog.active{
	height: 40vh;
	visibility: visible;
}

.toolbar{
	padding: 10px 0 10px 0;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	
}

.logout{
	width: 70%;
	border: 1px solid white;
	margin: auto;
	text-align: center;
	padding: 5px;
	border-radius: 10px;
	margin-top: 30px;
}

.logout *{
	color: white;
	
}

</style>