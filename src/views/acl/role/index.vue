<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入角色名称" v-model="roleName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="search"
            :disabled="roleName ? false : true"
          >
            搜索
          </el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addRole">添加角色</el-button>
      <el-table border style="margin: 10px 0" :data="roleInfoList">
        <el-table-column
          type="index"
          width="80px"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column label="id" align="center" prop="id"></el-table-column>
        <el-table-column
          label="角色名称"
          align="center"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          label="创建时间"
          align="center"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          label="更新时间"
          align="center"
          prop="updateTime"
        ></el-table-column>
        <el-table-column
          width="300px"
          label="操作"
          fixed="right"
          align="center"
        >
          <template #="{ row, $index }">
            <el-button
              icon="User"
              size="small"
              type="primary"
              @click="roleAssignments(row)"
            >
              分配权限
            </el-button>
            <el-button
              icon="Edit"
              size="small"
              type="warning"
              @click="updateRoleInfo(row)"
            >
              编辑
            </el-button>

            <el-popconfirm
              :title="`你确定要删除${row.name}吗？`"
              @confirm="deleteRole(row)"
            >
              <template #reference>
                <el-button icon="Delete" size="small" type="danger">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNO"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 20, 30]"
        size="default"
        background="background"
        layout=" prev, pager, next, jumper ,-> ,total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getRoleInfoList"
      />
    </el-card>
    <el-dialog
      v-model="dialogFormVisible"
      :title="roleParams.id ? '修改' : '新增'"
      width="500"
    >
      <el-form ref="form" :model="roleParams" :rules="rules">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleParams.roleName" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirm">确认</el-button>
        </div>
      </template>
    </el-dialog>

    <!-- 抽屉组件 -->
    <el-drawer v-model="drawer">
      <template #header>
        <h4>set title by slot</h4>
      </template>
      <template #default>
        <div>
          <!-- 树形控件 -->
          <el-tree
            ref="tree"
            style="max-width: 600px"
            :data="allMenuList"
            show-checkbox
            node-key="id"
            default-expand-all
            :props="defaultProps"
            :default-checked-keys="selectIdArr"
          />
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">取消</el-button>
          <el-button type="primary" @click="save">确认</el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from '@/store/modules/LayoutSetting'
import {
  addOrUpdateRole,
  getAllMenuList,
  getAllRoleList,
  removeRole,
  setPermisstion,
} from '@/api/acl/role'
import { nextTick, onMounted, ref } from 'vue'
import {
  MenuList,
  MenuResponseData,
  MunuData,
  RoleData,
  RoleResponseData,
} from '@/api/acl/role/type'
import { ElMessage } from 'element-plus'
//仓库
const layoutSettingStore = useLayoutSettingStore()
// 搜索的角色名
let roleName = ref<string>('')
//所有角色列表
let roleInfoList = ref<RoleData[]>([])
//第几页
let pageNO = ref<number>(1)
// 一页几条数据
let pageSize = ref<number>(5)
//总共几条数据
let total = ref<number>(0)
//弹框的显示隐藏
let dialogFormVisible = ref<boolean>(false)
//新增角色
let roleParams = ref<RoleData>({
  roleName: '',
})
//抽屉组件显示隐藏
let drawer = ref<boolean>(false)
//全部菜单
let allMenuList = ref<MenuList>([])
// 树形组件实例
let tree = ref()
//已选权限id
let selectIdArr = ref<number[]>([])
//form组件实例
let form = ref()
//搜索按钮
const search = () => {
  getRoleInfoList()
  roleName.value = ''
}
//label	指定节点标签为节点对象的某个属性值
// children	指定子树为节点对象的某个属性值
const defaultProps = {
  children: 'children',
  label: 'name',
}
// 重置按钮
const reset = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
}
//添加角色
const addRole = () => {
  Object.assign(roleParams.value, {
    id: 0,
    roleName: '',
  })
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
  dialogFormVisible.value = true
}

//分配权限
const roleAssignments = async (row: any) => {
  drawer.value = true
  Object.assign(roleParams.value, row)
  let result: MenuResponseData = await getAllMenuList(
    roleParams.value.id as number,
  )

  if (result.code == 200) {
    allMenuList.value = result.data
    selectIdArr.value = filterSelectId(allMenuList.value, [])
  }
}
const filterSelectId = (allData: any, initArr: any) => {
  allData.forEach((item: any) => {
    if (item.select && item.level == 4) {
      initArr.push(item.id)
    }
    if (item.children && item.children.length > 0) {
      filterSelectId(item.children, initArr)
    }
  })
  return initArr
}
//编辑
const updateRoleInfo = (row: any) => {
  Object.assign(roleParams.value, row)
  dialogFormVisible.value = true
  //清空上一次表单校验错误结果
  nextTick(() => {
    form.value.clearValidate('roleName')
  })
}
//删除
const deleteRole = async (row: any) => {
  let result = await removeRole(row.id as number)
  console.log(result)
  if (result.code == 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getRoleInfoList(roleInfoList.value.length>1?pageNO.value:pageNO.value -1)
  }else{
    ElMessage({ type: 'error', message: '删除失败' })
  }
}
//一页几条发生变换
const handleSizeChange = () => {
  getRoleInfoList()
}
//获取角色列表信息
const getRoleInfoList = async (pager = 1) => {
  pageNO.value = pager
  let result: RoleResponseData = await getAllRoleList(
    pageNO.value,
    pageSize.value,
    roleName.value,
  )

  roleInfoList.value = result.data.records
  total.value = result.data.total
}
//添加/修改角色
const confirm = async () => {
  let result = await addOrUpdateRole(roleParams.value)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: roleParams.value.id ? '修改成功' : '添加成功',
    })
    dialogFormVisible.value = false
    getRoleInfoList()
  } else {
    ElMessage({
      type: 'error',
      message: roleParams.value.id ? '修改失败' : '添加失败',
    })
  }
}
//权限分配确认回调
const save = async () => {
  const arr = tree.value.getCheckedKeys()
  const arr1 = tree.value.getHalfCheckedKeys()
  let arr2 = [...arr, ...arr1]
  let roleId = roleParams.value.id as number
  let result = await setPermisstion(roleId, arr2)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '权限分配成功',
    })
    drawer.value = false
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: '权限分配失败',
    })
  }
}
onMounted(() => {
  getRoleInfoList()
})

//自定义校验规则的回调
const validatorRoleName = (rule: any, value: any, callBack: any) => {
  if (value.trim().length >= 2) {
    callBack()
  } else {
    callBack(new Error('职位名称至少两位'))
  }
}
//职位校验规则
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
</script>

<style scoped>
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
