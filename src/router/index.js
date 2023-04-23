import router from "./routes";
import { getToken,setToken } from "@/util/tokenUtils";
import { getUserInfo } from "@/api/user/userInfo";
import NProgress from "nprogress"
import store from "@/store/index"
import settings from "@/settings";

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
    console.log('router before ============> ',to,from,next)
    NProgress.start()
    // 如果携带的前往页面包含认证信息 则直接将其存入Token并进行处理
    if(to.query[settings.SSO_receiveFrontAuthHeader] && to.path && to.path == '/index'){
        setToken(to.query[settings.SSO_receiveFrontAuthHeader])
    }
    if (to.path === "/login") {
        next()
    } else {
        if (getToken()) {
            console.log(" judge = ", store.getters)
            if (!store.getters.userInfo) {
                NProgress.set(0.7)
                loadInfo(next, to)
            } else {
                NProgress.set(1)
                next()
            }
        } else {
            NProgress.set(1)
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
        
    }).finally(()=>{
        NProgress.set(1)
        // next({ path: '/login' })
        next()
    })
}
router.afterEach(() => {
    NProgress.done()
})
export default router;
