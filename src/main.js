import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VConsole from 'vconsole'

Vue.config.productionTip = false

const vConsole = new VConsole()
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
export default vConsole
