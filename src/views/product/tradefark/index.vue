<template>
  <div>
    <el-card>
      <el-button
        type="primary"
        icon="Plus"
        style="margin-bottom: 10px"
        @click="addTradefark"
      >
        添加品牌
      </el-button>
      <el-table border style="width: 100%" :data="tradefarkData">
        <el-table-column
          label="序号"
          width="100px"
          align="center"
          type="index"
        />
        <el-table-column label="品牌名称" align="center">
          <template #="{ row, $index }">
            <h1>{{ row.tmName }}</h1>
          </template>
        </el-table-column>
        <el-table-column label="品牌LOGO" align="center">
          <template #="{ row, $index }">
            <img
              :src="row.logoUrl"
              alt="图片消失了..."
              style="width: 50px; height: 50px"
            />
          </template>
        </el-table-column>
        <el-table-column label="品牌操作" align="center">
          <template #="{ row, $index }">
            <el-button
              type="success"
              size="small"
              icon="Edit"
              @click="updataTradefark(row)"
            ></el-button>
            <el-popconfirm
              title="你确定要删除该已有品牌吗？"
              @confirm="removeTrademark(row.id)"
            >
              <template #reference>
                <el-button type="danger" size="small" icon="Delete"></el-button>
              </template>
            </el-popconfirm>
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
        v-model:current-page="pageNo"
        v-model:page-size="limit"
        :page-sizes="[3, 5, 7, 9]"
        :size="size"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total"
        style="margin-top: 10px"
        @size-change="handleSizeChange"
        @current-change="getTrademarkData"
      />
    </el-card>
    <!-- 对话框 -->
    <el-dialog
      v-model="dialogFormVisible"
      :title="trademarkParams.id ? '修改品牌' : '添加品牌'"
      width="500"
    >
      <el-form :model="trademarkParams" :rules="rules" ref="formRef">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input
            placeholder="请输入品牌名称"
            style="width: 80%"
            v-model="trademarkParams.tmName"
          ></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            action="/api/admin/product/fileUpload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkParams.logoUrl"
              :src="trademarkParams.logoUrl"
              class="avatar"
            />
            <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancle">取消</el-button>
          <el-button type="primary" @click="confirm">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from 'vue'
import type {
  TrademarkResponseData,
  Records,
  Trademark,
} from '@/api/product/tradefark/type'
import { getTrademark } from '@/api/product/tradefark'
import { addOrUpdateTrademark, deleteTrademark } from '@/api/product/tradefark'
import { ElMessage } from 'element-plus'
const pageNo = ref<number>(1) //current-page:当前页数
const limit = ref<number>(3) //page-size:每页显示的个数
let total = ref<number>(0) //共多少条
let tradefarkData = ref<Records>([]) //品牌数据
//获取form表单实例
let formRef = ref()
//新增或修改的数据
let trademarkParams = reactive<Trademark>({
  tmName: '',
  logoUrl: '',
})
let dialogFormVisible = ref(false)
//获取品牌数据
const getTrademarkData = async (pager = 1) => {
  //当前页码
  pageNo.value = pager
  const result: TrademarkResponseData = await getTrademark(
    pageNo.value,
    limit.value,
  )
  if ((result.code = 200)) {
    total.value = result.data.total
    tradefarkData.value = result.data.records
  }
}
onMounted(() => {
  getTrademarkData()
})
//修改每页显示的个数
const handleSizeChange = () => {
  getTrademarkData()
}
//添加品牌
const addTradefark = () => {
  dialogFormVisible.value = true
  trademarkParams.id = 0
  trademarkParams.tmName = ''
  trademarkParams.logoUrl = ''
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
//修改品牌
const updataTradefark = (row: Trademark) => {
  //将row中的属性赋值给trademarkParams
  Object.assign(trademarkParams, row)
  dialogFormVisible.value = true
}
//取消按钮
const cancle = () => {
  dialogFormVisible.value = false
}
//确定按钮
const confirm = async () => {
  //全部表单项校验
  await formRef.value.validate()
  //关闭弹窗
  dialogFormVisible.value = false
  const result = await addOrUpdateTrademark(trademarkParams)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败',
    })
  }
  getTrademarkData(pageNo.value)
  //清空校验规则错误信息
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
//上传头像成功的钩子
const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response: any,
  uploadFile: any,
) => {
  trademarkParams.logoUrl = response.data
  nextTick(() => {
    formRef.value.clearValidate()
  })
}
//上传文件前的钩子
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
  if (
    rawFile.type == 'image/jpeg' ||
    rawFile.type == 'image/png' ||
    rawFile.type == 'image/gif'
  ) {
    if (rawFile.size / 1024 / 1024 <= 4) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '图片大小必须小于4MB',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '图片格式必须是JPG/PNG/GIF',
    })
    return false
  }
}
//品牌名称的校验规则

const validatorTmName = (rule: any, value: any, callBack: any) => {
  if (value.length >= 2) {
    callBack()
  } else {
    callBack(new Error('品牌名称必须大于2位'))
  }
}
//品牌LOGO校验规则
const validatorLogoUrl = (rule: any, value: any, callBack: any) => {
  if (value) {
    callBack()
  } else {
    callBack(new Error('品牌LOGO必须上传'))
  }
}
//表单校验规则
const rules = {
  tmName: [
    {
      required: true,
      validator: validatorTmName,
      trigger: 'blur',
    },
  ],
  logoUrl: [
    {
      required: true,
      validator: validatorLogoUrl,
    },
  ],
}
//删除品牌确认按钮回调
const removeTrademark = async (id: number) => {
  let result: any = await deleteTrademark(id)
  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
  getTrademarkData(
    tradefarkData.value.length > 1 ? pageNo.value : pageNo.value - 1,
  )
}
</script>

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
