<template>
  <div>
  <Category></Category>
<el-card style="margin-top: 10px;">
  <el-button type="primary" icon="Plus" :disabled="!CategoryStore.category3Id">添加平台属性</el-button>
  <el-table style="margin-top: 10px;">
    <el-table-column prop="序号"label="序号" type="index" align="center" width="80px"></el-table-column>
    <el-table-column prop="属性名称" label="属性名称" width="120px"></el-table-column>
    <el-table-column label="属性值名称"></el-table-column>
    <el-table-column label="操作" width="120px"> </el-table-column>

  </el-table>
</el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category';
const CategoryStore = useCategoryStore()
</script>

<style scoped>

</style>