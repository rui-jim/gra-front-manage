<template>
  <div>
    <el-submenu
      :index="router.path"
      v-for="(router, index) in menuList"
      :key="index"
      v-if="!router.hidden"
    >
      <template slot="title">
        <i :class="router.icon"></i>
        <span>{{ router.title }}</span>
      </template>
      <el-menu-item
        :index="router.path + item.path"
        v-for="(item, itemIndex) in router.child"
        :key="itemIndex"
      >
      <!-- {{ router.path + item.path }} -->
        <i :class="item.icon"></i>
        {{ item.title }}
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
  watch:{
    menuList(){},
  },
  methods:{
  }
};
</script>
