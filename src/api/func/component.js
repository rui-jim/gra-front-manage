import request from "@/util/request"

const url = '/sys/component'

export function getComponentList(search){
    return request({
        url: url,
        method: "get",
        params: {...search}
    })
}

// 添加菜单
export function postSaveComponent(data){
    return request({
        url: url,
        method: "post",
        data
    })
}

// 修改菜单
export function putUpdateComponent(data){
    return request({
        url: url,
        method: "put",
        data
    })
}

// 删除菜单
export function delComponent(params){
    return request({
        url: url,
        method: "delete",
        params
    })
}

export function getUserComponenttList(){
    return request({
        url: url+'/user',
        method: "get"
    })
}