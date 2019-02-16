import Vue from 'nativescript-vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import sideDrawer from './modules/sideDrawer'
import section from './modules/section.js'
import topic from './modules/topic.js'
import user from './modules/user.js'
let debug = process.env.NODE_ENV !== 'production'
let store = new Vuex.Store({
  namespaced: true,
  modules: {
    sideDrawer,
    section,
    user,
    topic
  },
  strict: debug
})

Vue.prototype.$store = store

export default store
