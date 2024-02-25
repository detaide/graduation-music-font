<template>
    <div class="recentDialog">
		<div class="list" v-show="props?.musicStore.playlist.length != 0" v-for="(track, i) in Object.values(props?.musicStore.playlistInfo).sort((a, b) => a.order - b.order)" :key="i" >
			<div class="serialNumber" @click="playMusic(props?.musicStore.playlist, i)">{{ i + 1 }}</div>
			<div class="song">
				<div class="songInfo" @click="playMusic(props?.musicStore.playlist, i)">
					<div class="songTitle">{{ track.name }}</div>
					<ul class="songCreator-wrapper">
						<li class="songCreator" v-for="(nameitem, index) in track.ar" :key="index">{{
							`${nameitem.name}&nbsp;&nbsp;&nbsp;` }}</li>
					</ul>
					<!-- <div class="songCreator" v-for="(nameitem,index) in track.ar" :key="index">{{ nameitem.name}}</div> -->
				</div>
				<div class="mvicon" v-if="track.mv != 0"><i class="iconfont icon-shipin"></i></div>
			</div>
			<!-- <div class="more" @click='showPopup(i)'><i class="iconfont icon-gengduo-shuxiang"></i></div> -->
			<!-- 歌曲的更多选线遮罩层 -->
			<!-- <van-popup v-model:show="show[i]" position="bottom" duration="0.1" round :style="{ height: '50%' }">
				<itemMusicMore :item="track" :i=i :id=track?.ar[0]?.id  
					:local="true"
					@deleteFinish="deleteFinish()"
				></itemMusicMore>
			</van-popup> -->

		</div>
	</div>
</template>
    
<script setup >
    import { eventBus } from '../../utils/EventBus';
    import {onMounted} from "vue"

    const props = defineProps(["musicStore"]);

    function playMusic(v, i, track) {
        props?.musicStore.updatePlay(i)
        // eventBus.emit("changeAudioSource", '')
    }

    onMounted(() => {

    })

</script>
    
<style scoped>

.recentDialog{
	position: absolute;
	right: 0;
	bottom: 0;
	border: 1px solid white;
	height: 100%;
	border-radius: 20px;
	width: 100%;
	background-image: linear-gradient(to bottom, #1c2435, #555050);
	padding-top: 20px;
	overflow: auto;
}

.list {
	display: flex;
	width: 100%;
	height: 1.2rem;
	/* background-color: red; */
}

.list .serialNumber {

	line-height: 1.2rem;
	text-align: center;
	font-size: 0.45rem;
	width: 15%;
	color: #b7aeae;

}

.list .song {
	width: 70%;
	height: 100%;
	display: flex;
}

.list .song .songInfo {
	width: 78%;
	height: 100%;


}

.list .song .songInfo .songTitle {
	height: 50%;
	font-size: .36rem;
	font-weight: 550;
	color: #dcd8d8;
	margin-top: .1rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

	/* line-height: 20%; */

}

.songCreator-wrapper {
	display: flex;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.list .song .songInfo .songCreator {

	height: 50%;
	font-size: .28rem;
	/* font-weight: 550; */
	color: #bab5b5;


}

.list .song .mvicon {
	padding-top: 0.25rem;
	width: 22%;
	padding-right: 0.2rem;
	text-align: right;
}

.list .song .mvicon i {
	font-size: 0.4rem;
	color: #dcd8d8;
}

</style>