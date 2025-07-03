//品牌管理模块接口
import request from "@/utils/request";
import type { TrademarkResponseData } from "./type";
//品牌管理接口地址
enum API{
  //获取已有品牌接口
  TRADEMARK_URL='/admin/product/baseTrademark/'
}
//获取已有品牌接口方法
// page:获取第几页
// limit:获取几个已有品牌数据
export const getTrademark = (page:number,limit:number) =>request.get<any,TrademarkResponseData>(API.TRADEMARK_URL+`${page}/${limit}`)