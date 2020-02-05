import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import isMobileMixin from './mixins/isMobile'

Vue.config.productionTip = false

Vue.use(isMobileMixin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
