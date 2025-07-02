import components from '@/components'
import { iconProps } from 'element-plus'

// 对外暴露路由(常量路由)
export const constantRouter = [
  {
    //登录
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    name: 'login', //命名路由
    meta: {
      title: '登录',
      hidden: true,
      icon: 'Position',
    },
  },
  {
    //首页
    path: '/',
    component: () => import('@/layout/index.vue'),
    name: 'layout',
    redirect: '/home',
    meta: {
      title: '',
      hidden: false,
      icon: '',
    },
    children: [
      {
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name:'home',
        meta: {
          title: '首页',
          hidden: false,
          icon: 'HomeFilled',
        },
      },
    ],
  },
  {
    //404
    path: '/404',
    component: () => import('@/views/404/index.vue'),
    name: '404',
    meta: {
      title: '404',
      hidden: true,
      icon: 'DeleteFilled',
    },
  },
  {
    //任意页面
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    name: 'any',
    meta: {
      title: '任意路由',
      hidden: true,
      icon: 'UploadFilled',
    },
  },
  // 数据大屏
  {
    path: '/screen',
    component:()=> import('@/views/screen/index.vue'),
    name: 'screen',
    meta: {
      title: '数据大屏',
      hidden: false,
      icon: 'Monitor',
    },
  },
  //权限管理
  {
    path: '/acl',
    component:()=> import('@/layout/index.vue'),
    name: 'acl',
     redirect: '/acl/user',
    meta: {
      title: '权限管理',
      hidden: false,
      icon: 'Lock',
    },
    children: [
      {
        path: '/acl/user',
        component:()=> import('@/views/acl/user/index.vue'),
        name: 'user',
        meta: {
          title: '用户管理',
          hidden: false,
          icon: 'User',
        },
      },
      {
        path: '/acl/role',
        component:()=> import('@/views/acl/role/index.vue'),
        name: 'role',
        meta: {
          title: '角色管理',
          hidden: false,
          icon: 'Avatar',
        },
      },
      {
        path: '/acl/permission',
        component:()=> import('@/views/acl/permission/index.vue'),
        name: 'permission',
        meta: {
          title: '菜单管理',
          hidden: false,
          icon: 'Grid',
        },
      },
    ],
  },

  {
    path: '/product',
    component: () => import('@/layout/index.vue'),
    name: 'shop',
     redirect: '/product/attr',
    meta: {
      title: '商品管理',
      hidden: false,
      icon: 'ShoppingTrolley',
    },
    children: [
      {
        path: '/product/attr',
        component:()=> import('@/views/product/attr/index.vue'),
        name: 'attr',
        meta: {
          title: '品牌管理',
          hidden: false,
          icon: 'Shop',
        },
      },
      {
        path: '/product/tradefark',
        component:()=> import('@/views/product/tradefark/index.vue'),
        name: 'tradefark',
        meta: {
          title: '属性管理',
          hidden: false,
          icon: 'Files',
        },
      },
      {
        path: '/product/sku',
        component:()=> import('@/views/product/sku/index.vue'),
        name: 'sku',
        meta: {
          title: 'SKU管理',
          hidden: false,
          icon: 'ShoppingCart',
        },
      },
      {
        path: '/product/spu',
        component:()=> import('@/views/product/spu/index.vue'),
        name: 'spu',
        meta: {
          title: 'SPU管理',
          hidden: false,
          icon: 'Calendar',
        },
      },
    ],
  },
]
