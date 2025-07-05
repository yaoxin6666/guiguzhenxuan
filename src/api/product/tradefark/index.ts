//品牌管理模块接口
import request from "@/utils/request";
import type { TrademarkResponseData,Trademark } from "./type";
//品牌管理接口地址
enum API{
  //获取已有品牌接口
  TRADEMARK_URL='/admin/product/baseTrademark/',
  //新增品牌接口
  ADDTRADEMARK_URL='/admin/product/baseTrademark/save',
  //修改品牌数据接口
  UPDATETRADEMARK_URL='/admin/product/baseTrademark/update',
  //删除已有品牌接口
  DELETETRADEMARK_URL = `/admin/product/baseTrademark/REMOVE/`
}
//获取已有品牌接口方法
// page:获取第几页
// limit:获取几个已有品牌数据
export const getTrademark = (page:number,limit:number) =>request.get<any,TrademarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)
//新增/修改品牌数据接口
export const addOrUpdateTrademark = (data:Trademark) =>{
  if(data.id) {
   return request.put<any,any>(API.UPDATETRADEMARK_URL,data)
  }else {
    return request.post<any,any>(API.ADDTRADEMARK_URL,data)
  }
}
//删除已有品牌
export const deleteTrademark = (id:number) =>request.delete(API.DELETETRADEMARK_URL+`${id}`)
