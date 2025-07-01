import { defineStore } from 'pinia'
import type { loginForm } from '@/api/user/type'
import { login } from '@/api/user'
import type { UserState } from './type'
import { GET_TOKEN,SET_TOKEN } from '@/utils/token'
//创建用户仓库
const useUSerStore = defineStore('User', {
  //小仓库
  state: ():UserState => {
    return {
      token:GET_TOKEN() ,
    }
  },
  //异步/函数
  actions: {
    async userLogin(data: loginForm) {
      const result = await login(data)
      //登录请求：成功200->token
      //登录请求：失败201->登录失败错误信息 
console.log(result);
      if (result.code == 200) {
        //pinia仓库存储token
        this.token = ((result.data.token as string))
        //本地存储
       SET_TOKEN((result.data.token as string))
        //保证返回一个成功的promise对象
       
        
        return 'ok';
      } else {
        return Promise.reject(new Error(result.data.message));
      }
    },
  },
  //计算属性
  getters: {},
})
export default useUSerStore
