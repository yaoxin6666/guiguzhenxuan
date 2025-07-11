//分类相关接口
import request from "@/utils/request"
import type { AttrResponseData, CategoryResponseData,Attr } from "./type"
enum API{
  //一级分类
  CATEGORY1_URL='/admin/product/getCategory1',
  //二级分类
  CATEGORY2_URL='/admin/product/getCategory2/',
  //三级分类
  CATEGORY3_URL='/admin/product/getCategory3/',
  //获取已有属性接口
  ATTRINFOLIST_URL='/admin/product/attrInfoList/',
  //添加新属性或者修改已有属性
  ADDORUPDATAATTR_URL='/admin/product/saveAttrInfo',
  //删除已有属性
  DELETRATTR_URL='/admin/product/deleteAttr/'
}
//一级分类
export const getCategory1 = () =>request.get<any,CategoryResponseData>(API.CATEGORY1_URL)
//二级分类
export const getCategory2 = (category1Id:number|string) =>request.get<any,CategoryResponseData>(API.CATEGORY2_URL+`${category1Id}`)
// 三级分类
export const getCategory3 = (category2Id:number|string) =>request.get<any,CategoryResponseData>(API.CATEGORY3_URL+`${category2Id}`)
//获取已有属性接口
export const getAttrInfoList = (category1Id:number|string,category2Id:number|string,category3Id:number|string) =>request.get<any,AttrResponseData>(API.ATTRINFOLIST_URL+`${category1Id}/${category2Id}/${category3Id}`)
// //添加新属性或者修改已有属性
export const addOrUpdataAttr = (data:Attr)=>request.post<any,any>(API.ADDORUPDATAATTR_URL,data)
//删除已有属性
export const removeAttr = (id:number) =>request.delete<any,any>(API.DELETRATTR_URL+id)