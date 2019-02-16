import Vue from 'nativescript-vue'
import {TNSFontIcon, fonticon} from 'nativescript-fonticon'
import RadListView from "nativescript-ui-listview/vue";
Vue.use(RadListView);

Vue.registerElement('RadSideDrawer', () => require('nativescript-ui-sidedrawer').RadSideDrawer);
Vue.registerElement('PullToRefresh',() => require('nativescript-pulltorefresh').PullToRefresh);

import store from './store'
import {$api} from './api'
Vue.prototype.$_ = require('lodash');


import sideDrawer from '~/components/sideDrawer'
import drawerContent from '~/components/drawerContent'
import VueDevtools from 'nativescript-vue-devtools'

import routes from './router'
Vue.prototype.$api = $api
import {toast} from './services/toast.js'
if(TNS_ENV !== 'production') {
  Vue.use(VueDevtools)
}
// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.prototype.$toast = toast
Vue.prototype.$routes = routes

//TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './assets/font-awesome.css'
};
import networkChecker from '~/mixins/networkChecker'

TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon)
new Vue({
  mixins: [networkChecker],
  store,
  render (h) {
    return h(
      sideDrawer,
      [
        h(drawerContent, { slot: 'drawerContent' }),
        h(routes.Home, { slot: 'mainContent' })
      ]
    )
  }
}).$start()
