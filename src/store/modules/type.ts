//引入官方路由数据类型
import type { RouteRecordRaw } from 'vue-router'
import type { CategoryObj } from '@/api/product/attr/type'
//用户小仓库state数据类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username:string
  avatar:string
}
//分类仓库state数据类型
export interface CategoryState {
  category1Id:number|string,
  category1Data:CategoryObj[]
}