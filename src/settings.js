module.exports = {
    //localStorage存放的内容过期时间
    localTime: {
        expire: Date.now() + 60 * 24 * 7
    },
    //Cookie过期的信息
    TokenTime: {
        expire: Date.now() + 7
    },
    //存放tag标签的信息
    tagTest: {
        key: "tag"
    },
    defaultPage: {
        page: 1,
        size: 10
    },
    defaultHeader: { // 封装默认头部的信息
        "client": "back"
    },
    defaultLimitFileDesc: '10M', // 默认限制上传文件大小说明
    defaultLimitFileSize: 10*1024*1024, // 默认限制上传文件大小
    defaultUploadPath: "http://localhost:5050/file/storage/upload",
    // 接收前台传来的参数头
    SSO_receiveFrontAuthHeader: "Authorization",
    //存放后端传来的TOKEN
    tokenKey: "MY-TOKEN",
    title: "美食网站后端",
    PREVIEW_URL: "http://120.79.80.229:9000/graduation/"
}