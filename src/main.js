import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import HocElementTable from '@hoc-element/table'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(HocElementTable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
