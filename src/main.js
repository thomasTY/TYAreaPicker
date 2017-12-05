import Vue from 'vue'
import App from './App'
import router from './router'
import { Popup } from 'mint-ui'

Vue.config.productionTip = false

Vue.component(Popup.name, Popup)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
