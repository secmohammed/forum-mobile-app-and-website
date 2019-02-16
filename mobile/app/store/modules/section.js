import {$api} from '@/api'
const state = {
  section: null,
  sections: []
}

const mutations = {
  SET_SECTION(state, payload) {
    state.section = payload
  },
  SET_SECTIONS(state, payload) {
    state.sections = payload
  }
}

const getters = {
  getSections(state) {
    return state.sections
  },
  getSection(state) {
    return state.section
  }
}
const actions = {
  showSection({commit}, id){
    return new Promise(function(resolve, reject){
        $api.section().show(id).then(response => {
            commit('SET_SECTION',response.data.data)
            resolve(response.data.data)
        }).catch(err => reject(err))
    })
  },
  indexSection({commit}) {
    return new Promise(function(resolve, reject){
      $api.section().index().then(response => {
        commit('SET_SECTIONS',response.data.data)
        resolve(response.data.data)
      }).catch(err => reject(err))
    })

  }
}
// export this module.
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
