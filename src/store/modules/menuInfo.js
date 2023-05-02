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



export const getAsyncRouter = (routers, lastRouter = false, type = false) => { // 遍历后台传来的路由字符串，转换为组件对象
return routers.filter(router => {
    console.log("getAsycRouter")
    // if (type && router.child) {
    // router.child = filterChildren(router.child)
    // console.log("router.child -------- ",router.child)
    // }
    if (router.component) {
        const component = router.component
        router.component = loadView(component)
        router.meta = {title: router.title}
    }
    if (router.child != null && router.child && router.child.length) {
        router.children = getAsyncRouter(router.child, router, type)
        router.component = Layout
        router.meta = {title: router.title}
    } else {
    delete router['child']
    delete router['redirect']
    }
    return true
})
}

function filterChildren(childrenMap, lastRouter = false) {
var child = []
childrenMap.forEach((el, index) => {
    if (el.child && el.child.length) {
        if (el.component === 'ParentView') {
            el.child.forEach(c => {
            c.path = el.path + '/' + c.path
            if (c.child && c.child.length) {
                child = child.concat(filterChildren(c.child, c))
                return
            }
            child.push(c)
            })
            return
        }
    }
    if (lastRouter) {
    el.path = lastRouter.path + '/' + el.path
    }
    child = child.concat(el)
})
return child
}

export const loadView = (view) => {
    console.log("VIEW ",view)
return ()=>import(`@/view${view}`)
}