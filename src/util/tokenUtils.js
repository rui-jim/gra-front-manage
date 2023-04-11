import Cookies from "js-cookie"
import settings from "../settings"

let tokenKey = settings.tokenKey
export function setToken(token) {
    Cookies.set(tokenKey, token, { expires: settings.CookieTime.expire })
}

export function getToken() {
    return Cookies.get(tokenKey)
}

export function removeToken() {
    return Cookies.remove(tokenKey)
}