<template>
  <!-- <Suspense>
    <template v-slot:default> -->
      <el-menu
        active-text-color="#ffd04b"
        :background-color="variables.menuBg"
        class="el-menu-vertical-demo"
        :default-active="defaultActive"
        text-color="#fff"
        router
        :unique-opened="true"
        :collapse="$store.state.sideType"
      >
        <el-sub-menu
          :index="item.id + ''"
          v-for="item in menusList.menu.data"
          :key="item.id"
        >
          <template #title class="title">
            <el-icon><grid /></el-icon>
            <span>{{ $t(`menus.${item.path}`) }}</span>
          </template>

          <el-menu-item  @click="savePath(i.path)" :index="'/' + i.path" v-for="i in item.children" :key="i.id">
            {{ $t(`menus.${i.path}`) }}
          </el-menu-item>

        </el-sub-menu>
      </el-menu>
<!--     
    </template>
    <template v-slot:fallback> 加载中.... </template>
  </Suspense> -->
</template>


<script setup>
import variables from "@/styles/variables.scss"
import {Grid} from "@element-plus/icons-vue"
import { reactive,ref,toRefs, Suspense } from "vue";
import axios from "@/axios";

//layout组件使用了
const menusList = reactive({
  menu:{}
})
const getMenusList = async ()=>{
  menusList.menu = await axios.get("/menus");
  console.log("获取列表", menusList.menu);
}
getMenusList()



//默认路由
const defaultActive = ref(sessionStorage.getItem("path") || "/users")
function savePath(path){
  sessionStorage.setItem("path",`${path}`)
}
</script> 




<style lang="scss" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>