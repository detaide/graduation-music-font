import { defineStore } from 'pinia'
import { ref } from 'vue'
import { addPlayList2Local, bringPlayList, bringPlaytable, deletePlaylistBymusicId, getPlayListLocal, getUserInfo } from '../request/localApi/user'
import {getLyric} from "@/request/api/item.js"
import { getSongDetail } from '../request/api/item'

// import getPlaylistAll from '@/request/api/item'
export const usemusicStore = defineStore('music', {
    state: () => ({
        // 播放歌单
        playlist:  [
            {
                musicId : 1951069525,
                order : 1
            },
            {
                musicId : 1431292823,
                order : 2
            }
        ],
        playListIndex:   0,
        playlistData: {
            // 歌单id
            id: 737535139,
            // playListIndex:0,
        },
        lyricList: ref({}),  //歌词
        currentTime: 0,  //歌曲播放的当前时间
        duration: 0,     //歌曲总时长
        isLogin:false,      //是否登录
        isFooterMusic:true, //是否显示底部音乐
        isMusicMenu:true,   //是否显示底部菜单
        token:'',           //token
        id:'001',
        playTable : [],
        playlistInfo : {},
        playOrder : 0,      // 0 : 顺序， 1 ： 单曲， 2：随机
    }),
    getters: {

    },
    actions: {
        // 更新播放的列表
        async updatePlayList(value) {
            // //console.log("update : ", value)
            console.log(this.playlist);
            this.playlist = [...value];
            
            await this.getAllPlayListInfo();
            // localStorage.setItem('playlist', this.playlist);
        },
        // 播放下标对应的歌曲
        async updatePlay(i) {
            //console.log(i, this.playlist)
            this.playListIndex = i;
            // localStorage.setItem("playIndex", this.playListIndex);
            let lyricRes = await getLyric(this.playlist[i].musicId);
            this.lyricList.value = lyricRes.data.lrc;
        },
        // 更新歌词
        updatelyricList(value) {
            this.lyricList.value = value
        },
        updateOrder(order)
        {
            this.playOrder = order;
        },
        // 获取歌词
        getlyric: async (state) => {
            // let res = await getLyric(state.playlist[state.playListIndex].id)
            // //console.log('歌词：', res);
            state.updatelyricList(lrc)
        },
        // 获得当前时间
        getCurrentTime(value) {
            // 单位为秒
            // //console.log('store!',this.currentTime);
            this.currentTime = value
        },
        // 获得歌曲总时长
        getDuration(value) {
            this.duration = value
            //console.log(this.duration);
        },
        getCurrentMusicId()
        {
            return this.playlist[this.playListIndex].musicId;
        },
        updateUserId(value){
            this.id = value
        },
        addPlayTable(ids = [], allUpdate)
        {
            // 初始化有问题，报错就替换为
            // allUpdate ?  this.playTable = ids : this.playTable?.concat(ids);
            allUpdate ?  this.playTable = ids : (Object.values(this.playTable))?.concat(ids);
            console.log(this.playTable)
        },
        async addPlayList(userId, playTableId, musicId)
        {
            let result = await addPlayList2Local({
                user_id : userId,
                playtable_id : playTableId,
                music_id : musicId
            })

            if(!result.data.data.status)
            {
                return false;
            }

            if(result.data.data.data.type === 'exist')
            {
                return true;
            }

            
            for(let i in this.playTable)
            {
                if(this.playTable[i].id == playTableId)
                {
                    this.playTable[i].count = +this.playTable[i].count + 1;
                    break;
                }
            }
            
            return true;
            
        },

        async removePlaylistByMusicId(userId, musicId, playtableId)
        {
            let result = await deletePlaylistBymusicId(userId, musicId, playtableId);
            if(!result.data.data.status)
            {
                return false;
            }
        },

        async getPlayListFromLocal(playTableId, userId)
        {
            let returnObj = {  }
            let tracks = [];

            let res = await getPlayListLocal(playTableId);
            let resData = res.data.data;

            let tableInfoRes = await bringPlaytable(playTableId);
            let tableInfo = tableInfoRes.data.data.data;
            returnObj.name = tableInfo.playtable_name;
            returnObj.playTableInfo = tableInfo;

            let userInfoRes = await getUserInfo(userId);
            let userInfo = userInfoRes.data.data.data;
            
            returnObj.nickname = userInfo.username;

            let ids = []
            // 获取每一首歌的内容
            resData.data.forEach((item) =>
            {
                ids.push(item.music_id);
            })

            let remoteSongInfoRes = await getSongDetail(ids.join(','))
            let remoteSongInfo = remoteSongInfoRes.data;
            remoteSongInfo.songs?.forEach((item, index) =>
            {
                tracks.push({
                    ...item,
                    local_id : resData.data[index].id
                });
            })

            returnObj.tracks = tracks;
            returnObj.playCount = 0;
            returnObj.tags = ['本地'];
            returnObj.description = '江湖路漫漫...';
            returnObj.shareCount = 0;
            returnObj.commentCount = 0;


            return returnObj
        },

        // playlist全表变更使用
        async getAllPlayListInfo()
        {
            //console.log(this.playlist)
            this.playlistInfo = {};
            let ids = [];
            this.playlist?.forEach((item) =>
            {
                ids.push(item.musicId)
            })
            
            let remoteSongInfoRes = await getSongDetail(ids.join(','))
            let remoteSongInfo = remoteSongInfoRes.data.songs;
            // //console.log("remote : ", remoteSongInfo)

            remoteSongInfo.forEach((item) =>
            {
                this.playlistInfo[item.id] = {...item, order : this.playlist.find((p) => p.musicId == item.id ).order};
            })

        },

        async addMusicToPlayList(musicId)
        {
            
            for(let i in this.playlist)
            {
                if(this.playlist[i].musicId === musicId)
                {
                    return i;
                }
            }
            let newplaylist = {
                musicId : musicId,
                order : new Date().getTime()
            }

            this.playlist.push(newplaylist);
            // localStorage.setItem("playlist", this.playlist);

            let remoteSongInfoRes = await getSongDetail(musicId);
            let remoteSongInfo = remoteSongInfoRes.data.songs;
            this.playlistInfo[musicId] = {...remoteSongInfo[0], order : newplaylist.order};
            //console.log("change musicList");
            return null;
        }
    },
    persist : {
        enabled :true
    }
})
