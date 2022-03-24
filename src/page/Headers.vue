<template>
<div class="navbar">
  <div class="hamburger">
    <el-icon @click="changeSide" class="opened"><fold /></el-icon>
  </div>
  <Breadcrumb></Breadcrumb>


  <div class="navbar-right">

  <el-dropdown style="margin-right:20px;font-weight:600">
    <span class="el-dropdown-link">
      Language
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="changeLanguage('zh')" :disabled="currentLanguage === 'zh'">简体中文</el-dropdown-item>
        <el-dropdown-item @click="changeLanguage('en')" :disabled="currentLanguage === 'en'">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dropdown>
    <span class="el-dropdown-link">
      <el-avatar shape="square" size="default" src="https://v3.cn.vuejs.org/logo.png" />
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="logout">Quit</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>


  </div>
</div> 
</template>

<script setup>
import Breadcrumb from '@/page/Breadcrumb.vue';
import {Fold} from "@element-plus/icons-vue"
import { useStore } from "vuex";
import router from "@/router"
import { computed } from 'vue';
import {useI18n} from "vue-i18n"
const store = useStore()
const i18n = useI18n()

//开关菜单缩小
const changeSide = ()=>{
  store.commit("changeSideType")
}



//退出登录
const logout = () => {
  localStorage.clear()
  router.replace("/login")
  ElMessage({
    message: 'logout',
    type: 'success',
  })
}

//获取当前语言
const currentLanguage = computed(() => {
  return i18n.locale.value
})
//切换语言
const changeLanguage = (Language) => {
  i18n.locale.value = Language
  localStorage.setItem("Language",Language)
}

</script> 

<style lang="scss" scoped>
.navbar {
  width: 100%;
  height: 60px;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  padding: 0 16px;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  position: relative;
  .navbar-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 3px;
    ::v-deep .navbar-item {
      display: inline-block;
      margin-left: 18px;
      font-size: 22px;
      color: #5a5e66;
      box-sizing: border-box;
      cursor: pointer;
    }
  }
  .hamburger{
    font-size: 20px;
    margin-right: 16px;
    box-sizing: border-box;
    cursor: pointer;
  }
}
 </style>