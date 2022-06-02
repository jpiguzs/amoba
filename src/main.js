import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Router from './router/index';
import './assets/css/main.css'
import 'vue-awesome/icons'
import card from './styled-components/Card.vue'
import input from './styled-components/Input.vue'
import sbtn from './styled-components/Sbtn.vue'
import Icon from 'vue-awesome/components/Icon'
Vue.use(VueRouter)
Vue.config.productionTip = false
Vue.component('p-card',card);
Vue.component('p-input',input);
Vue.component('p-submit',sbtn);
Vue.component('v-icon', Icon);
new Vue({
  router:Router,

  render: h => h(App),
}).$mount('#app')
