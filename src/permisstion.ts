import router from './router'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import setting from './setting'
import useUSerStore from './store/modules/user'
import pinia from './store'
const userStore = useUSerStore(pinia)
//关闭进度条小圆圈
nprogress.configure({ showSpinner: false })
router.beforeEach(async(to: any, from: any, next: any) => {
  //标签页标题
  document.title = `${setting.title} - ${to.meta.title}`
  //获取token判断是否登录
  const token = userStore.token
  //获取用户名
  const username = userStore.username
  //进度条开始
  nprogress.start()
  //路由放行
  if (token) {
    // 已登录访问登陆界面，直接拦截，其他页面直接放行
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
       //有用户信息，直接放行
    if (username) {
      next()
    } else {
      // 没有用户信息，发请求获取用户信息，在放行
      try {
       await userStore.userInfo()
        next({...to})
      } catch (error) {
        //token过期
        //用户主动修改token
       await userStore.logout()
        next({ path: '/login', query: { redirect: to.path } })
      }
    }
    }
  } else {
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
   
  }
})
router.afterEach((to: any, from: any) => {
  //进度条结束
  nprogress.done()
})
