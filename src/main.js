// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Element from "element-ui"
import store from "@/store/index"
import NProgress from "nprogress"

import "nprogress/nprogress.css"
import "element-ui/"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/global.css"
import "./assets/css/table.css"


Vue.config.productionTip = false

console.log("main.js ===> router", router);
console.log("main.js ===> this", this);

Vue.use(Element)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  render: h => h(App),
  created() {
    this.$store.dispatch("tagTest/init_tag")
  },
})
