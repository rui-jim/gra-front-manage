<template>
  <el-container class="Home_container">
    <el-header>
      <header-content></header-content>
    </el-header>
    <el-container>
      <el-aside width="183px">
        <sidebar></sidebar>
      </el-aside>

      <el-main>
        <contentMenu class="common"></contentMenu>
        <tag class="common"></tag>
        <router-view class="common main-router"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import headerContent from "../headerContent/index.vue";
import contentMenu from "../breadCrump/index.vue";
import tag from "../tag/index";
import sidebar from "../sidebar/index.vue";

export default {
  data() {
    return {
      data: 2000,
    };
  },
  components: {
    sidebar,
    contentMenu,
    tag,
    headerContent,
  },

};
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.Home_container {
  height: 50vh;
  overflow: hidden;
}
.el-header {
  background: rgb(14, 83, 211);
  padding: 0 30px;
}
.el-header img {
  height: 100px;
  width: 100px;
  transform: scale(0.5);
}
.el-header span {
  margin-left: 15px;
}
.el-header div {
  display: flex;
  align-items: center;
}
.el-aside {
  overflow: hidden;
}
.el-aside {
  color: #333;
  text-align: center;
  line-height: 200px;
}
.el-container {
  width: 100%;
  height: 100%;
  background: rgb(46, 98, 196);
  /* background: rgb(7, 92, 190); */
}

.el-main {
  background: rgb(219, 216, 216);
  color: rgb(51, 51, 51);
  padding: 10px;
  /* line-height: 160px; */
}

.common {
  margin: 10px 5px 5px 5px;
  padding: 10px 5px 5px 5px;
  background-color: rgb(247, 247, 247);
}

.main-router{
  padding: 40px;
}

.router-view {
  background-color: rgb(230, 223, 223);
}

/* body > .el-container {
  margin-bottom: 40px;
} */

/* .el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
} */
</style>