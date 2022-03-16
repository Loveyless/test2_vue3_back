import { createRouter, createWebHashHistory } from "vue-router";


const routes = [
  {
    path: "/",
    redirect: "/login",
  },
  {
    name: "login",
    path: "/login",
    component: () => import("../views/Login.vue"),
  },
  {
    name: "layout",
    path: "/layout",
    component: () => import("../views/Layout.vue"),
  },
];

//路由
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});


//请求拦截器
// 不登录也能访问的页面
router.beforeEach((to,from,next) => {
  // 如果去login直接放行
  if(to.path == "/login"){
    return next()
  }

  const token = localStorage.getItem("token")
  //如果没有token就去login
  if(!token){
    return next("/login")
  }

  next()

})

export default router;
