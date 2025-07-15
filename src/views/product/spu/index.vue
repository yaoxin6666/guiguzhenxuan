<template>
  <div>
    <category :toggle="toggle"></category>
    <el-card v-show="toggle == 0" style="margin: 10px 0">
      <el-button type="primary" icon="Plus" @click="addSpu">添加SPU</el-button>
      <el-table border style="margin: 10px 0" :data="rescords">
        <el-table-column
          label="序号"
          type="index"
          align="center"
          width="100px"
        ></el-table-column>
        <el-table-column label="SPU名称" prop="spuName"></el-table-column>
        <el-table-column label="SPU描述" prop="description"></el-table-column>
        <el-table-column label="SPU操作">
          <template #="{ row, $index }">
            <el-button
              @click="addSku(row)"
              type="primary"
              icon="Plus"
              size="small"
              title="添加sku"
            ></el-button>
            <el-button
              @click="editSpu(row)"
              type="warning"
              icon="Edit"
              size="small"
              title="修改spu"
            ></el-button>
            <el-button
              type="info"
              icon="View"
              size="small"
              title="查看已有sku"
              @click="getHasSku(row)"
            ></el-button>
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              title="删除spu"
              @click="deleteSpu(row)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        :size="size"
        :background="true"
        layout=" prev, pager, next, jumper,->,total, sizes,"
        :total="total"
        @size-change="changeSize"
        @current-change="getSpu"
      />
    </el-card>
    <SpuForm
      ref="spuData"
      v-show="toggle == 1"
      @changeToggle="changeToggle"
    ></SpuForm>
    <SkuForm
      ref="skuData"
      v-show="toggle == 2"
      @changeToggle="changeToggle"
    ></SkuForm>
    <Dialog :data="HasSku" v-model:visible="showDialog"></Dialog>
  </div>
</template>

<script setup lang="ts">
import type { SkuData, SkuInfoData, SpuData } from '@/api/product/spu/type'
import { ref, watch } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { getHasSpu, getSku, removeSpu } from '@/api/product/spu'
import type { Rescords, HasSpuResponseData } from '@/api/product/spu/type'
import SkuForm from './SkuForm.vue'
import SpuForm from './SpuForm.vue'
import Dialog from './dialog.vue'
import { ElMessage } from 'element-plus'
//spu组件实例对象
let spuData = ref()
//sku组件实例
let skuData = ref()
//切换页面
let toggle = ref<number>(0)
//当前页码
let pageNo = ref<number>(1)
//每页几条数据
let pageSize = ref<number>(3)
//已有spu数据
let rescords = ref<Rescords>([])
//共有多少条数据
const total = ref<number>(0)
//获取已有sku
let HasSku = ref<SkuData[]>([])
//对话框显示隐藏
let showDialog = ref<boolean>(false)
const categoryStore = useCategoryStore()
watch(
  () => categoryStore.category3Id,
  () => {
    if (!categoryStore.category3Id) return
    getSpu()
  },
)
//获取已有spu
const getSpu = async (pager = 1) => {
  pageNo.value = pager

  let result: HasSpuResponseData = await getHasSpu(
    pageNo.value,
    pageSize.value,
    categoryStore.category3Id,
  )
  if (result.code == 200) {
    rescords.value = result.data.records
    total.value = result.data.total
  }
}
//每页几条数据发生改变
const changeSize = () => {
  getSpu()
}
//子组件spu页面切换回主页面
const changeToggle = (data: any) => {
  toggle.value = data.flag
  if (data.params == 'update') {
    //a更新留在当前页
    getSpu(pageNo.value)
  } else {
    //添加回到第一页
    getSpu()
  }
}
//添加spu
const editSpu = (row: SpuData) => {
  toggle.value = 1

  console.log(spuData.value)
  spuData.value.getTrademark(row)
  spuData.value.getAllSaleAttr(row.id)
  spuData.value.getHasSaleAttr()
  spuData.value.getSpuImage(row.id)
}
//添加sku
const addSku = (row: SpuData) => {
  toggle.value = 2
  skuData.value.getAttrInfo()
  skuData.value.getSpuImage(row.id as number)
  skuData.value.getAllSaleAttr(row.id as number)
}
//添加spu
const addSpu = () => {
  toggle.value = 1
  spuData.value.initSpuParams()
  spuData.value.getTrademark({} as SpuData)
  spuData.value.getHasSaleAttr()
}
//查看已有sku
const getHasSku = async (row: SkuData) => {
  //控制弹框显示
  showDialog.value = true

  let result: SkuInfoData = await getSku(row.id as number)
  HasSku.value = result.data
}
const deleteSpu = async (row: SkuData) => {
  console.log(row);
  
  let result = await removeSpu(row.id)
  if(result.code == 200){
    ElMessage({
      type:'success',
      message:'删除成功'
    }) 
    getSpu()
  }else{
     ElMessage({
      type:'error',
      message:'删除失败'
    })
  }
 
}
</script>

<style scoped></style>
