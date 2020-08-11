import Vue from 'vue'
import App from './App.vue'
import onezu from '../packages'
Vue.use(onezu)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
