import { removeToken } from "@/util/tokenUtils";

const state = {
    userInfo: null
}

const mutations = {
    DROP_USERINFO: (state) => {
        state.userInfo = null
    },
    INIT_USERINFO: (state, userInfo) => {
        state.userInfo = userInfo
    }
}

const actions = {
    init_userinfo({ commit }, userInfo) {
        commit("INIT_USERINFO", userInfo)
        console.log("begin commit userinfo")
    },
    drop_userinfo({ commit }) {
        commit("DROP_USERINFO")
    },
    logOut({ commit }) {
        return new Promise((resolve, reject) => {
            commit("DROP_USERINFO")
            // 清空本地缓存的token
            removeToken()
        })
    }
}

const store = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default store