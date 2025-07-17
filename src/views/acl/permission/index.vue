<template>
  <div>
    <el-table
      :data="permisstionArr"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="权限值" prop="code"></el-table-column>
      <el-table-column label="修改时间" prop="updateTime"></el-table-column>
      <el-table-column label="操作">
        <template #="{ row, $index }">
          <el-button
            type="primary"
            icon="Plus"
            size="small"
            :disabled="row.level == 4 ? true : false"
            @click="addMenu(row)"
          >
            {{ row.level == 3 ? '添加功能' : '添加菜单' }}
          </el-button>
          <el-button
            type="info"
            icon="Edit"
            size="small"
            :disabled="row.level == 1 ? true : false"
            @click="updateMenu(row)"
          >
            编辑
          </el-button>
          <el-popconfirm
            :title="`你确定要删除${row.name}吗？`"
            @confirm="deleteMenu(row)"
          >
            <template #reference>
              <el-button
                icon="Delete"
                size="small"
                type="danger"
                :disabled="row.level == 1 ? true : false"
              >
                删除
              </el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="dialogVisible" title="Tips" width="500">
      <el-form>
        <el-form-item label="名称" label-width="50px">
          <el-input
            placeholder="请填写名称"
            v-model="menuParams.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="权限值">
          <el-input
            placeholder="请填写权限值"
            v-model="menuParams.code"
          ></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { addOrUpdateMenu, getAllPermisstion, removeMenu } from '@/api/acl/menu'
import {
  MenuParams,
  Permisstion,
  PermisstionList,
  PermisstionResponseData,
} from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
//所有菜单
let permisstionArr = ref<PermisstionList>()
//控制弹框
let dialogVisible = ref<boolean>(false)
//菜单数据
let menuParams = ref<MenuParams>({
  code: '', //权限数值
  level: 0, //几级菜单
  name: '', //菜单的名字
  pid: 0, //菜单的ID
})
//获取所有菜单数据
const getAllMenuList = async () => {
  let result: PermisstionResponseData = await getAllPermisstion()
  if (result.code == 200) {
    permisstionArr.value = result.data
  }
}
//添加菜单
const addMenu = (row: Permisstion) => {
  //清空数据
  Object.assign(menuParams.value, {
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0,
  })
  //对话框显示出来
  dialogVisible.value = true
  menuParams.value.level = row.level + 1
  menuParams.value.pid = row.id as number
}
//编辑菜单
const updateMenu = (row: Permisstion) => {
  dialogVisible.value = true
  Object.assign(menuParams.value, row)
}
//保存
const save = async () => {
  let result = await addOrUpdateMenu(menuParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: menuParams.value.id ? '修改成功' : '添加成功',
    })
    dialogVisible.value = false
    getAllMenuList()
  } else {
    ElMessage({
      type: 'error',
      message: menuParams.value.id ? '修改失败' : '添加失败',
    })
  }
}
//删除菜单
const deleteMenu = async (row: Permisstion) => {
  let result = await removeMenu(row.id as number)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    dialogVisible.value = false
    getAllMenuList()
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}
onMounted(() => {
  getAllMenuList()
})
</script>

<style scoped></style>
