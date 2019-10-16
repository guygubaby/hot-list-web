import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './utils/api'
import antd from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(antd)
Vue.use(api)


export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
