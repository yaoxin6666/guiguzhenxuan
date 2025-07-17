import request from '@/utils/request'
import type { AllRoleResponseData, SetRoleData, SetRoleResponseData, User, UserResponseData } from './type'
enum API {
  //获取已有用户信息
  USERLIST_URL = '/admin/acl/user/',
  //添加新用户
  ADDUSER_URL = '/admin/acl/user/save',
  //修改已有用户信息
UPDATEUSER_URL = '/admin/acl/user/update',
//获取全部职位，当前账号职位接口
ALLROLE_URL='/admin/acl/user/toAssign/',
//给用户分配职位
SETROLE_URL = '/admin/acl/user/doAssignRole',
//删除某个用户
REMOVEUSER_URL='/admin/acl/user/remove/',
//删除多个用户
REMOVEUSERLIST_URL = '/admin/acl/user/batchRemove'
}
//获取已有用户信息
export const getUserList = (page: number, limit: number,username:string) =>
  request.get<any,UserResponseData>(API.USERLIST_URL + `${page}/${limit}/?username=${username}`)
  //添加新用户,修改已有用户信息
export const addOrUpdateUserInfo = (data:User)=>{
  if(data.id){
    return request.put<any,any>(API.UPDATEUSER_URL,data)
  }else{
    return request.post<any,any>(API.ADDUSER_URL,data)
  }
}
////获取全部职位，当前账号职位接口
export const getAllRole = (id:number)=>request.get<any,AllRoleResponseData>(API.ALLROLE_URL+id)

//给用户分配职位
export const setRole = (data:SetRoleData)=>request.post<any,SetRoleResponseData>(API.SETROLE_URL,data)

//删除某个用户
export const removeUser = (id:number)=>request.delete<any,any>(API.REMOVEUSER_URL+id)
//删除多个用户
export const bachRemove = (idList:number[])=>request.delete<any,any>(API.REMOVEUSERLIST_URL,{data:idList})