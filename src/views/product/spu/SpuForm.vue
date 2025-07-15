<template>
  <div>
    <el-card style="margin-top: 10px">
      <el-form label-width="100px">
        <el-form-item label="SPU名称">
          <el-input placeholder="请你输入SPU名称" v-model="spuParams.spuName"></el-input>
        </el-form-item>
        <el-form-item label="SPU品牌">
          <el-select style="width: 200px" v-model="spuParams.tmId">
            <el-option v-for="(item, index) in allTrademark" :key="item.id" :label="item.tmName"
              :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="SPU描述">
          <el-input type="textarea" placeholder="请输入描述" v-model="spuParams.description"></el-input>
        </el-form-item>
        <el-form-item label="SPU照片">
          <el-upload v-model:file-list="image" action="/api/admin/product/fileUpload" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="neforeHandle">
            <el-icon>
              <Plus />
            </el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img w-full :src="dialogImageUrl" alt="Preview Image" style="height: 100%; width: 100%" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="SPU销售属性">
          <el-select v-model="unSaleAttrIdOrName" style="width: 200px" :placeholder="unSelectSaleAttr.length
              ? `还有${unSelectSaleAttr.length}项未选择`
              : '无'
            ">
            <el-option v-for="(item, index) in unSelectSaleAttr" :key="item.id" :label="item.name"
              :value="`${item.id},${item.name}`"></el-option>
          </el-select>
          <el-button @click="addSaleAttr" :disabled="!unSaleAttrIdOrName" type="primary" icon="Plus"
            style="margin-left: 10px">
            添加销售属性
          </el-button>
          <el-table border style="margin: 10px 0" :data="spuSaleAttr">
            <el-table-column label="序号" type="index" align="center" width="100px"></el-table-column>
            <el-table-column label="属性名" width="120px" prop="saleAttrName"></el-table-column>
            <el-table-column label="属性值">
              <template #="{ row, $index }">
                <el-tag v-for="(item, index) in row.spuSaleArttrValueList" :key="item.id" style="margin: 0 5px" closable @close="row.spuSaleArttrValueList.splice($index,1)">
                  {{ item.saleAttrValueName }}
                </el-tag>
                <el-input ref="input" @blur="toLook(row)" v-model="row.NewsaleAttrValueName" v-if="row.flag == true" size="small" placeholder="请输入属性值名称" type="text"
                  style="width: 120px; margin: 0 5px"></el-input>
                <el-button @click="toEdit(row)" v-else type="primary" icon="Plus" size="small"></el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
              <template #="{ row, $index }">
                <el-button type="danger" icon="Delete" size="small" @click="spuSaleAttr.splice($index, 1)"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancle">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import type { SpuData } from '@/api/product/spu/type'
