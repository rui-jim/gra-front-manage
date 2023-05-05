import request from "@/util/request"

const url = '/recipe/category'

export function listReceiptCategory(search){
    return request({
        url: url+'/tree',
        method: "get",
        params: {...search}
    })
}


export function delReceiptCategory(id){
    return request({
        url: url,
        method: "delete",
        params: {
            id
        }
    })
}

// 保存菜谱分类
export function saveReceiptCategory(data){
    return request({
        url: url,
        method: "post",
        data: data
    })
}


// 修改菜谱分类
export function updateReceiptCategory(data){
    return request({
        url: url,
        method: "put",
        data
    })
}