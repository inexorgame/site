import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'

Vue.use(VueRouter);

// Fetch via lazy-loading
// TODO: Add a generic function to do that for all views
const Home = resolve => {
  require.ensure(['./Home.vue'], () => {
    resolve(require('./Home.vue'))
  })
}

const routes = [
    { path: '/home', component: Home }
]

const router = new VueRouter({
  routes
});

const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
}).$mount('#app')
