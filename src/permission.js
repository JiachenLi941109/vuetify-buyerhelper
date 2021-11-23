import router from './router'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/login', '/', '/register'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/dashboard' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/')
    }
  }
})

router.afterEach(() => {})
