// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
<<<<<<< HEAD
=======
import Vuefire from 'vuefire'
import firebase from './services/firebase'
import VueResource from 'vue-resource'
>>>>>>> Initial Commit
import 'bootstrap/dist/css/bootstrap.css'
import jQuery from 'jquery'
global.jQuery = jQuery
require('bootstrap')
var VueScrollTo = require('vue-scrollto')

Vue.use(VueScrollTo)
<<<<<<< HEAD
=======
Vue.use(VueResource)
Vue.use(Vuefire)
>>>>>>> Initial Commit
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
<<<<<<< HEAD
=======
  firebase: {
    cat: firebase.database.ref('cat').orderByChild('created_at')
  },
>>>>>>> Initial Commit
  router,
  template: '<App/>',
  components: { App }
})
