import { defineStore } from "pinia";
import { getCategory1,getCategory2,getCategory3 } from "@/api/product/attr";
import type { CategoryResponseData } from "@/api/product/attr/type";
import type { CategoryState } from "./type";
//商品分类相关仓库
const useCategoryStore = defineStore('categoryStore',{
state:():CategoryState=>{
return {
category1Data:[],//一级分类数据
category1Id:''

}
},
actions:{
  //获取一级分类数据
async getCategory1(){
const result:CategoryResponseData = await getCategory1()
console.log(result);
if(result.code==200){
this.category1Data=result.data 
}


 },

},
getters:{

}
})
export default useCategoryStore