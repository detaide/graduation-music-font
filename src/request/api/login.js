import service from '@/request/index.js'
// 手机登录
export function loginCellPhone(data){
    return service({
        method:'POST',
        url:`/login/cellphone?phone=${data.user}&password=${data.password}`
    })
}