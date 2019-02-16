import {$api} from '@/api'
const state = {
  topics : [],
  topic: null
}
const getters = {
  getTopics(state) {
    return state.topics
  }
}
const mutations = {
  SET_TOPICS(state, payload){
    state.topics = payload
  },
  SET_TOPIC(state, payload) {
    state.topic = payload
  }
}
const actions = {
  index({commit}, payload) {
    return new Promise(function(resolve, reject) {
      $api.topic().index(payload).then(response => {
        commit('SET_TOPICS', response.data.data)
        resolve(response.data.data)
      }).catch(err => {
          reject(err)
      })
    })
  },
  indexForUser({commit}, payload) {
    return new Promise(function(resolve, reject) {
      $api.topic().indexForUser(payload).then(response => {
        console.log(response.data.data)
        commit('SET_TOPICS', response.data.data)
        resolve(response.data.data)
      }).catch(err => {
          reject(err)
      })
    })
  },
  store({commit}, payload) {
    return new Promise(function(resolve, reject) {
      $api.topic().store(payload).then(response => {
        commit('SET_TOPICS', response.data.data)
        resolve(response.data.data)
      }).catch(err => {
          reject(err)
      })
    })

  }

}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
