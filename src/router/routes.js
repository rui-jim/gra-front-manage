import Vue from 'vue'
import Router from 'vue-router'
import Layout from "@/components/layout/index"

import tool from "./modules/tool"
import func from "./modules/func"

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
    func,
    tool
  ]
})

