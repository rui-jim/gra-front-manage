import settings from "@/settings"

const key = settings.tagTest.key

const state = {
    tags: []
}

const mutations = {
    ADD_TAG: (state, test) => {
        let judge = state.tags.some((v) => { return v.fullPath == test.fullPath })
        if (!state.tags.some((v) => { return v.fullPath == test.fullPath })) {
            let arr = state.tags.push(test)
            let tempTags = JSON.stringify(state.tags)
            localStorage.setItem(key, tempTags, settings.localTime.expire)
        }
    },
    DROP_TAG: (state, fullPath) => {
        let arr = state.tags;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i].fullPath === fullPath) {
                arr.splice(i, 1)
                localStorage.setItem(key, JSON.stringify(arr), settings.localTime.expire)
            }
        }
    },
    INIT_TAG: (state) => {
        let tempData = JSON.parse(localStorage.getItem(key))
        state.tags = tempData
    },
    CLEAR_TAG: (state) => {
        state.tags = []
    }
}

const actions = {
    init_tag({ commit }) {
        commit("INIT_TAG", key)
    },
    drop_tag({ commit }, fullPath) {
        commit("DROP_TAG", fullPath)
    },
    add_tag({ commit }, tag) {
        commit("ADD_TAG", tag)
    },
    clear_tag({ commit }) {
        commit("CLEAR_TAG")
    },
}

const store = {
    namespaced: true,
    state,
    mutations,
    actions
}
export default store