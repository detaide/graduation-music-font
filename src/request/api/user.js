import service from '../index'
// 获取用户信息
export function getUserData(id){
    return service({
        method:'GET',
        url:`/user/detail?uid=${id}`
    })
}

// 获取喜欢列表
// export function getLikeList(id){
//     return service({
//         method:'POST',
//         url:`/likelist?uid=${id}`
//     })
// }
// 获取用户歌单
export function getLikeList(id){
    return service({
        method:'POST',
        url:`/user/playlist?uid=${id}`
    })
}
// 删除歌单
export function deleteMusicList(item){
    return service({
        method:'POST',
        url:`/playlist/delete?id=${item.id}`
    })
}