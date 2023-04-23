import request from "@/util/request"

const url = "/file/storage"

export function upload(){
    return request({
        url:url+`/upload`,
        method:"post"
    })
}

// 获取文件数据
export function getData(data,page){
    return request({
        url:url+`/upload`,
        method:"get",
        params: {
            ...data,
            ...page
        }
    })   
}


// 获取文件数据
export function removeData(data,page){
    return request({
        url:url+`/remove`,
        method:"post",
        data: data
    })   
}