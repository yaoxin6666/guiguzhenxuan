<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <!-- label为展示的数据 ：value为select收集的数据 -->
          <el-select size="large" style="width: 200px" v-model="categoryStore.category1Id">
            <el-option v-for="(category1Data,index) in categoryStore.category1Data" :key="category1Data.id" :value="category1Data.id" :label="category1Data.name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select size="large" style="width: 200px">
            <el-option>北京</el-option>
            <el-option>北京</el-option>
            <el-option>北京</el-option>
            <el-option>北京</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select size="large" style="width: 200px">
            <el-option>北京</el-option>
            <el-option>北京</el-option>
            <el-option>北京</el-option>
            <el-option>北京</el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import useCategoryStore from '@/store/modules/category'
import { onMounted } from 'vue'
const categoryStore = useCategoryStore()
//组件挂载后，发请求获取一级分类数据
onMounted(() => {
  getCategory1()
})
//获取一级分类数据
const getCategory1 = () => {
categoryStore.getCategory1()

}
</script>

<style scoped></style>
