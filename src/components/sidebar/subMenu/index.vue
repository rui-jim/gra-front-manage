<template>
  <div>
    <el-submenu
      :index="router.path"
      v-for="(router, index) in menuList"
      :key="index"
      v-if="!router.hidden"
    >
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ router.meta.title }}</span>
      </template>
      <el-menu-item
        :index="router.path + '/' + item.path"
        v-for="(item, itemIndex) in router.children"
        :key="itemIndex"
      >
        <i class="el-icon-menu"></i>
        {{ item.meta.title }}
      </el-menu-item>
    </el-submenu>
  </div>
</template>
<script>
export default {
  props: {
    menuList: {
      tpye: Array,
      require: true,
    },
  },
  data() {
    return {};
  },
  created() {},
};
</script>
