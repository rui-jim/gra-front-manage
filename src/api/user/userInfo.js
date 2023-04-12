
import request from "@/util/request"


export function getUserInfo() {
    return request({
        url: `/sys/user/info`,
        method: "get"
    })
}

export function getMenuInfo() {
    return request({
        url: `/sys/user/menu`,
        method: "get"
    })
}
