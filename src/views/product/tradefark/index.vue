<template>
  <el-card>
    <el-button type="primary" icon="Plus" style="margin-bottom: 10px">
      添加品牌
    </el-button>
    <el-table border style="width: 100%" :data="tradefarkData">
      <el-table-column label="序号" width="100px" align="center" type="index"/>
      <el-table-column label="品牌名称" align="center">
<template #="{row,$index}">
<h1>{{ row.tmName }}</h1>
</template>
      </el-table-column>
      <el-table-column label="品牌LOGO" align="center">
<template #="{row,$index}">
<img :src="row.logoUrl" alt="图片消失了..." style="width: 50px;height: 50px;">
</template>
      </el-table-column>
      <el-table-column label="品牌操作" align="center">
<template #="{row,$index}">
<el-button type="success" size="small" icon="Edit"></el-button>
<el-button type="danger" size="small" icon="Delete"></el-button>

</template>
      </el-table-column>
    </el-table>
    <!-- 
     v-model:current-page:当前页数
     v-model:page-size:每页显示的个数
     size：分页器大小
     background:是否添加背景色、
     total：共多少条
     layout：子组件拍列顺序
    -->
    <el-pagination
      v-model:current-page="pageNO"
      v-model:page-size="limit"
      :page-sizes="[3, 5, 7, 9]"
      :size="size"
      :background="true"
      layout="prev, pager, next, jumper,->,total, sizes"
      :total="total"
    />
  </el-card>
</template>

<script setup lang="ts">
import { ref ,onMounted} from 'vue'
import type { TrademarkResponseData,Records } from '@/api/product/tradefark/type'
import { getTrademark } from '@/api/product/tradefark'
const pageNO = ref<number>(1)//current-page:当前页数
const limit = ref<number>(3)//page-size:每页显示的个数
let total = ref<number>()//共多少条
let tradefarkData = ref<Records>([])
const getTrademarkData = async()=>{
const result:TrademarkResponseData = await getTrademark(pageNO.value,limit.value)

total.value = result.data.total
tradefarkData.value = result.data.records
}
onMounted(()=>{
  getTrademarkData()
})
</script>

<style scoped></style>
