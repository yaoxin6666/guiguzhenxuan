//引入官方路由数据类型
import type { RouteRecordRaw } from 'vue-router'
//小仓库state数据类型
export interface UserState {
  token: string | null
  menuRoutes: RouteRecordRaw[]
  username:string
  avatar:string
}
