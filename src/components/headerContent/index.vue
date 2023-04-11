<template>
  <div class="header-box">
    医院管理系统

    <el-dialog :visible.sync="showUserInfoVisible" width="60%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUserInfoVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dropdown trigger="click">
      <span class="el-dropdown-link">
        <el-avatar shape="circle" :size="50" :src="url"></el-avatar>
        <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click="showUserInfo">个人信息</el-dropdown-item>
        <el-dropdown-item>注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      showUserInfoVisible: false,
    };
  },
  methods: {
    showUserInfo() {
      this.showUserInfoVisible = true;
    },
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style scoped>
.header-box {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgb(243, 243, 243);
  font-size: 20px;
}
.el-dropdown-link {
  cursor: pointer;
}
</style>