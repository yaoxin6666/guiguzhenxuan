<template>
  <div>
    <el-dialog v-model="dialogVisible" @close="handleClose">
      <template #content></template>
      <el-table :data="data" border>
        <el-table-column label="sku名称" prop="skuName"></el-table-column>
        <el-table-column label="sku价格" prop="price"></el-table-column>
        <el-table-column label="sku重量" prop="weight"></el-table-column>
        <el-table-column label="sku图片">
          <template #="{ row, $index }">
            <el-image :src="row.skuDefaultImg"></el-image>
          </template>
        </el-table-column>
      </el-table>

      <template #footer>
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="handleClose">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { SkuData } from '@/api/product/spu/type'
import { ref, watch } from 'vue'

let props = defineProps({
  data: Array<SkuData>,
  visible: Boolean,
})
const dialogVisible = ref(props.visible)
const emits = defineEmits(['update:visible']) // 触发更新事件
const handleClose = () => {
  emits('update:visible', false) // 关闭时通知父组件更新状态
}
// 监听父组件visible变化
watch(
  () => props.visible,
  (newVal) => {
    dialogVisible.value = newVal
  },
)

// 监听本地状态变化并通知父组件
// watch(dialogVisible, (newVal) => {
//   emits('update:visible', newVal)
// })
</script>

<style scoped></style>
