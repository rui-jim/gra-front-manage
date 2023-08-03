// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index'
import Element,{Table} from "element-ui"
import store from "@/store/index"
import NProgress from "nprogress"
import global,{$parsePath} from "@/util/global"

import "nprogress/nprogress.css"
import "element-ui/"
import 'element-ui/lib/theme-chalk/index.css';
import "./assets/css/global.css"
import "./assets/css/table.css"

Vue.prototype.$util = global
Vue.prototype.$parsePath = $parsePath
Vue.config.productionTip = false

console.log("main.js ===> router", router);

const fixElTableErr = (table) => {
  const oldResizeListener = table.methods.resizeListener;
  table.methods.resizeListener = function () {
      window.requestAnimationFrame(oldResizeListener.bind(this));
  };
};
fixElTableErr(Table)

Vue.use(Element)

// 修改标题
document.title = '美食网站后台管理系统'

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
  silent: true
})
