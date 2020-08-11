import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import fuse from 'fuse.js';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  fuse,
  render: h => h(App)
}).$mount('#app')
