//封存本地存储数据与读取数据方法
//存储数据
export const SET_TOKEN = (token:string) =>{
   localStorage.setItem('TOKEN', token)
}
//本地存储获取数据
export const GET_TOKEN = () =>{
 return localStorage.getItem('TOKEN')
}
//删除本地存储token
export const REMOVE_TOKEN =() =>{
   localStorage.removeItem('TOKEN')
}