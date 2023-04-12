
import request from "@/util/request"


export function loginUser(user) {
    return request({
        url: `/login`,
        method: "post",
        data: user
    })
}

const url = '/sys/user'
export function logout() {
    return request({
        url: url+`/logout`,
        method: "get"
    })
}
