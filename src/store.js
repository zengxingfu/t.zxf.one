import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        host: {
            nickname: '',
            avatar: ''
        },
        user: {
            nickname: '',
            avatar: ''
        },
        isLogin: false
    },
    mutations: {
        setHost(state, host) {
            state.host = host
        },
        setUser(state, user) {
            state.user = user
        },
        setIsLogin(state, isLogin) {
            state.isLogin = isLogin
        }
    }
})

export default store;