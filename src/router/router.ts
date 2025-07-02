// 对外暴露路由(常量路由)
export const constantRouter = [
    {
      //登录
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      name: 'login', //命名路由
      meta:{
        title:"登录",
        hidden:true
      }
    },
    {
      //首页
      path: '/',
      component: () => import('@/layout/index.vue'),
      name: 'layout',
      meta:{
        title:'layout',
        hidden:false
      },
      children:[
        {
          path:'/home',
          component:() =>import('@/views/home/index.vue'),
          meta:{
        title:'首页',
        hidden:false
      },
        },
        {
          path:'/ceshi',
          component:() =>import('@/views/home/index.vue'),
          meta:{
        title:'测试',
        hidden:false
      },
        },
      ]
    },
    {
      //404
      path: '/404',
      component: () => import('@/views/404/index.vue'),
      name: '404',
      meta:{
        title:'404',
        hidden:true
      },
    },
    {
      //任意页面
      path: '/:pathMatch(.*)*',
      redirect: '/404',
      name: 'any',
      meta:{
        title:'任意路由',
        hidden:true
      },
    },
    
  ]