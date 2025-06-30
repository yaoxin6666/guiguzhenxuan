import request from '@/utils/request'
import type{loginForm,loginResponseData,userResponseData} from'./type'
enum API {
  LOGIN_URL = 'user/login',
  USERINFO_URL = 'user/info',
}
//对外暴露
//登录
export  const login = (data:loginForm ) =>request.post<any,loginResponseData>(API.LOGIN_URL,data);
export const userInfo = () =>request.get<any,userResponseData>(API.USERINFO_URL);