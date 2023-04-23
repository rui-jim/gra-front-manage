<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <div v-if="contents.length > 0">
        <el-breadcrumb-item v-if="item.meta.title" v-for="item in contents" :key="item.path">{{
          item.meta.title
        }}</el-breadcrumb-item>
        </div>
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
    console.log("this.contents ",this.contents)
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
