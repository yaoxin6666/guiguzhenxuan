import request from '@/utils/request'
import type { User, UserResponseData } from './type'
enum API {
  //获取已有用户信息
  USERLIST_URL = '/admin/acl/user/',
  //添加新用户
  ADDUSER_URL = '/admin/acl/user/save',
  //修改已有用户信息
UPDATEUSER_URL = '/admin/acl/user/update',
}
//获取已有用户信息
export const getUserList = (page: number, limit: number) =>
  request.get<any,UserResponseData>(API.USERLIST_URL + `${page}/${limit}`)
export const addOrUpdateUserInfo = (data:User)=>{
  if(data.id){
    return request.put<any,any>(API.UPDATEUSER_URL,data)
  }else{
    return request.post<any,any>(API.ADDUSER_URL,data)
  }
}