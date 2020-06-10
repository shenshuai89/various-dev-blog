import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    redirect:"/list"
  },
  {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "list" */ '@/views/List.vue')
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import(/* webpackChunkName: "detail" */ '@/views/Detail.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "admin" */ '@/views/Admin.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import(/* webpackChunkName: "update" */ '@/views/Update.vue')
  },
  {
    path: '/new',
    name: 'new',
    component: () => import(/* webpackChunkName: "new" */ '@/views/New.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
