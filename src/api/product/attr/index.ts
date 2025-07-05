//分类相关接口
import request from "@/utils/request"
import type { CategoryResponseData } from "./type"
enum API{
  //一级分类
  CATEGORY1_URL='/admin/product/getCategory1',
  //二级分类
  CATEGORY2_URL='/admin/product/getCategory2/',
  //三级分类
  CATEGORY3_URL='/admin/product/getCategory3/'
}
//一级分类
export const getCategory1 = () =>request.get<any,CategoryResponseData>(API.CATEGORY1_URL)
//二级分类
export const getCategory2 = (category1Id:number) =>request.get<any,CategoryResponseData>(API.CATEGORY2_URL+`${category1Id}`)
// 三级分类
export const getCategory3 = (category2Id:number) =>request.get<any,CategoryResponseData>(API.CATEGORY3_URL+`${category2Id}`)
