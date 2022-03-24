import axios from "axios";
import {diffTokenTime,setTokenTime } from "@/utils/auth.js"
import router from "@/router";
const server = axios.create({
  // baseURL: "http://localhost:3000",
  baseURL:"http://101.200.243.101:8888/api/private/v1/",
  timeout: 2500,
});

//请求拦截器
server.interceptors.request.use((config) => {
  if(localStorage.getItem("token")){
    if(diffTokenTime()){
      console.log(123);
      localStorage.clear();
      ElMessage({
        message: "登录超时",
        type: "error",
        center: true,
        showClose: true,
        duration: 2000,
      })
      router.replace("/login")
      return config
    }
  }
  config.headers.Authorization = localStorage.getItem("token");
  return config
},(error) => { 
  ElMessage({
    message: error.message,
    type:"error",
    center: true,
    showClose: true,
    duration: 1000,
  });
  console.log(error.message);
  return error;
});



//响应拦截器
server.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    const { data } = response;
    ElMessage({
      //成功就弹窗
      message: data.meta.msg,
      type: data.meta.status == 200 || 201 ? "success" : "error",
      center: true,
      showClose: true,
      duration: 1000,
    });
    return data;
  },
  function (error) {
    // 对响应错误做点什么
    ElMessage({
      message: error.message,
      type:"error",
      center: true,
      showClose: true,
      duration: 1000,
    });
    console.log(error.message);
    return error;
  }
);

//

export default server;
