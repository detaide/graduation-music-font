import { localService } from "..";

export async function login2Local(loginInfo)
{
    //console.log("loginInfo : ", loginInfo)
    return await localService({
        method : "POST",
        url: "/api/login",
        data: {
            ...loginInfo
        }
    })
}

export async function register2Local(registerInfo)
{
    return await localService({
        method : "POST",
        url : "/api/register",
        data : {
            ...registerInfo
        }
    })
}

export async function change2Local(changeLoginInfo)
{
    return await localService({
        method : "POST",
        url : "/api/changePwd",
        data : {
            ...changeLoginInfo
        }
    })
}