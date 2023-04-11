
import request from "@/util/request"

export function getAccountsList() {
    return request({
        url: `/admins/accountsList`,
        method: "post"
    })
}


export function submitUpdateAccounts(data) {
    return request({
        url: `/admins/submitUpdate`,
        method: "post",
        data: data
    })
}

export function deleteAcountInfo(uid) {
    return request({
        url: `/admins/deleteAccount/${uid}`,
        method: "get",
    })
}

