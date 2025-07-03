//品牌管理数据类型
export interface ResponseData{
cosde:number,
message:string,
ok:boolean
}
//已有品牌的ts类型
export interface Trademark {
  id?:number,
  tmName:string,
  LogoUrl:string
}
//包含全部数据的ts类型
export type Records = Trademark[]
//获取的已有的全部品牌的数据类型
export interface TrademarkResponseData extends ResponseData {
  data:{
    records:Records,
    total:number,
    size:number,
    current:number,
    searchCount:boolean,
    pages:number
  }
}