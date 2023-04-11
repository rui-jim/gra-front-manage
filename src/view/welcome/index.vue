<template>
  <div>
    <h2>欢迎登录 {{ userInfo.name }}</h2>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>