// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

import './common/stylus/indexx.styl'
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueResource)
const routes = [
  { path: '/', component: seller},
  {path: '/goods', component: goods},
  {path: '/ratings', component: ratings},
  {path: '/seller', component: seller}
]
// let app=Vue.extend(App)
// let router =new VueRouter()

const router=new VueRouter({
  routes
})

// router.start(app,'$#app')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  router:router,
  template: '<App/>'
})
