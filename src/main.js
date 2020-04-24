import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlayCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import 'normalize.css'

library.add(faPlayCircle, faSearch, faTimes, faGithub)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
