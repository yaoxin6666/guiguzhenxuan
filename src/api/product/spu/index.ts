import request from '@/utils/request'
import type {
  HasSpuResponseData,
  AllTrademark,
  spuHasImage,
  saleAttrResponseData,
  hasSaleAttrResponseData,
  SpuData,
} from './type'
enum API {
  //获取已有SPU
  GETHASSPU_URL = '/admin/product/',
  //获取全部品牌的数据
  ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
  //获取某个spu下的全部售卖商品的图片数据
  IMAGE_UPL = '/admin/product/spuImageList/',
  //获取某个spu下的全部已有的销售属性接口
  SPUHASSALETTR_URL = '/admin/product/spuSaleAttrList/',
  //获取整个项目全部的销售属性【颜色、版本、尺码】
  ALLSALEATTR_URL = '/admin/product/baseSaleAttrList',
  //追加一个新的spu
  ADDSPU_URL = '/admin/product/saveSpuInfo',
  //更新已有spu
  UPDATESPU_URL = '/admin/product/updateSpuInfo',
}

//获取已有SPU
export const getHasSpu = (
  pageNo: number,
  pageSize: number,
  category3Id: number | string,
) =>
  request.get<any, HasSpuResponseData>(
    API.GETHASSPU_URL + `${pageNo}/${pageSize}?category3Id=${category3Id}`,
  )
//获取全部品牌的数据
export const getAlltrademark = () =>
  request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)
//获取某个spu下的全部售卖商品的图片数据
export const getImage = (spuId: number) =>
  request.get<any, spuHasImage>(API.IMAGE_UPL + spuId)
//获取某个spu下的全部已有的销售属性接口
export const spuHasSaleAttr = (spuId: number) =>
  request.get<any, saleAttrResponseData>(API.SPUHASSALETTR_URL + spuId)
//获取整个项目全部的销售属性【颜色、版本、尺码】
export const allSaleAttr = () =>
  request.get<any, hasSaleAttrResponseData>(API.ALLSALEATTR_URL)
//新增或修改已有spu
export const addOrUpdateSpu = (data:SpuData)=>{
  if(data.id){
    return request.post<any,any>(API.UPDATESPU_URL,data)
  }else{
return request.post<any,any>(API.ADDSPU_URL,data)
  }
}