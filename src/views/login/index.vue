<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form 
        class="login_form"
        :model="loginForm"
        :rules="rules"
        ref="ruleForm"
        >
          <h1>Hellow</h1>
          <h2>欢迎来到姚鑫甄选</h2>
          <el-form-item prop="username">
            <el-input
              type="text"
              :prefix-icon="User"
              v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <!--show-password 密码显示隐藏 -->
          <el-form-item prop="password"> 
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="login_btn" @click="login">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import useUSerStore from '@/store/modules/user'
import { useRouter,useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
const router=useRouter()
const userStore = useUSerStore()
const loginForm = ref({ username: '', password: '' })
//登录按钮加载
const loading = ref(false)
//登录校验的对象
const ruleForm= ref()
//路由对象
const $route = useRoute()
//登录
const login = async() => {
  //保证全部表单校验通过再发请求
 await ruleForm.value.validate()
  loading.value = true
  try {
    await userStore.userLogin(loginForm.value)
    let redirect:any = $route.query.redirect
    router.push({path:redirect||'/'})
    loading.value = false
    ElNotification({
      type:'success',
      message:getTime()+'好',
      title:'Hi,欢迎回来'
    })
  } catch (error) {
    ElNotification({
      type:'error',
      message:(error as Error).message
    })
    loading.value = false
  }
}
const validatorUsername = (rule:any, value:any, callback:any) =>{
// rule:表单校验规则
//value:表单文本内容
//callback:如果符合校验规则，callback放行
//不符合校验规则，返回错误信息
if(value.length>=5&&value.length<=10){
  callback()
}else{
  callback(new Error('账号长度为五到十位'))
}
}
const validatorPassword = (rule:any, value:any, callback:any) =>{
if(value.length>=6&&value.length<=10){
  callback()
}else{
  callback(new Error('密码长度为六到十位'))
}
}
const rules = {
  username:[
    { trigger: 'blur',validator:validatorUsername }
  ],
  password:[
    { trigger: 'blur',validator:validatorPassword }
  ]
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    padding: 40px;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
    h1 {
      font-size: 40px;
      color: white;
    }
    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }
    .login_btn {
      width: 100%;
    }
  }
}
</style>
