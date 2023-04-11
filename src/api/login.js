
import request from "@/util/request"


export function loginUser(user) {
    return request({
        url: `/hosLogin`,
        method: "post",
        data: user
    })
}
