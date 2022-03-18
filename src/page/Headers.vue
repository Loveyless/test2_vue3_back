<template>
<div class="navbar">
  <div class="hamburger">
    <el-icon @click="changeSide" class="opened"><fold /></el-icon>
  </div>
  <Breadcrumb></Breadcrumb>
</div> 
</template>

<script setup>
import Breadcrumb from '@/page/Breadcrumb.vue';
import {Fold} from "@element-plus/icons-vue"
import { useStore } from "vuex";
const store = useStore()

const changeSide = ()=>{
  store.commit("changeSideType")
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