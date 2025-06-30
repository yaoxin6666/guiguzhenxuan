import SvgIcon from'./SvgIcon/index.vue'
import Pagination from './Pagination/index.vue'
const allGloablComponents:any = {SvgIcon,Pagination}
export default{
install(app:any){
Object.keys(allGloablComponents).forEach(key =>{
  app.component(key,allGloablComponents[key]);
})
}  
}

