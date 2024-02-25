import { createRouter, createWebHistory } from 'vue-router'
import { usemusicStore } from '@/store/music.js'
const routes = [
    {//登录页
        path: '/login',
        name: 'login',

        component: () => import('@/views/Login/index.vue')
    },
    {//首页
        path: '/',
        name: 'Home',
        redirect: "home",
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import(/* webpackChunkName: "itemmusic"*/'@/components/Home/home.vue'),
            },
            
            // {
            //     path: '/search',
            //     name: 'Search',
            //     component: () => import('@/components/Search/search.vue'),
            //     // redirect:'/searchhistory',
            //     children: [
            //         {
            //             path: 'searchresult',
            //             name: 'SearchResult',
            //             component: () => import('@/components/Search/searchResult.vue'),
            //         }
            //     ]
            // },
        ]
    },
    {//播客
        path: '/podcasts',
        name: 'Podcasts',
        component: () => import('@/views/Podcasts.vue'),
    },
    {//漫游
        path: '/mv',
        name: 'mv',
        component: () => import('@/views/mv.vue'),
    },
    {//mv播放
        path: '/MVPlay',
        name: 'MVPlay',
        component: () => import('@/views/MVPlay.vue'),
    },
    {//动态
        path: '/developments',
        name: 'Developments',
        component: () => import('@/views/developments.vue'),
    },
    {//我的
        path: '/mine',
        name: 'Mine',
        meta: {
            requiresAuth: true  //需要身份验证
        },
        beforeEnter: (to, from, next) => {
            const musicStore = usemusicStore()
            // 当前仅仅使用userId作为是否登录凭证
            //console.log(musicStore.isLogin, localStorage.getItem('userId'))
            if (musicStore.isLogin || musicStore.token || localStorage.getItem('Token') || localStorage.getItem('userId')) {
                next()
            } else {
                next('/login')
            }
        },
        component: () => import('@/views/mine.vue'),
    },
    {//搜索页面
        path: '/search',
        name: 'Search',
        component: () => import('@/components/Search/search.vue'),
        // redirect:'/searchhistory',
        children: [
            {
                path: 'searchresult',
                name: 'SearchResult',
                component: () => import('@/components/Search/searchResult.vue'),
            }
        ]
    },
    {
        path: '/itemmusic',
        name: 'itemMusic',
        component: () => import('@/components/Playlist/itemMusic.vue')
    },
    {
        path: '/itemmusicLocal',
        name: 'itemmusicLocal',
        component: () => import('@/components/Playlist/itemmusicLocal.vue')
    },
    {//歌手信息界面
        path: '/singer',
        name: 'Singer',
        component: () => import('@/components/Playlist/singer.vue')
    },
    {//每日推荐
        path: '/dailyRecommand',
        name: 'dailyRecommand',
        component: () => import('@/components/Playlist/dailyRecommand.vue')
    },
    {//每日推荐
        path: '/dailyRank',
        name: 'dailyRank',
        component: () => import('@/components/Playlist/dailyRank.vue')
    },

    

]
const router = createRouter({
    history: createWebHistory(),
    routes
})
// 全局前置守卫
router.beforeEach((to,from)=>{
    //console.log(to);
    const musicStore = usemusicStore()
    if(to.path=='/login' ){
        musicStore.isFooterMusic=false
        musicStore.isMusicMenu=false
    }
    else if(to.path=='/itemmusic' || to.path=='/search'){
        musicStore.isFooterMusic=true
        musicStore.isMusicMenu=false
    }else{
        musicStore.isFooterMusic=true
        musicStore.isMusicMenu=true
    }
})
export default router