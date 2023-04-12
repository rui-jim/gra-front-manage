import axios from "axios"
import store from "../store"
import { getToken,removeToken } from "@/util/tokenUtils"
import { Notification } from 'element-ui'
import router from '@/router/index'

console.log("PROcess2 ",process.env,process.env.VUE_APP_BASE_API)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 40000000
})

service.interceptors.request.use(config => {
  let token = getToken()
  config.headers["token"] = token
  return config
}, error => {
  console.log(error) // for debug
  Promise.reject(error)
})


// 返回结果拦截器
service.interceptors.response.use(
  response => {
    console.log("interceptore reponse ", response)
    let resp = response.data
    if(resp.code == 200){
      return response.data
    }else if(resp.code == 401){
      store.dispatch("userInfo/logOut").then( res => {
        Notification.error({
          title: "请重新进行登录",
          duration: 2000
        })
        router.push({ path: '/login' })
      })
      // 其他异常一律重新登录
    }
    return response.data
  }, e => {
    console.log("interceptore eeeeee reponse ", e)
    return e
  })
// service.interceptors.response.use(response => {
//   console.log("interceptore reponse ", response)
//   return response
// })
export default service