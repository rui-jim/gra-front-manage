
import request from "@/util/request"

export function getRolesPList(){
    return request({
        url:`/roles/getRolesPList`,
        method:"get"
    })
}

export function addRole(role){
    return request({
        url: `/roles/roleName`,
        method:"post",
        data:role
    })
}
export function deleteRole(role){
    return request({
        url: `/roles/deleteRole`,
        method:"post",
        data:role
    })
}

