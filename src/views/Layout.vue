<template>
    <el-container class="app-wrapper">

      <el-aside :width="asideWidth" class="sidebar-container">
        <Menus></Menus>
      </el-aside>

      <el-container class="container" :class="{hidderContainer : $store.state.sideType}">

        <el-header><Headers></Headers></el-header>

        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>

    </el-container>
</template>

<script setup>
import Menus from "@/page/Menus.vue"
import Headers from "@/page/Headers.vue"
import variables from "@/styles/variables.scss"
import { ref,computed } from "vue";
import { useStore } from "vuex";

const store = useStore()
const asideWidth = computed(() => { 
  return store.state.sideType ? variables.hideSideBarWidth : variables.sideBarWidth
})
</script> 


<style lang="scss" scoped>
.app-container{
  position: relative;
  width: 100%;
  height: 100%;
}
.container {
  width: calc(100% - $sideBarWidth);
  height: 100%;

  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  transition: all 0.28s;
  &.hidderContainer {
    width: calc(100% - $hideSideBarWidth);
  }
}
::v-deep .el-header {
  padding: 0;
}
</style>