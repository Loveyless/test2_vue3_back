<template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item v-for="item in routeList" :key="item.path">
      {{ item.path.slice(1) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script setup>
import { useRoute } from "vue-router";
import { ref, watch } from "vue";
const route = useRoute();

const routeList = ref([])

const handle = ()=>{
  routeList.value = route.matched
}

watch(route, () => {
  handle()
}, { deep: true, immediate: true });
</script> 

<style lang=''>
</style>