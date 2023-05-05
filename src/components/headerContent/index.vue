<template>
  <div class="header-box">
    美食网站后台管理系统

    <el-dialog :visible.sync="showUserInfoVisible" width="60%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUserInfoVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog>

    <el-dropdown trigger="click" @command="dropCommand">
      <span v-if="userInfo.uavatar" class="el-dropdown-link">
        <el-avatar shape="circle" :size="50" :src="$parsePath(userInfo.uavatar)"></el-avatar>
        <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
      </span>
      <span v-else class="el-dropdown-link">
        <el-avatar shape="circle" :size="50" :src="url"></el-avatar>
        <!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
      </span>
      <el-dropdown-menu slot="dropdown">
        <!-- <el-dropdown-item command="showUserInfo">个人信息</el-dropdown-item> -->
        <el-dropdown-item command="logout" >退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { logout } from "@/api/login"
export default {
  data() {
    return {
      fits: ["fill", "contain", "cover", "none", "scale-down"],
      url: "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      showUserInfoVisible: false,
    };
  },
  created(){
    console.log("eeeeeeeeeeeeerrrrrrrrrrrr",this)
  },
  methods: {
    // 点击了下拉菜单后携带按钮的command进行方法区分
    dropCommand(command){
      if( command == 'showUserInfo'){
        this.showUserInfo()
      }else if(command == 'logout'){
        this.userLogout()
      }
    },
    // 展示用户信息
    showUserInfo() {
      this.showUserInfoVisible = true;
    },
    // 用户退出登录
    userLogout(){
      logout()
    }
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
};
</script>

<style scoped>
.header-box {
  padding: 10px 0;
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