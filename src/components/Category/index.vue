<template>
  <div>
    <el-card>
      <el-form :inline="true">
        <el-form-item label="一级分类">
          <!-- label为展示的数据 ：value为select收集的数据 -->
          <el-select
            :disabled="toggle == 1"
            size="large"
            style="width: 200px"
            v-model="categoryStore.category1Id"
            @change="getCategory2"
          >
            <el-option
              v-for="(category1Data, index) in categoryStore.category1Data"
              :key="category1Data.id"
              :value="category1Data.id"
              :label="category1Data.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类">
          <el-select
            :disabled="toggle == 1"
            size="large"
            style="width: 200px"
            v-model="categoryStore.category2Id"
            @change="getCategory3"
          >
            <el-option
              v-for="(category2Data, index) in categoryStore.category2Data"
              :key="category2Data.id"
              :value="category2Data.id"
              :label="category2Data.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="三级分类">
          <el-select
            :disabled="toggle == 1"
            size="large"
            style="width: 200px"
            v-model="categoryStore.category3Id"
          >
            <el-option
              v-for="(category3Data, index) in categoryStore.category3Data"
              :key="category3Data.id"
              :value="category3Data.id"
              :label="category3Data.name"
            ></el-option>
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
//获取二级分类数据
const getCategory2 = () => {
  categoryStore.category2Id = ''
  categoryStore.category3Data = []
  categoryStore.category3Id = ''

  categoryStore.getCategory2()
}
//获取三级分类数据
const getCategory3 = () => {
  categoryStore.category3Id = ''
  categoryStore.getCategory3()
}
//获取切换按钮数据
defineProps(['toggle'])
</script>

<style scoped></style>
