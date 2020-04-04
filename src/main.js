import Vue from 'vue'
import App from './App.vue'
import HocElementAffix from '@hoc-element/affix'


Vue.config.productionTip = false

Vue.use(HocElementAffix)

new Vue({
  render: h => h(App),
}).$mount('#app')
