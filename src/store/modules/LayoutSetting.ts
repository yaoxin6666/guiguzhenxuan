import { defineStore } from "pinia";
//用户控制菜单折叠
const useLayoutSettingStore = defineStore('layoutSetting',{
state:() =>{
return {
  fold:false
}
},
})
export default useLayoutSettingStore
