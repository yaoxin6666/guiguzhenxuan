<template>
  <div>
<category></category>
<el-card>
  <el-button type="primary" icon="Plus">添加SPU</el-button>
  <el-table border style="margin: 10px 0;">
    <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
    <el-table-column label="SPU名称"></el-table-column>
    <el-table-column label="SPU描述"></el-table-column>
    <el-table-column label="SPU操作"></el-table-column>

  </el-table>
   <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[3,5,7,9]"
      :size="size"
    
      :background="true"
      layout=" prev, pager, next, jumper,->,total, sizes,"
      :total="400"
    />
</el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//当前页码
let pageNo = ref<number>(1)
//每页几条数据
let pageSize = ref<number>(3)
</script>

<style scoped>

</style>