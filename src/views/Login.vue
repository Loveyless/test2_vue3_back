<template>

  <div class="login-container">
    <el-form ref="formRef" :model="loginForm" class="login-form" :rules="loginRules">

      <div class="title-container">
        <h6 class="title">v:loveyless</h6>
        <h3 class="title">{{ $t('login.title') }}</h3>
      </div>

      <el-form-item prop="name">
        <el-icon :size="20" class="svg-container">
          <avatar />
        </el-icon>
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>

      
      <el-form-item prop="password">
        <el-icon :size="20" class="svg-container">
          <avatar />
        </el-icon>
        <el-input  @keyup.enter="loginHandle" type="password" v-model="loginForm.password"></el-input>
      </el-form-item>

      <el-button @click="loginHandle" type="primary" class="login-button">{{ $t('login.btnTitle') }}</el-button>

    </el-form>


  </div>

</template>

<script setup>
import { reactive, ref } from "vue";
import {Avatar,View } from "@element-plus/icons-vue"
import axios from "@/axios"
import { useStore } from "vuex"; //没用
import router from '@/router'
import {setTokenTime} from "@/utils/auth.js"

const store = useStore() //没用


// 登录需要的数据
const loginForm = reactive({
  username: "admin",
  password:"123456"
});

//表单验证
const loginRules = reactive({
  username:{
    type:"string",
    require:true,
    message:"Please select Activity zone", //提示语
    trigger:"blur" //触发条件
  },
  password:{
    type:"string",
    require:true,
    message:"Please select Activity zone", //提示语
    trigger:"blur" //触发条件
  },
})

const formRef = ref(null);
//登录事件
const loginHandle = ()=>{
  formRef.value.validate(async (valid) => {
    if (valid) {
      //发送请求
      const data = await axios.post("/login",loginForm)
      console.log("登录请求",data);
      if(data.meta.status == 200){
        // localStorage.setItem("token",data.status)
        localStorage.setItem("token",data.data.token)
        setTokenTime() //设置token超时时间
        //编程导航
        router.push("/layout")
      }
    } else {
      console.log('error submit!!');
      return false;
    }
  })
}


</script> 

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    ::v-deep .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    ::v-deep .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent ;
        border: 0px ;
        -webkit-appearance: none;
        border-radius: 5px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        width: 480px;
        caret-color: $cursor;
      }
    }
    .login-button {
      width: 100%;
      box-sizing: border-box;
    }
  }

  .tips {
    font-size: 16px;
    line-height: 28px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .title h6{
      font-size: 8px;
    }

    ::v-deep .lang-select {
      position: absolute;
      top: 4px;
      right: 0;
      background-color: white;
      font-size: 22px;
      padding: 4px;
      border-radius: 4px;
      cursor: pointer;
    }
  }

  .show-pwd {
    // position: absolute;
    // right: 10px;
    // top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
