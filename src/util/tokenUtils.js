// import Cookies from "js-cookie"
import settings from "../settings"

let tokenKey = settings.tokenKey

export function setToken(token) {
    const temp = {
        value: token,
        expire: new Date().getTime() + settings.TokenTime.expire // 1小时后过期
    }
    localStorage.setItem(tokenKey, JSON.stringify(temp))
}

export function getToken() {
    const storedItem = localStorage.getItem(tokenKey);
    if (storedItem) {
        const item = JSON.parse(storedItem);
        if (new Date().getTime() > item.expire) {
            // 数据已过期，需要清除
            removeToken()
        } else {
            // 数据未过期，可以使用
            return item.value
        }
    }
}

export function removeToken() {
    return localStorage.removeItem(tokenKey)
}