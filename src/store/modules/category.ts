import { defineStore } from 'pinia'
import { getAttrInfoList, getCategory1, getCategory2, getCategory3 } from '@/api/product/attr'
import type { AttrResponseData, CategoryResponseData } from '@/api/product/attr/type'
import type { CategoryState } from './type'
//商品分类相关仓库
const useCategoryStore = defineStore('categoryStore', {
  state: (): CategoryState => {
    return {
      category1Data: [], //一级分类数据
      category1Id: '', //选择的一级分类id
      category2Data: [], //二级分类数据
      category2Id: '', //选择的二级分类id
      category3Data: [], //三级分类数据
      category3Id: '',
    }
  },
  actions: {
    //获取一级分类数据
    async getCategory1() {
      const result: CategoryResponseData = await getCategory1()

      if (result.code == 200) {
        this.category1Data = result.data
      }
    },
    //获取二级分类数据
    async getCategory2() {
      const result: CategoryResponseData = await getCategory2(this.category1Id)

      if (result.code == 200) {
        this.category2Data = result.data
      }
    },
    //获取三级分类数据
    async getCategory3() {
      const result: CategoryResponseData = await getCategory3(this.category2Id)

      if (result.code == 200) {
        this.category3Data = result.data
      }
    },
    //获取已有属性
    async getAttrInfoList(){
  return  await  getAttrInfoList(this.category1Id,this.category2Id,this.category3Id)
    
     
     }
  },
  getters: {},
})
export default useCategoryStore
