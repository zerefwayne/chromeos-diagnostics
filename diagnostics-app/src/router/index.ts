import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Data from '../views/Data.vue'
import DiagnosticsManager from '../views/DiagnosticsManager.vue'
import State from '../views/State.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'home',
    redirect: '/data'
  },
  {
    path: '/data',
    name: 'data',
    component: Data
  },
  {
    path: '/state',
    name: 'state',
    component: State
  },
  {
    path: '/diagnostics',
    name: 'diagnostics',
    component: DiagnosticsManager
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes
})

export default router
