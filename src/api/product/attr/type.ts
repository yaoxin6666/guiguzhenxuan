//所有分类都有的ts数据类型
export interface ResponseData {
  code: number
  message: string
  ok: boolean
}

//分类ts类型
export interface CategoryObj {
  id: number | string
  name: string
  category1Id?: number
  category2Id?: number
}

//相应的分类接口返回数据类型

export interface CategoryResponseData extends ResponseData {
  data: CategoryObj[]
}
//获取已有属性的ts类型
//属性对象的ts类型

export interface AttrValue {
  id?:number,
  valueName:string,
  attrId?:number
    flag?:boolean//控制每个属性值的编辑与查看
}
//存储每一个属性值的数组类型
export type AttrValueList = AttrValue[]

//属性对象
export interface Attr {
  attrIdAndValueId: unknown
  id?:number,
  attrName:string,
  categoryId:number|string,
  categoryLevel:number,
  attrValueList:AttrValueList,

}
//存储每一个属性对象的数组ts类型
export type AttrList = Attr[]
//属性接口返回的数据类型 
export interface AttrResponseData extends ResponseData {
  data:Attr[]
}
