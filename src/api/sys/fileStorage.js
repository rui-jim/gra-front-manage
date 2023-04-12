import request from "@/util/request"

const url = "/file/storage"

export function upload(){
    return request({
        url:url+`/upload`,
        method:"post"
    })
}