import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout/'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    meta: { title: '首页' },
    component: () => import('../views/Landing/index.vue'),
    hidden: true
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('../views/Login/index.vue'),
    hidden: true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/index.vue'),
    hidden: true
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard'),
        meta: { title: '我的关注', icon: 'mdi-bulletin-board' }
      }
    ]
  },
  {
    path: '/subscribe',
    component: Layout,
    children: [
      {
        path: '',
        name: 'Subscribe',
        component: () => import('@/views/Subscribe/index.vue'),
        meta: { title: '我的订阅', icon: 'mdi-basket' }
      }
    ]
  },
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    name: 'ErrorPages',
    meta: {
      title: '错误页面',
      icon: 'mdi-alert-circle-outline'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/ErrorPage/401'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/ErrorPage/404'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ],
    hidden: true
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'profile',
        name: 'UserProfile',
        component: () => import('@/views/User/index.vue'),
        meta: { title: '我的账号', icon: 'mdi-account-outline' }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})
const createRouter = () =>
  new VueRouter({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: routes
  })
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
