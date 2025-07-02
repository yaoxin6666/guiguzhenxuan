import { createApp } from 'vue'
import App from '@/App.vue'
//引入模板的全局的样式
import '@/styles/index.scss'
//引入element-plus插件与样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//svg插件需要配置代码
import 'virtual:svg-icons-register'
//引入仓库
import pinia from './store'
//配置element-plus国际化
//@ts-expect-error
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
//暗黑模式需要的样式
import 'element-plus/theme-chalk/dark/css-vars.css'
//引入全局组件
import gloablComponents from '@/components/index'
//引入路由鉴权文件
import './permisstion'
//引入路由
import router from './router'
//获取应用实例对象

const app = createApp(App)
//安装element-plus插件
app.use(ElementPlus, {
  locale: zhCn, //element-plus国际化配置
})
//引入全局组件
app.use(gloablComponents)
//引入路由
app.use(router)
// 引入仓库
app.use(pinia)

//将应用挂载到挂载点上
app.mount('#app')
