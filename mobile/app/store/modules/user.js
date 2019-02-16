import {$api} from '@/api'

const state = {
    user: null,
    token: null
}
const getters = {
    getUser(state) {
        return state.user
    },
    isLoggedIn(state) {
        return !! state.token
    },
    getToken(state) {
        return state.token
    }
}
const mutations = {
    SET_USER(state, payload){
        state.user = payload
    },
    SET_TOKEN(state, token) {
        state.token = token
    },
    UNSET_TOKEN(state) {
        state.token = null
    },
    UNSET_USER(state) {
        state.user = null
    }
}
const actions = {
    register({commit}, payload){
        return new Promise(function(resolve, reject) {
            $api.auth().register(payload).then(response => {
                resolve(response.data)
                // commit('SET_USER', response.data)
            }).catch(err => {
                console.log(err)
                reject(err)
            })
        })
    },
    login({commit}, payload) {
        return new Promise(function(resolve, reject) {
            $api.auth().login(payload).then(response => {
                console.log(response)
                commit('SET_USER',response.data.data)
                commit('SET_TOKEN',response.data.meta.token)
                resolve(response.data.data)
            }).catch(err => {
                reject(err)
            })
        })

    },
    forgotPassword(context, payload) {
        return new Promise(function(resolve, reject) {
            $api.auth().forgotPassword(payload).then(response => {
                resolve(response.data.message)
            }).catch(err => {
                reject(err)
            })
        })

    },
    logout({commit}, payload) {
        return new Promise(function(resolve, reject) {
            $api.auth().logout().then(response => {
                commit('UNSET_TOKEN')
                commit('UNSET_USER')
                resolve(response.data.message)
            }).catch(err => {
                reject(err)
            })
        })
    },
    getUserThroughUsername({commit}, username) {
        return new Promise(function(resolve, reject) {
            $api.auth().getUserThroughUsername(username).then(response => {
                resolve(response.data.data)
            }).catch(err => {
                reject(err)
            })
        })
    }
    // fetchIfAuthenticated({commit}) {
    //     return new Promise(function(resolve, reject) {
    //         $api.auth().me().then(response => {
    //             commit('SET_USER', response.data.data)
    //             commit('')
    //             resolve(response.data.data)
    //         }).catch(err => reject(err))
    //     })
    // }
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
