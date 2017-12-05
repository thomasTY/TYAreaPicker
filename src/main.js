import Vue from 'vue'
import App from './App'
import router from './router'
import { Popup, Picker } from 'mint-ui'

Vue.config.productionTip = false

Vue.component(Popup.name, Popup)
Vue.component(Picker.name, Picker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
