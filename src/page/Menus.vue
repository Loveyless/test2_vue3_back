<template>
  <Suspense>
    <template v-slot:default>
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-sub-menu
          index="1"
        >
          <template #title>
            <el-icon><location /></el-icon>
            <span>Navigator One</span>
          </template>

          <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item one</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group title="Group Two">
            <el-menu-item index="1-3">item three</el-menu-item>
          </el-menu-item-group>

          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    
    </template>
    <template v-slot:fallback> 加载中.... </template>
  </Suspense>
</template>


<script setup>
// import { reactive, Suspense } from "@vue/reactivity";
// import axios from "@/axios";

// //layout组件使用了
// const menusList = await axios.get("/menus");
// console.log("获取列表", menusList);



// :index="item.id"
//           v-for="item in menuList.menus"
//           :key="item.id"
</script> 




<style>
</style>