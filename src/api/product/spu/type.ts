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
  spuSaleAttrValueList?:spuSaleArttrValueList
  flag?:boolean,
  NewsaleAttrValueName?:string
  attrIdAndValueId?:string
  saleIdAndValueId?:string
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

export interface Attr {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
  attrIdAndValueId?:string
}

export interface saleArr {
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
  attrIdAndValueId?:string
}
export interface SkuData {
  id: number
  category3Id: string | number //三级分类的ID
  spuId: string | number //已有的SPU的ID
  tmId: string | number //SPU品牌的ID
  skuName: string //sku名字
  price: string | number //sku价格
  weight: string | number //sku重量
  skuDesc: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg: string //sku图片地址
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
  data: SkuData[]
}