//服务器返回的全部接口共有的数据
export interface ResponseData {
  code:number,
  message:string,
  ok:boolean
}

export interface Attr {
  attrId: number | string //平台属性的ID
  valueId: number | string //属性值的ID
  attrIdAndValueId?:string
    attrName?:string
}

export interface saleArr {
  id?:number
  saleAttrId: number | string //属性ID
  saleAttrValueId: number | string //属性值的ID
  attrIdAndValueId?:string
  saleAttrValueName?:string

}
export interface skuImage{
  id?:number,
  createTime?:string,
  updateTime?:string,
  spuId?:number,
  imgName?:string,
  imgUrl?:string,
  name?:string,
  url?:string
}
export interface SkuData {
  isSale?: number
  id?: number
  category3Id?: string | number //三级分类的ID
  spuId?: string | number //已有的SPU的ID
  tmId?: string | number //SPU品牌的ID
  skuName?: string //sku名字
  price?: string | number //sku价格
  weight?: string | number //sku重量
  skuDesc?: string //sku的描述
  skuAttrValueList?: Attr[]
  skuSaleAttrValueList?: saleArr[]
  skuDefaultImg?: string //sku图片地址
  
skuImageList?:skuImage[]
}

//获取SKU数据接口的ts类型
export interface SkuInfoData extends ResponseData {
  data:{
   total: number
   records:SkuData[]
  }
}
//获取sku信息
export interface SkuInfo extends ResponseData {
  data:SkuData
} 