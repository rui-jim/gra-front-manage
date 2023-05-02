import router from "./routes";
import { getToken,setToken } from "@/util/tokenUtils";
import { getUserInfo } from "@/api/user/userInfo";
import { getUserComponenttList } from "@/api/func/component";
import NProgress from "nprogress"
import store from "@/store/index"
import { getAsyncRouter } from '@/store/modules/menuInfo'
import settings from "@/settings";

NProgress.configure({ showSpinner: false })// NProgress Configuration

router.beforeEach((to, from, next) => {
    // console.log('router before ============> ',to,from,next)
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
            if(store.state.menuInfo.menu.length == 0){
                getUserComponenttList().then(resp => {
                    console.log("getUserComponentList resp ",resp)
                    store.commit("menuInfo/SET_MENU",resp.data.data)
                    let route = getAsyncRouter(resp.data.data,false,true)
                    console.log("route-----------==========>",route)
                    // router.addRoutes(route)
                })
            }
            console.log("store init_userInfo ",store.state)
        } else {
            next({ path: '/login' })
        }

    }).catch(e => {
        console.log("EEEEEEEEEEEE ", e)
    }).finally(()=>{
        NProgress.set(1)
        next()
    })
}
router.afterEach(() => {
    NProgress.done()
})
export default router;
