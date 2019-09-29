import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import api from './utils/api'
import {
  List,
  Tabs
} from 'ant-design-vue'

Vue.config.productionTip = false

Vue.use(List)
Vue.use(Tabs)
Vue.use(api)


export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
