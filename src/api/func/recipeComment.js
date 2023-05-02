import request from "@/util/request"

const url = '/recipe/comment'

export function getRecipeCommentList(search){
    return request({
        url: url+'/list',
        method: "get",
        params: {...search}
    })
}
