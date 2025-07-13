//服务器返回的全部接口共有的数据
export interface ResponseData {
  code:number,
  message:string,
  ok:boolean
}
//spu数据的ts类型
export interface SpuData {
  id?:number,
  spuName:string,
  description:string,
  category3Id:string|number,
  tmId:number|string,
  spuSaleAttrList:null|saleAttr[],
  spuImageList:null|spuImg[]
}
//数组：元素都是已有的spu数据类型

export type Rescords = SpuData[]

//已有spu接口返回的ts类型
export interface HasSpuResponseData extends ResponseData {
  data:{
    records:Rescords,
    total:number,
    size:number,
    current:number,
    searchCount:boolean,
    pages:number
  }
}
//品牌数据的ts类型
export interface Trademark {
  id:number,
  tmName:string,
  logoUrl:string
}
//品牌接口返回的数据类型
export interface AllTrademark extends ResponseData {
  data:Trademark[]
}
//商品图片的ts类型
export interface spuImg{
  id?:number,
  createTime?:string,
  updateTime?:string,
  spuId?:number,
  imgName?:string,
  imgUrl?:string,
  name?:string,
  url?:string
}
//已有的spu的图片数据类型
export interface spuHasImage extends ResponseData {
  data:spuImg[]
}
//已有的销售属性值对象
export interface SaleAttrValue {
  id?:number,
  createTime?:null,
  updateTime?:null,
  spuId?:number,
  saleAttrValueName:string,
  baseSaleAttrId:number,
  saleAttrName?:string,
  isChecked?:null
}
//存储已有销售属性的数据类型
export type spuSaleArttrValueList = SaleAttrValue[]

//销售属性对象的数据类型
export interface saleAttr {
   id?:number,
  createTime?:null,
  updateTime?:null,
  spuId?:number,
  baseSaleAttrId:number|string,
  saleAttrName:string,
  spuSaleArttrValueList:spuSaleArttrValueList,
  flag?:boolean,
  NewsaleAttrValueName?:string
}
//spu已有的销售属性接口返回的数据类型
export interface saleAttrResponseData extends ResponseData {
  data:saleAttr[]
}
//已有的全部spu的返回数据类型
export interface hasSaleAttr {
  id:number,
  name:string
}
export interface hasSaleAttrResponseData extends ResponseData {
  data:hasSaleAttr[]
}