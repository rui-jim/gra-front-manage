<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in contents" :key="item.path">{{
        item.meta.title
      }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      contents: [],
    };
  },
  components: {},
  created() {
    this.contents = this.$route.matched;
  },
  computed: {
    ...mapGetters([""]),
  },
};
</script>

<style>
.el-breadcrumb {
}
</style>
