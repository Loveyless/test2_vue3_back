import axios from "axios"



const server = axios.create({
    baseURL:"http://localhost:3000",
    timeout:2500
})

//响应拦截器
server.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  const {data} = response
  ElMessage({  //成功就弹窗
    message: data.message,
    type: data.status == 200 ? "success" : "error"
  })
  return data;
}, function (error) {
  // 对响应错误做点什么
  const {data} = response
  ElMessage({
    message: data.message,
    type: data.status == 200 ? "success" : "error"
  })
  return data;
});

//


export default server