
import request from "@/util/request"


export function getUserInfo() {
    return request({
        url: `/user/getInfo`,
        method: "get"
    })
}

export function getMenuInfo() {
    return request({
        url: `/user/getMenu`,
        method: "get"
    })
}
