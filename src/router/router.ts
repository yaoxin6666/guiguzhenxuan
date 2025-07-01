// 对外暴露路由(常量路由)
export const constantRouter = [
    {
      //登录
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login', //命名路由
    },
    {
      //首页
      path: '/',
      component: () => import('@/layout/index.vue'),
      name: 'layout',
    },
    {
      //404
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      name: '404',
    },
    {
      //任意页面
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any',
    },
  ]