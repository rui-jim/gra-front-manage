import Layout from "@/components/layout/index"

const state = {
    menu: [],
}

const mutations = {
    CLEAR_MENU: (state) => {
        state.menu = []
    },
    SET_MENU: (state, menu) => {
        console.log(" store menu ", menu)
        state.menu = menu
    }
}

const actions = {
    init_tag({ commit }, menu) {
        commit("INIT_MENU", menu)
    },
    drop_tag({ commit }) {
        commit("DROP_MENU")
    }
}

const store = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default store


// 配置动态路由信息
export const getAsyncRouter = (routers) => { // 遍历后台传来的路由字符串，转换为组件对象
    return routers.filter(router => {
        if (router.component) {
            const component = router.component
            router.component = loadView(component)
            router.meta = {title: router.title}
        }
        if (router.child != null && router.child && router.child.length) {
            router.children = getAsyncRouter(router.child)
            router.component = Layout
            router.meta = {title: router.title}
        } else {
            delete router['child']
            delete router['redirect']
        }
        return true
    })
}
export const loadView = (view) => {
    return ()=>import(`@/view${view}`)
}