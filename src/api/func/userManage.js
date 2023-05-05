import request from "@/util/request"

const url = '/sys/user'

export function getUserList(params){
    return request({
        url: url+'/list',
        method: "get",
        params
    })
}

// 获取用户权限
export function getUserRole(params){
    return request({
        url: url+'/grant',
        method: "get",
        params
    })
}

export function getUserRoleList(params){
    return request({
        url: url+"/role",
        method: "get",
        params
    })
}

export function putUpdateUserRole(data){
    return request({
        url: url+'/grant',
        method: "put",
        data
    })
}

export function putDisableUser(data){
    return request({
        url: url+'/disable',
        method: "put",
        data
    })
}
