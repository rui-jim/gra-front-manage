import request from "@/util/request"

const url = '/sys/user/role'

export function getRoleList(params){
    return request({
        url: url,
        method: "get",
        params
    })
}


export function getRoleComponentList(params){
    return request({
        url: url+"/component",
        method: "get",
        params
    })
}

export function postSaveRole(data){
    return request({
        url: url,
        method: "post",
        data
    })
}
export function putUpdatetRole(data){
    return request({
        url: url,
        method: "put",
        data
    })
}
export function delRole(params){
    return request({
        url: url,
        method: "delete",
        params
    })
}
