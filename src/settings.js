module.exports = {
    //localStorage存放的内容过期时间
    localTime: {
        expire: Date.now() + 60 * 24 * 7
    },
    //Cookie过期的信息
    CookieTime: {
        expire: Date.now() + 60 * 24 * 7
    },
    //存放tag标签的信息
    tagTest: {
        key: "tag"
    },
    //存放后端传来的TOKEN
    tokenKey: "MY-TOKEN",
    title: "美食网站后端"
}