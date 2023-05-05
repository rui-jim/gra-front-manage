import request from "@/util/request"

const url = '/recipe'

export function getRecipeList(params){
    return request({
        url: url+'/list',
        method: "get",
        params
    })
}

// 下架菜谱
export function putTakedownRecipe(data){
    return request({
        url: url+'/force/take',
        method: "put",
        data: data
    })
}