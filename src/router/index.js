import router from "./routes";
import { getToken } from "@/util/tokenUtils";
import { getUserInfo } from "@/api/user/userInfo";
import Cookies from "js-cookie";
import NProgress from "nprogress"
import store from "@/store/index"
NProgress.configure({ showSpinner: false })// NProgress Configuration

console.log("store===========>", store)
router.beforeEach((to, from, next) => {
    NProgress.start()
    if (to.path === "/login") {
        next()
    } else {
        if (getToken()) {
            console.log(" judge = ", store.getters)
            if (!store.getters.userInfo) {
                NProgress.set(0.7)
                loadInfo(next, to)
            } else {
                next()
            }
        } else {
            next({ path: '/login' })
        }
    }
})
function loadInfo(next, to) {
    getUserInfo().then(response => {
        console.log('response loadINfo routes ',response)
        if (response.code == 200) {
            store.dispatch('userInfo/init_userinfo', response.data.data).then(() => {
                next({ ...to })
            })
            console.log("store init_userInfo ",store.state)
        } else {
            // let obj = { name: '匿名者 记得完善自己的信息哦！' }
            // store.dispatch('userInfo/init_userinfo', obj).then(() => {
            //     console.log("begin next")
            //     next({ ...to, replace: true })
            // })
            next({ path: '/login' })
        }

    }).catch(e => {
        console.log("EEEEEEEEEEEE ", e)
        // store.dispatch().then(() => {

        // })
        next({ path: '/login' })
    })
}
router.afterEach(() => {
    NProgress.done()
})
export default router;
