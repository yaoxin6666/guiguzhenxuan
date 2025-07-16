<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin: 10px 0">
      <el-button type="primary" @click="addUser">添加</el-button>
      <el-button type="danger">删除</el-button>
      <el-table border style="margin: 10px 0" :data="userInfoList">
        <el-table-column
          type="selection"
          width="80px"
          align="center"
        ></el-table-column>
        <el-table-column
          type="index"
          width="80px"
          align="center"
          label="序号"
        ></el-table-column>
        <el-table-column
          width="150px"
          label="id"
          align="center"
          prop="id"
        ></el-table-column>
        <el-table-column
          width="150px"
          label="用户名字"
          align="center"
          prop="username"
        ></el-table-column>
        <el-table-column
          width="150px"
          label="用户名称"
          align="center"
          prop="name"
        ></el-table-column>
        <el-table-column
          width="150px"
          label="用户角色"
          align="center"
          prop="roleName"
        ></el-table-column>
        <el-table-column
          width="150px"
          label="创建时间"
          align="center"
          prop="createTime"
        ></el-table-column>
        <el-table-column
          width="150px"
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
            <el-button icon="User" size="small" type="primary" @click="roleAssignments(row)">分配角色</el-button>
            <el-button
              icon="Edit"
              size="small"
              type="warning"
              @click="updateUserInfo(row)"
            >编辑</el-button>
            <el-button icon="Delete" size="small" type="danger">删除</el-button>
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
        @current-change="getUserInfoList"
      />
    </el-card>
    <el-drawer v-model="drawer">
      <template #header class="drawer_header">添加用户</template>
      <template #default>
        <el-form
          label-width="100px"
          :rules="rules"
          ref="ruleForm"
          :model="userParams"
        >
          <el-form-item label="用户姓名" prop="name">
            <el-input
              placeholder="请输入用户名字"
              v-model="userParams.name"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" prop="username">
            <el-input
              placeholder="请输入用户昵称"
              v-model="userParams.username"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户密码" prop="password" v-show="!userParams.id">
            <el-input
              placeholder="请输入用户密码"
              v-model="userParams.password"
            ></el-input>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer1">
      <template #header>分配角色(职位)</template>
      <template #default>
        <el-form>
<el-form-item>
  <el-input disabled="disabled" v-model="roleInput"></el-input>
</el-form-item>
<el-form-item>
    <el-checkbox
    v-model="checkAll"
    :indeterminate="isIndeterminate"
    @change="handleCheckAllChange"
  >
   全选
  </el-checkbox>
 
</el-form-item>
<el-form-item>
 <el-checkbox-group
    v-model="checkedRole"
    @change="handleCheckedCitiesChange"
  >
    <el-checkbox v-for="(item,index) in allRole" :key="index" :label="item" :value="item">
      {{ item }}
    </el-checkbox>
  </el-checkbox-group>
</el-form-item>
        </el-form>
      </template>
      <template #footer>
                <el-button type="primary" >保存</el-button>
        <el-button >取消</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import { addOrUpdateUserInfo, getUserList } from '@/api/acl/user'
import { Records, User, UserResponseData } from '@/api/acl/user/type'
import { ElMessage } from 'element-plus'
//第几页
let pageNO = ref<number>(1)
// 一页几条数据
let pageSize = ref<number>(5)
//总共几条数据
let total = ref<number>(0)
//用户信息列表
let userInfoList = ref<Records>([])
//控制抽屉组件
let drawer = ref<boolean>(false)
//收集用户数据
let userParams = reactive<User>({
  username: '',
  name: '',
  password: '',
})
//表单实例
let ruleForm = ref()
//分配角色抽屉开关
let drawer1 = ref<boolean>(false)
//分配角色input
let roleInput = ref<string>('')
//全选框
let checkAll = ref<boolean>(false)
//设置不确定状态，仅负责样式控制
const isIndeterminate = ref(true)
//全部职位
const allRole = ref<string[]>(['1','2','3','4'])
//已选职位
const checkedRole = ref<string[]>([])
const handleSizeChange = () => {
  getUserInfoList()
}
//获取用户信息
const getUserInfoList = async (pager = 1) => {
  pageNO.value = pager
  let result: UserResponseData = await getUserList(pageNO.value, pageSize.value)
  userInfoList.value = result.data.records
  total.value = result.data.total
}
//添加用户
const addUser = () => {
  drawer.value = true

  Object.assign(userParams, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  nextTick(() => {
    ruleForm.value.clearValidate('username')
    ruleForm.value.clearValidate('password')
    ruleForm.value.clearValidate('name')
  })
}

//修改用户信息
const updateUserInfo = async (row: User) => {
  drawer.value = true
  Object.assign(userParams, row)
    nextTick(() => {
    ruleForm.value.clearValidate('username')
    ruleForm.value.clearValidate('name')
  })
}
//保存
const save = async () => {
  let result = await addOrUpdateUserInfo(userParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: userParams.id ? '修改成功' : '添加成功',
    })
    getUserInfoList(userParams.id?pageNO.value:1)
    //浏览器自动刷新
    window.location.reload()
  } else {
    ElMessage({
      type: 'error',
      message: userParams.id ? '修改失败' : '添加失败',
    })
  }
  drawer.value = false
}
//取消按钮
const cancel = () => {
  drawer.value = false
}
//角色分配
const roleAssignments = (row:User)=>{
  drawer1.value = true
roleInput.value = row.username
}

const handleCheckAllChange = (val:string) => {
 checkedRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
const handleCheckedCitiesChange = (value:string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount <allRole.value.length
}
onMounted(() => {
  getUserInfoList()
})

const validatorUsername = (rule: any, value: any, callback: any) => {
  // rule:表单校验规则
  //value:表单文本内容
  //callback:如果符合校验规则，callback放行
  //不符合校验规则，返回错误信息
  if (value.length >= 5 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('用户昵称长度为五到十位'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length >= 6 && value.length <= 10) {
    callback()
  } else {
    callback(new Error('密码长度为六到十位'))
  }
}
const validatorname = (rule: any, value: any, callback: any) => {
  if (value.length >= 2 && value.length <= 5) {
    callback()
  } else {
    callback(new Error('名字长度为二到五位'))
  }
}

const rules = {
  username: [{ trigger: 'blur', validator: validatorUsername }],
  password: [{ trigger: 'blur', validator: validatorPassword }],
  name: [{ trigger: 'blur', validator: validatorname }],
}
</script>

<style scoped lang="less">
.form {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.drawer_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
