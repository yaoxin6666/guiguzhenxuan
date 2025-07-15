<template>
  <div>
    <el-card style="margin-top: 10px">
      <el-form label-width="100px">
        <el-form-item label="SKU名称">
          <el-input placeholder="SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
          <el-input placeholder="价格(元)" type="number" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(g)">
          <el-input placeholder="重量(g)" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
          <el-input placeholder="SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
          <el-form :inline="true" label-width="100px">
            <el-form-item
              v-for="(item, index) in attrInfoList"
              :label="item.attrName"
              :key="item.id"
              style="margin-top: 10px;"
            >
              <el-select style="width: 150px" v-model="item.attrIdAndValueId">
                <el-option
                  v-for="(attrValue, index) in item.attrValueList"
                  :key="attrValue.id"
                  :label="attrValue.valueName"
                  :value="`${item.id},${attrValue.id}`"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
          <el-form :inline="true" label-width="100px"   style="margin-top: 10px;">
            <el-form-item
          
              v-for="(item, index) in spuSaleAttr"
              :key="item.id"
              :label="item.saleAttrName"
            >
              <el-select style="width: 150px"   v-model="item.saleIdAndValueId">
                <el-option
                  v-for="(
                    spuSaleArttrValue, index
                  ) in item.spuSaleAttrValueList"
                  :key="spuSaleArttrValue.id"
                  :label="spuSaleArttrValue.saleAttrValueName"
                  :value="`${item.id},${spuSaleArttrValue.id}`"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
          <el-table border :data="image" ref="table">
            <el-table-column
              type="selection"
              width="80px"
              align="center"
            ></el-table-column>
            <el-table-column label="图片">
              <template #="{ row, $index }">
                <el-image :src="row.imgUrl"></el-image>
              </template>
            </el-table-column>
            <el-table-column label="名称">
              <template #="{ row, $index }">
                <span>{{ row.imgName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template #="{ row, $index }">
                <el-button type="info" @click="handler(row)">设为默认</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button @click="cancel">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { getAttrInfoList } from '@/api/product/attr'
import { addSku, getImage, spuHasSaleAttr } from '@/api/product/spu/index'
import {
  saleAttr,
  saleAttrResponseData,
  SkuData,
  spuHasImage,
  spuImg,
} from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import { ElMessage } from 'element-plus'
const categoryStore = useCategoryStore()
let $emit = defineEmits(['changeToggle'])

let skuParams = reactive<SkuData>({
  //父组件传递过来的数据
  "category3Id": "", //三级分类的ID
  "spuId": "", //已有的SPU的ID
  "tmId": "", //SPU品牌的ID

  //v-model收集
  "skuName": "", //sku名字
  "price": "", //sku价格
  "weight": "", //sku重量
  "skuDesc": "", //sku的描述

  "skuAttrValueList": [ //平台属性的收集
  ],
  "skuSaleAttrValueList": [ //销售属性
  ],
  "skuDefaultImg": "",
  id: 0
})
//获取table组件实例
let table = ref<any>();
let attrInfoList = ref<any[]>([]) //获取的属性值对象
//图片数据
let image = ref<spuImg[]>([])
//spu下的全部已有的销售属性
let spuSaleAttr = ref<saleAttr[]>([])
const cancel = () => {
  $emit('changeToggle', { flag: 0, params: '' })
}
const getAttrInfo = async () => {


  let result = await getAttrInfoList(
    categoryStore.category1Id,
    categoryStore.category2Id,
    categoryStore.category3Id,
  )
  attrInfoList.value = result.data
}
//获取某个spu下的全部已有的销售属性接口
const getAllSaleAttr = async (id: number) => {


  const result: saleAttrResponseData = await spuHasSaleAttr(id as number)
  spuSaleAttr.value = result.data
}
//获取图片
const getSpuImage = async (id: number) => {


  //获取某个商品对应的图片
  const result: spuHasImage = await getImage(id as number)
  //spu对应商品图片
  image.value = result.data
}

//保存按钮
const save = async () => {
  console.log(image.value);
  
    //整理参数
    //平台属性
    skuParams.skuAttrValueList = attrInfoList.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(',');
            prev.push({
                attrId,
                valueId
            })
        }
        return prev;
    }, []);
    //销售属性
    skuParams.skuSaleAttrValueList = spuSaleAttr.value.reduce((prev: any, next: any) => {
        if (next.saleIdAndValueId) {
            let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(',');
            prev.push({
                saleAttrId, saleAttrValueId
            })
        }
        return prev;
    }, []);
    //添加SKU的请求
    let result: any = await addSku(skuParams);
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        });
        //通知父组件切换场景为零
       
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    }
 $emit('changeToggle',{flag:0,params:''})
}
const handler = (row: any) => {
    //点击的时候,全部图片的的复选框不勾选
    image.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false);
    });
    //选中的图片才勾选
    table.value.toggleRowSelection(row, true);
    //收集图片地址
    skuParams.skuDefaultImg = row.imgUrl;
}
defineExpose({
  getAttrInfo,
  getSpuImage,
  getAllSaleAttr,
})
</script>

<style scoped></style>
