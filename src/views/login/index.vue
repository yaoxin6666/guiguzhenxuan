<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form">
          <h1>Hellow</h1>
          <h2>欢迎来到姚鑫甄选</h2>
          <el-form-item>
            <el-input 
            type="text" 
            :prefix-icon="User"
            v-model="loginForm.username"
            ></el-input>
          </el-form-item>
          <!--show-password 密码显示隐藏 -->
          <el-form-item>
            <el-input
              type="password"
              :prefix-icon="Lock"
              v-model="loginForm.password"
              show-password
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="login_btn">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue';
const loginForm = ref({username:'',password:''})
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
    padding: 40px ;
    background: url('@/assets/images/login_form.png');
    background-size: cover;
h1{
  font-size: 40px;
  color: white;
}
h2{
  font-size: 20px;
  color: white;
  margin: 20px 0;
}
.login_btn{
  width: 100%;
}
  }
}
</style>
