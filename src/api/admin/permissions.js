
import request from "@/util/request"

export function getPermissionsList(){
    return request({
        url:`/permissions/list`,
        method:"get"
    })
}

export function updatePerOfRole(data){
    console.log("update PerOfRole ",data)
    return request({
        url:`/permissions/updatePerOfRole`,
        method:"post",
        data:data
    })
}
