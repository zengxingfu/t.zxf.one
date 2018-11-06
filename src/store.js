import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        host: {
            nickname: '',
            avatar: '',
            email: ''
        },
        user: {
            nickname: '',
            avatar: '',
            email: ''
        },
        isLogin: false,
        page: 1
    },
    mutations: {
        setHost(state, host) {
            state.host = host
        },
        setUser(state, user) {
            // state.user = user
            user.nickname ? state.user.nickname = user.nickname : state.user.nickname = 'Anonymous'
            if (user.email) state.user.email = user.email
            if (user.avatar) state.user.avatar = user.avatar
        },
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin
        },
        setPage(state, pageNumber) {
            state.page = pageNumber
        },
        resetPage(state) {
            state.page = 1
        }
    }
})

export default store;