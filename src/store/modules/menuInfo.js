
const state = {
    menu: [],
}

const mutations = {
    DROP_MENU: (state) => {
        state.menu = []
    },
    INIT_MENU: (state, menu) => {
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