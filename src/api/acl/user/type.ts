//用户接口数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//用户信息数据类型
export interface User {
  createTime?: string
  id?: number
  name: string
  password: string
  phone?: null
  roleName?: string
  updateTime?: string
  username: string
}

//数组包含全部用户信息
export type Records = User[]
//接口返回数据数据类型
export interface UserResponseData extends ResponseData {
  data: {
    records: Records
    pages: number
    current: number
    size: number
    total: number
  }
}

//代表一个职位的ts类型
export interface RoleData {
  id?: number
  createTime?: string
  updateTime?: string
  roleName: string
  remark: null
}
//全部职位的列表
export type AllRole = RoleData[]
//获取全部职位的接口返回的数据ts类型
export interface AllRoleResponseData extends ResponseData {
  data: {
    assignRoles: AllRole
    allRolesList: AllRole
  }
}

//给用户分配职位接口携带参数的ts类型
export interface SetRoleData {
  roleIdList: number[]
  userId: number
}

export interface SetRoleResponseData extends ResponseData {
  data:SetRoleData
}