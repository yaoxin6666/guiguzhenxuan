<template>
  <div>
    <Category :toggle="toggle"></Category>
    <el-card style="margin-top: 10px">
      <div v-show="toggle == 0">
        <el-button
          type="primary"
          icon="Plus"
          :disabled="!categoryStore.category3Id"
          @click="addAttr"
        >
          添加平台属性
        </el-button>
        <el-table
          style="margin-top: 10px"
          :data="attrInfoList"
          border
          stripe
          size="large"
        >
          <el-table-column
            prop="序号"
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column
            label="属性名称"
            width="120px"
            prop="attrName"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-tag v-for="(item, index) in row.attrValueList" :key="item.id" style="margin-left: 5px;">
                {{ item.valueName }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template #="{ row, $index }">
              <el-button
                type="success"
                icon="Edit"
                size="small"
                @click="updataAttr(row)"
              ></el-button>

              <el-popconfirm :title="`你确定要删除${row.attrName}吗？`"@confirm="deleteAttr(row.id)">
                <template #reference >
                  <el-button type="danger" icon="Delete" size="small" />
                </template>
              </el-popconfirm>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="toggle == 1">
        <el-form label-width="100px">
          <el-form-item label="属性名称">
            <el-input
              placeholder="请输入属性名称"
              style="width: 150px"
              v-model="attrParams.attrName"
            ></el-input>
          </el-form-item>
        </el-form>
        <el-button
          type="primary"
          icon="Plus"
          @click="addAttrValue"
          :disabled="!attrParams.attrName"
        >
          添加属性值
        </el-button>
        <el-button type="primary" @click="cancle">取消</el-button>
        <el-table
          border
          style="margin: 10px 0"
          :data="attrParams.attrValueList"
        >
          <el-table-column
            label="序号"
            type="index"
            align="center"
            width="80px"
          ></el-table-column>
          <el-table-column label="属性值名称">
            <template #="{ row, $index }">
              <el-input
                :ref="(vc:any)=>inputArr[$index]=vc"
                @blur="toLook(row, $index)"
                v-if="row.flag"
                v-model="row.valueName"
                placeholder="请输入属性值名称"
              ></el-input>
              <span v-else @click="toEdit(row, $index)">
                {{ row.valueName }}
              </span>
            </template>
          </el-table-column>

          <el-table-column label="属性值操作">
            <template #="{ row, $index }">
              <el-button
                type="danger"
                size="small"
                icon="Delete"
                @click="attrParams.attrValueList.splice($index, 1)"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button
          type="primary"
          @click="saveAttr"
          :disabled="attrParams.attrValueList.length > 0 ? false : true"
        >
          保存
        </el-button>
        <el-button type="primary" @click="cancle">取消</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive,onBeforeUnmount, nextTick } from 'vue'
import useCategoryStore from '@/store/modules/category'
import { Attr, AttrResponseData, AttrValue } from '@/api/product/attr/type'
import { addOrUpdataAttr, removeAttr } from '@/api/product/attr'
import { ElMessage } from 'element-plus'
let toggle = ref<number>(0) //切换按钮
const attrInfoList = ref<Attr[]>() //获取的属性值对象
const inputArr = ref<any>([])
const categoryStore = useCategoryStore()
//收集新增属性的数据
let attrParams = reactive<Attr>({
  attrName: '', //新增属性值名字
  attrValueList: [],
  //新增属性值数组
  categoryId: '', //三级分类id
  categoryLevel: 3, //几级分类
})
//获取已有属性值
watch(
  () => categoryStore.category3Id,
  async () => {
    if (!categoryStore.category3Id) return
    const result: AttrResponseData = await categoryStore.getAttrInfoList()
    if (result.code == 200) {
      attrInfoList.value = result.data
    }
  },
)
//取消按钮
const cancle = () => {
  toggle.value = 0
}
//添加属性
const addAttr = () => {
  toggle.value = 1
  //每次点击先清空数据
  Object.assign(attrParams, {
    attrName: '', //新增属性值名字
    attrValueList: [], //新增属性值数组
    categoryId: categoryStore.category3Id, //三级分类id
    categoryLevel: 3, //几级分类
  })
}
//添加属性值
const addAttrValue = () => {
  attrParams.attrValueList.push({
    valueName: '',
    flag: true,
  })
  nextTick(() => {
    //nextTick:响应式数据发生变化，获取更新后的dom/组件实例
    inputArr.value[attrParams.attrValueList.length - 1].focus()
  })
}
//保存按钮
const saveAttr = async () => {
  toggle.value = 0 //切换
  const result: any = await addOrUpdataAttr(attrParams)

  if (result.code == 200) {
    ElMessage({
      type: 'success',
      message: attrParams.id ? '修改成功' : '添加成功',
    })
    await categoryStore.getAttrInfoList()
  } else {
    ElMessage({
      type: 'error',
      message: attrParams.id ? '修改失败' : '添加失败',
    })
  }
}
//属性值表单元素失去焦点
const toLook = (row: AttrValue, $index: number) => {
  if (row.valueName.trim() == '') {
    //删除属性值为空的
    attrParams.attrValueList.splice($index, 1)
    ElMessage({
      type: 'error',
      message: '属性值名称不能为空',
    })
    return
  }
  let repeat = attrParams.attrValueList.find((item) => {
    if (item != row) {
      return item.valueName == row.valueName
    }
  })
  if (repeat) {
    ElMessage({
      type: 'error',
      message: '属性值不能重复',
    })
    return
  }
  row.flag = false //失去焦点切换为文本显示
}
//文本被点击的事件回调
const toEdit = (row: AttrValue, $index: number) => {
  row.flag = true //点击切换为编辑显示
  nextTick(() => {
    //nextTick:响应式数据发生变化，获取更新后的dom/组件实例
    inputArr.value[$index].focus()
  })
}
//修改属性值
const updataAttr = (row: Attr) => {
  toggle.value = 1
  //深拷贝已有属性对象给attrParams
  Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}
//删除已有数据
const deleteAttr = async(id:number) =>{
let result = await removeAttr(id)
if(result.code ==200){
  ElMessage({
    type:'success',
    message:'删除成功'
  })
 await categoryStore.getAttrInfoList()
}else{
   ElMessage({
    type:'error',
    message:'删除失败'
  })
}

}
//组件销毁时，删除仓库数据
onBeforeUnmount(()=>{
  categoryStore.$reset
})
</script>

<style scoped></style>
