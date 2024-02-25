import service from "..";
// 获取轮播图
export function getBanner(){
    return service({
        method:'GET',
        url:'/banner?type=2',
    })
}
// 推荐歌单
export function getRecomPlayLists(){
    // return service({
    //     method:'GET',
    //     url:'/personalized?limit=10',
    // })
    return service({
        method : "GET",
        url : "/personalized"
    })
}
    