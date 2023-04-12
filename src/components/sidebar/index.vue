<template>
  <div>
    <el-row>
      <el-menu
        text-color="#fff"
        :background-color="themeColor"
        active-text-color="rgb(12, 216, 223)"
        :unique-opened="true"
        :default-active="activePath"
        router
      >
        <subMenu :menuList="routerList"></subMenu>
      </el-menu>
    </el-row>
  </div>
</template>

<script>
import subMenu from "./subMenu/index";
import router from "@/router/routes";
import {themeColor} from "@/assets/theme/theme.js";

export default {
  components: { subMenu },
  props: {
    menuWidth: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      themeColor: themeColor,
      activePath: "",
      routerList: router.options.routes,
    };
  },
  created() {
    this.activePath = this.$route.fullPath;
  },
  methods: {},
};
</script>
<style scoped>
.el-menu {
  width: 184px;
}
</style>
