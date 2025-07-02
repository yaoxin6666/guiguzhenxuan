<template>
 <i class="el-icon-edit"></i>
<router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { login } from './api/user';
onMounted(()=>{
const user = login( {username: 'admin',password: '111111'})
console.log(user+'yaoxin' );

})
</script>

<style scoped></style>
