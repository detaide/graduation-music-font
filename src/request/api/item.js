import server from '..'
// 获取歌单详情页的数据
export function getPlaylistDetail(id){
    return server({
        method:'GET',
        url:`/playlist/detail?id=${id}`
    })
}
// 获取歌单的所有歌曲
export function getPlaylistAll(id){
    return server({
        method:'GET',
        url:`/playlist/track/all?id=${id}&limit=20&offset=0`
    })
}
// 获取歌词
export function getLyric(id){
    return server({
        method:'GET',
        url:`/lyric?id=${id}`
    })
}
// 获取歌手详情
export function getSingerDetail(id){
    return server({
        method:'GET',
        url:`/artist/detail?id=${id}`
    })
}       

export function getSongDetail(ids)
{
    return server({
        method : "GET",
        url : "/song/detail?ids=" + ids
    })
}

export function getDailyRecommand()
{
    return server({
        method : "GET",
        url : "/recommend/songs"
    })
}

export function getRankDetail()
{
    return server({
        method : "GET",
        url : "/toplist/detail"
    })
}