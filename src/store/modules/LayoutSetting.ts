import { defineStore } from "pinia";
//用户控制菜单折叠
const useLayoutSettingStore = defineStore('layoutSetting',{
state:() =>{
return {
  fold:false,//控制左侧菜单是否折叠
  refresh:true//控制是否刷新页面
}
},
})
export default useLayoutSettingStore
