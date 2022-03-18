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
    redirect: "/users",
    component: () => import("../views/Layout.vue"),
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import('@/page/users/index.vue')
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('@/page/categories/index.vue')
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('@/page/goods/index.vue')
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('@/page/orders/index.vue')
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('@/page/params/index.vue')
      },
      {
        path: '/reports',
        name: 'reports',
        component: () => import('@/page/reports/index.vue')
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('@/page/rights/index.vue')
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('@/page/roles/index.vue')
      }
    ]
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
