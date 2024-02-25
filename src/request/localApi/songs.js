import { localService } from "..";

export async function deleteLocalPlayList(id, userId, playtable_id)
{
    return await localService({
        method : "POST",
        url :"/api/delete_playlist",
        data : {
            user_id : userId,
            playlist_id : id,
            playtable_id
        }
    })
}