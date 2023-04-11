import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/components/layout/index"
import patients from "./modules/patients.js"
import staffs from "./modules/staffs.js"
import treat from "./modules/treat.js"

Vue.use(Router)

export default new Router({
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Layout,
      redirect: "/index",
      hidden: true,
      children: [
        {
          path: "index",
          name: "mindexy1",
          component: () => import("@/view/welcome/index")
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import("@/view/login/index"),
      hidden: true,
    },
    {
      path:"/tool",
      name:"tool",
      meta:{title:"开发工具"},
      component:Layout,
      hidden:false,
      children:[
          {
              path:"storage",
              name:"storage",
              meta:{title:"存储管理"},
              component:()=>import("@/view/sys/storage/storage.vue")
          }
      
      ]
    },
    staffs,
    patients,
    treat
  ]
})

