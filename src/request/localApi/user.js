import { localService } from "..";

export async function bringPlayList(userId)
{
    return await localService({
        method : "GET",
        url : "/api/playTable" + `?id=${userId}`,
    })
}

export async function bringPlaytable(playTable_id)
{
    return await localService({
        method : "GET",
        url : "/api/playTableInfo?playTable_id=" + playTable_id
    })
}

export async function addPlayTable2Local(user_id, playtable_name)
{
    return await localService({
        method : "POST",
        url : "/api/add_playtable",
        data : {
            user_id,
            playtable_name
        }
    })
}


export async function addPlayList2Local(addPlaylistInfo)
{
    return await localService({
        method : "POST",
        url : "/api/add_playlist",
        data : {
            ...addPlaylistInfo
        }
    })
}

export async function getPlayListLocal(playtable_id)
{
    return await localService({
        method : "GET",
        url : '/api/playlist?playTable_id=' + playtable_id
    })
}
export async function getUserInfo(userId)
{
    return await localService({
        method : "GET",
        "url" : "/api/userInfo?id=" + userId
    })
}

export async function deleteplayTable(user_id, playtable_id)
{
    return await localService({
        method : "POST",
        url : "/api/delete_playtable",
        data :{
            user_id,
            playtable_id
        }
    })
}

export async function deletePlaylist(userId, playlistId, playtableId)
{
    return await localService({
        method : "POST",
        url : "/api/delete_playlist",
        data : {
            user_id : userId,
            playlist_id : playlistId,
            playtable_id : playtableId
        }
    })
}

export async function deletePlaylistBymusicId(userId, musicId, playtableId)
{
    return await localService({
        method : "POST",
        url : "/api/delete_playlist",
        data : {
            user_id : userId,
            music_id : musicId,
            playtable_id : playtableId
        }
    })
}