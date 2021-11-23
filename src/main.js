import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import store from './store'
import '@/permission'
import './plugins/element'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false
new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App)
}).$mount('#app')
