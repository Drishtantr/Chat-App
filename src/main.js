import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { firestorePlugin } from 'vuefire';
// import * as firebase from 'firebase/app';


Vue.config.productionTip = false

Vue.use(IconsPlugin)
Vue.use(BootstrapVue)
Vue.use(firestorePlugin);


new Vue({
  render: h => h(App),
}).$mount('#app')
