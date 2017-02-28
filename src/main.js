import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import App from './App.vue'

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VeeValidate);

// Intro page
const Home = resolve => {
  require.ensure(['./Home.vue'], () => {
    resolve(require('./Home.vue'))
  })
}

// People page .. display persons from GitHub team
const People = resolve => {
  require.ensure(['./People.vue'], () => {
    resolve(require('./People.vue'))
  })
}

// Blog overview
const Blog = resolve => {
  require.ensure(['./Blog.vue'], () => {
    resolve(require('./Blog.vue'))
  })
}

// Detail page (blog post)
const Post = resolve => {
  require.ensure(['./Post.vue'], () => {
    resolve(require('./Post.vue'))
  })
}

const routes = [
    { path: '/home', component: Home , alias: '/' },
    { path: '/people', component: People },
    { path: '/blog', component: Blog },
    { path: '/post/:year/:title', component: Post }
]

const router = new VueRouter({
  mode: 'history',
  routes
});

// TODO: Add and make url-root working!
const app = new Vue({
  el: '#app',
  render: h => h(App),
  router
}).$mount()