import {
  spuHasSaleAttr,
  getAlltrademark,
  allSaleAttr,
  getImage,
  addOrUpdateSpu,
} from '@/api/product/spu/index'
import type {
  AllTrademark,
  spuHasImage,
  saleAttrResponseData,
  hasSaleAttrResponseData,
  Trademark,
  spuImg,
  saleAttr,
  hasSaleAttr,
} from '@/api/product/spu/type'
import { ref, computed, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import useCategoryStore from '@/store/modules/category'
const categoryStore = useCategoryStore()
//spu数据
let spuParams = ref<SpuData>({
  spuName: '',
  description: '',
  category3Id: '',
  tmId: '',
  spuSaleAttrList: [],
  spuImageList: [],
})
//输入框组件实例
let input = ref()
//还未添加的销售属性的属性名和id
let unSaleAttrIdOrName = ref('')
//显示框的图片地址
let dialogImageUrl = ref('')
//控制照片查看显示隐藏
let dialogVisible = ref(false)
//全部品牌数据
let allTrademark = ref<Trademark[]>([])
//图片数据
let image = ref<spuImg[]>([])
//spu下的全部已有的销售属性
let spuSaleAttr = ref<saleAttr[]>([])
//整个项目全部的销售属性
let SaleAttr = ref<hasSaleAttr[]>([])
//还未选择的销售属性
let unSelectSaleAttr = computed(() => {
  let unSelectArr = SaleAttr.value.filter((item) => {
    return spuSaleAttr.value.every((item1) => {
      return item.name != item1.saleAttrName
    })
  })
  return unSelectArr
})
const $emit = defineEmits(['changeToggle'])
//点击取消返回主页面
const cancle = () => {
  $emit('changeToggle',{flag:0,params:spuParams.value.id?'update':'add'})
}
//点击保存
const save = async()=>{
spuParams.value.spuImageList=image.value.map((item:any)=>{
  return {
    imgName:item.name,
    imgUrl: (item.response && item.response.data)||item.url
  }
})
spuParams.value.spuSaleAttrList = spuSaleAttr.value
let result = await  addOrUpdateSpu(spuParams.value)
console.log(result);
if(result.code == 200){
  ElMessage({
    type:'success',
    message:spuParams.value.id?'修改成功':'添加成功'
  })

}else{
   ElMessage({
    type:'error',
    message:spuParams.value.id?'修改失败':'添加失败'
  })

}
    $emit('changeToggle',{flag:0,params:spuParams.value.id?'update':'add'})
}
//发送请求，获取某个已有的spu的数据
const getTrademark = async (row: SpuData) => {

  if (row) {
    spuParams.value = row;
  }
  //获取全部品牌数据
  const result: AllTrademark = await getAlltrademark()

  allTrademark.value = result.data
}

//获取图片
const getSpuImage = async (id: number) => {
  //获取某个商品对应的图片
  const result: spuHasImage = await getImage(id as number)
  //spu对应商品图片
  image.value = result.data.map((item) => {
    return {
      name: item.imgName,
      url: item.imgUrl,
    }
  })
}
//获取某个spu下的全部已有的销售属性接口
const getAllSaleAttr = async (id: number) => {
  const result: saleAttrResponseData = await spuHasSaleAttr(id as number)
  spuSaleAttr.value = result.data
}
//获取整个项目全部的销售属性【颜色、版本、尺码】
const getHasSaleAttr = async () => {
  const result: hasSaleAttrResponseData = await allSaleAttr()
  SaleAttr.value = result.data
}
//点击文件列表中已上传的文件时的钩子
const handlePictureCardPreview = (file: any) => {
  dialogVisible.value = true
  dialogImageUrl.value = file.url
}
//文件列表移除文件时的钩子
const handleRemove = () => {
  ElMessage({
    type: 'success',
    message: '删除图片成功',
  })
}
//上传文件之前的钩子，参数为上传的文件， 若返回false或者返回 Promise 且被 reject，则停止上传。
const neforeHandle = (file: any) => {
  if (
    file.type == 'image/jpeg' ||
    file.type == 'image/png' ||
    file.type == 'image/gif'
  ) {
    if (file.size / 1024 / 1024 < 3) {
      return true
    } else {
      ElMessage({
        type: 'error',
        message: '图片大小不能超过3m',
      })
      return false
    }
  } else {
    ElMessage({
      type: 'error',
      message: '图片格式必须是PNG|JPG|GIF',
    })
    return false
  }
}
//添加销售属性
const addSaleAttr = () => {
  const [baseSaleAttrId, saleAttrName] = unSaleAttrIdOrName.value.split(',')
  let newSaleAttr: saleAttr = {
    saleAttrName,
    baseSaleAttrId,
    spuSaleArttrValueList: [],
  }
  //追加到已有销售属性中
  spuSaleAttr.value.push(newSaleAttr)
  //清楚已选择销售属性
  unSaleAttrIdOrName.value = ''
}
//点击button ，显示文本框 
const toEdit = (row:saleAttr,) =>{
row.flag = true
console.log();

nextTick(()=>{
input.value.focus()
})
}
//输入框失焦回调
const toLook = (row:saleAttr)=>{
  console.log(row);
  
  const {NewsaleAttrValueName,baseSaleAttrId} = row
  let newSaleAttr = {
    baseSaleAttrId:(baseSaleAttrId as number),
    saleAttrValueName:(NewsaleAttrValueName as string)
  }
  //错误处理
  if(row.NewsaleAttrValueName?.trim()==''||row.NewsaleAttrValueName == undefined) {
    ElMessage({
      type:'error',
      message:'属性值不能为空'
    })
    return
  }

  let repact = row.spuSaleArttrValueList.find((item)=>{
    return item.saleAttrValueName == row.NewsaleAttrValueName
  })
  //属性值重复
  if(repact) {
    ElMessage({
      type:'error',
      message:'属性值不能重复'
    })
    return
  }
  row.spuSaleArttrValueList.push(newSaleAttr)
  row.flag = false
}
//初始化spu参数
const initSpuParams = async() => {
     //清空数据
    Object.assign(spuParams.value, {
        category3Id: "",//收集三级分类的ID
        spuName: "",//SPU的名字
        description: "",//SPU的描述
        tmId: '',//品牌的ID
        spuImageList: [],
        spuSaleAttrList: [],
    });
    //清空照片
    image.value = [];
    //清空销售属性
    spuSaleAttr.value = [];
    unSaleAttrIdOrName.value  = '';
    //存储三级分类的ID
    spuParams.value.category3Id = categoryStore.category3Id;
    //获取全部品牌的数据
    let result: AllTrademark = await getAlltrademark();
    let result1: hasSaleAttrResponseData = await allSaleAttr();
    //存储数据
    allTrademark.value = result.data;
    SaleAttr.value = result1.data;
}
defineExpose({
  getTrademark,
  getSpuImage,
  getAllSaleAttr,
  getHasSaleAttr,
  initSpuParams,
})
</script>

<style scoped></style>
