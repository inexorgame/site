import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(VueResource);

// Fetch via lazy-loading
const Home = resolve => {
  require.ensure(['./Home.vue'], () => {
    resolve(require('./Home.vue'))
  })
}

const People = resolve => {
  require.ensure(['./People.vue'], () => {
    resolve(require('./People.vue'))
  })
}

const routes = [
    { path: '/home', component: Home },
    { path: '/people', component: People }
]

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
}).$mount()
