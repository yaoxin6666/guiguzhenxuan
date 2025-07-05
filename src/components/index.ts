import SvgIcon from'./SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
import Category from'./Category/index.vue'
//注册所有图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const allGloablComponents:any = {SvgIcon,Pagination,Category}
export default{
install(app:any){
Object.keys(allGloablComponents).forEach(key =>{
  app.component(key,allGloablComponents[key]);
})
//注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
}  
}

