import router from './router'
import { getToken } from '@/utils/auth' // 验权
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login', '/', '/register', '/resetPw'] // 不重定向白名单
router.beforeEach((to, from, next) => {
  document.title = getPageTitle(to.meta.title)

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
