import { defineStore } from 'pinia'
import type { loginFormData,loginResponseData,userInfoResponseData } from '@/api/user/type'
import { login, userInfo,logout } from '@/api/user'
import type { UserState } from './type'
import { GET_TOKEN, SET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由数据
import { constantRouter } from '@/router/router'
//创建用户仓库
const useUSerStore = defineStore('User', {
  //小仓库
  state: (): UserState => {
    return {
      token: GET_TOKEN(), //用户唯一标识
      menuRoutes: constantRouter, //仓库生成菜单需要的数组（路由）
      username: '', //用户名
      avatar: '', //头像
    }
  },
  //异步/函数
  actions: {
    //登录
    async userLogin(data:loginFormData) {
      const result:loginResponseData = await login(data)
      //登录请求：成功200->token
      //登录请求：失败201->登录失败错误信息
      if (result.code == 200) {
        //pinia仓库存储token
        this.token = result.data as string
        //本地存储
        SET_TOKEN(result.data as string)
        //保证返回一个成功的promise对象

        return 'ok'
      } else {
        return Promise.reject(new Error(result.data))
      }
    },
    //获取用户信息
    async userInfo() {
      const result:userInfoResponseData = await userInfo()
      if (result.code == 200) {
        this.username = result.data.name
        this.avatar = result.data.avatar
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //退出登录
    async logout() {
const result:any = await logout()
if(result.code == 200){
    this.token = ''
      this.username = ''
      this.avatar = ''
      REMOVE_TOKEN() 
}
   
    },
  },
  //计算属性
  getters: {},
})
export default useUSerStore
