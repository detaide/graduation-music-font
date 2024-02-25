import { localService } from "..";

export  async function localContent(type , music_id)
{
    return await localService({
        method : "POST",
        url : "/api/get_content",
        data : {
            type,
            music_id
        }
    })
}

export async function localAddContent(music_id, type, content, user_id)
{
    return await localService({
        method : "POST",
        url : "/api/add_content",
        data : {
            music_id,
            type,
            content,
            user_id
        }
    })
}

export async function localAddThubms(id)
{
    return await localService({
        method : "POST",
        url : "/api/add_thumbs",
        data : {
            id
        }
    })
}

export async function localDeleteContent(id, user_id)
{
    return await localService({
        method : "POST",
        url : "/api/delete_content",
        data : {
            id,
            user_id
        }
    })
}