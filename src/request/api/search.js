import service from "..";
// 获取关键字搜索
export function Search(id){
    return service({
        method:'GET',
        url:`/cloudsearch?keywords=${id}`
    })
}

export function SearchMV(id)
{
    return service({
        method : "GET",
        url : `cloudsearch?type=1004&keywords=${id}`
    })
}

export function mvDetail(id)
{
    return service({
        method : "GET",
        url : `/mv/detail?mvid=${id}`
    })
}

export function mvURL(id, r)
{
    //console.log("URL : ", `/mv/url?id=${id}&r=${r}`)
    return service(
        {
            method : "GET",
            url : `/mv/url?id=${id}&r=${r}`
        }
    )
}