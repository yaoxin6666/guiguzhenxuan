//登录接口需要携带的数据类型
export interface loginFormData {
  username:string,
  password:string
}
//全部接口返回数据都拥有的数据类型
interface ResponseData {
 code:number
  message:string
  ok:boolean
}
//定义登录接口返回数据类型
export interface loginResponseData extends ResponseData {
  data:string
}
//获取用户信息时返回数据类型
export interface userInfoResponseData extends ResponseData {
 data:{
  routes:string[],
  buttons:string[],
  roles:string[],
  name:string,
  avatar:string


 }
}


