import request from "@/util/request"

const url = '/recipe'

export function getRecipeList(params){
    return request({
        url: url+'/list',
        method: "get",
        params
    })
}
