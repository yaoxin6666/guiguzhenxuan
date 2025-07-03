import request from '@/utils/request'
import type{loginFormData,loginResponseData,userInfoResponseData} from'./type'
enum API {
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}
//对外暴露
//登录
export  const login = (data:loginFormData ) =>request.post<any,loginResponseData>(API.LOGIN_URL,data);
//获取用户信息
export const userInfo = () =>request.get<any,any>(API.USERINFO_URL);
//退出登录
export const logout = () =>request.post<any,userInfoResponseData>(API.LOGOUT_URL)