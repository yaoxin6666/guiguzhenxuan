<template>
  <div>
    <el-card>
      <el-table border :data="HasSku">
        <el-table-column
          type="index"
          align="center"
          width="80px"
          label="序号"
        ></el-table-column>
        <el-table-column
          label="名称"
          width="150px"
          prop="skuName"
        ></el-table-column>
        <el-table-column
          label="描述"
          width="150px"
          prop="skuDesc"
        ></el-table-column>
        <el-table-column label="默认图片" width="150px">
          <template #="{ row, $index }">
            <el-image :src="row.skuDefaultImg"></el-image>
          </template>
        </el-table-column>
        <el-table-column
          label="重量（g）"
          width="150px"
          prop="weight"
        ></el-table-column>
        <el-table-column
          label="价格（元）"
          width="150px"
          prop="price"
        ></el-table-column>
        <el-table-column label="操作" fixed="right" width="250px">
          <template #="{ row, $index }">
            <el-button
              type="info"
              :icon="row.isSale == 1 ? 'Top' : 'Bottom'"
              size="small"
              @click="onOrCancelSale(row)"
            ></el-button>
            <el-button type="primary" icon="Edit" size="small"></el-button>
            <el-button
              type="info"
              icon="InfoFilled"
              size="small"
              @click="updateSku(row)"
            ></el-button>
 <el-popconfirm title="你确定要删除吗？"  @confirm="removeSku(row)">
    <template #reference>
      <el-button type="primary" icon="Delete" size="small"></el-button>
    </template>
  </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-drawer v-model="drawer">
        <template #header>查看商品详情</template>
        <template #default>
          <el-row>
            <el-col :span="8">名称</el-col>
            <el-col :span="16">{{ skuInfoData.skuName }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">描述</el-col>
            <el-col :span="16">{{ skuInfoData.skuDesc }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">价格</el-col>
            <el-col :span="16">{{ skuInfoData.price }}</el-col>
          </el-row>
          <el-row>
            <el-col :span="8">平台属性</el-col>
            <el-col :span="16">
              <el-tag
                v-for="(item, index) in skuInfoData.skuAttrValueList"
                :key="item.attrId"
                style="margin: 5px 5px"
              >
                {{ item.attrName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">销售属性</el-col>
            <el-col :span="16">
              <el-tag
                v-for="(item, index) in skuInfoData.skuSaleAttrValueList"
                :key="item.id"
                style="margin: 5px 5px"
              >
                {{ item.saleAttrValueName }}
              </el-tag>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">商品图片</el-col>
            <el-col :span="16">
              <el-carousel :interval="4000" type="card" height="200px">
                <el-carousel-item v-for="(item,index) in skuInfoData.skuImageList" :key="item.id">
                 <el-image :src="item.imgUrl" :alt="item.imgName"></el-image>
                </el-carousel-item>
              </el-carousel>
            </el-col>
          </el-row>
        </template>
        <template #footer></template>
      </el-drawer>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        size="small"
        :background="true"
        layout="prev, pager, next, jumper,->,total, sizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="getSku"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { getHasSku, onSale, cancelSale, getSkuInfo, deleteSku } from '@/api/product/sku'
import { SkuData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
//当前页数
let pageNo = ref<number>(1)
//每页几条数据
let pageSize = ref<number>(10)
//总共几条数据
let total = ref<number>(0)
//已有sku
let HasSku = ref<SkuData[]>([])
//控制抽屉
let drawer = ref<boolean>(false)
//存储sku信息
let skuInfoData = ref<SkuData>({})
//获取已有sku
const getSku = async (pager = 1) => {
  pageNo.value = pager
  let result = await getHasSku(pageNo.value, pageSize.value)
  HasSku.value = result.data.records
  total.value = result.data.total
}
onMounted(() => {
  getSku()
})
//分页器一页几条数据发生改变
const handleSizeChange = () => {
  getSku()
}
const onOrCancelSale = async (row: SkuData) => {
  if (row.isSale == 1) {
    let result = await cancelSale(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '下架成功',
      })
      getSku(pageNo.value)
    } else {
      ElMessage({
        type: 'error',
        message: '下架失败',
      })
    }
  } else {
    let result = await onSale(row.id as number)
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '上架成功',
      })
      getSku(pageNo.value)
    } else {
      ElMessage({
        type: 'error',
        message: '上架失败',
      })
    }
  }
}

//跟新已有sku
const updateSku = async (row: SkuData) => {
  drawer.value = true
  let result = await getSkuInfo(row.id as number)
  skuInfoData.value = result.data
}
//删除已有sku

const removeSku = async(row:SkuData)=>{
let result = await deleteSku((row.id as number))
    if (result.code == 200) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getSku(HasSku.value.length>1?pageNo.value:pageNo.value - 1)
    } else {
      ElMessage({
        type: 'error',
        message: '删除失败',
      })
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
