import request from '@/utils/request'
import { SkuInfo, SkuInfoData } from './type'
enum API {
  //获取已有商品的sku
  SKU_URL = '/admin/product/list/',
  //上架
  SALE_URL = '/admin/product/onSale/',
  //下架
  CANCELSALE_URL = '/admin/product/cancelSale/',
  //获取某个sku信息
  SKUINFODATA_URL = '/admin/product/getSkuInfo/',
  //删除已有sku
DELETE_URL = '/admin/product/deleteSku/'
}

//获取已有商品的sku
export const getHasSku = (page: number, limit: number) =>
  request.get<any, SkuInfoData>(API.SKU_URL + `${page}/${limit}`)
//上架
export const onSale = (id: number) => request.get<any, any>(API.SALE_URL + id)
//下架
export const cancelSale = (id: number) =>
  request.get<any, any>(API.CANCELSALE_URL + id)
//获取某个sku信息
export const getSkuInfo = (id: number) =>
  request.get<any, SkuInfo>(API.SKUINFODATA_URL + id)
//删除已有sku
export const deleteSku = (id:number)=>request.delete<any,any>(API.DELETE_URL+id)