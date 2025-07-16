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
