<template>
  <div class="content">
    <div class="authorize">
      <el-select
        v-model="role"
        size="medium"
        placeholder="请选择"
        @change="rolesChange"
      >
        <el-option
          v-for="item in rolesData"
          :key="item.rid"
          :label="item.rname"
          :value="item.rid"
        >
        </el-option>
      </el-select>
      <el-table :data="permissionsList" border style="width: 15vw">
        <el-table-column prop="pnickname" label="权限名称" width="230px">
        </el-table-column>
      </el-table>
    </div>

    <!-- 修改职位权限的内容 -->
    <div class="button-view">
      <div>
        <el-dialog
          title="提示"
          :visible.sync="updatePermissionVisible"
          width="70%"
          center
        >
          <el-select v-model="role" placeholder="请选择" @change="rolesChange">
            <el-option
              v-for="item in rolesData"
              :key="item.rid"
              :label="item.rname"
              :value="item.rid"
            >
            </el-option>
          </el-select>

          <!-- 多选框 -->
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="perCheckAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 15px 0"></div>
          <el-checkbox-group v-model="changePermission" @change="clickPer">
            <el-checkbox
              v-for="temp in totalPermissionList"
              :label="temp.pid"
              :key="temp.pid"
              >{{ temp.pnickname }}</el-checkbox
            >
          </el-checkbox-group>

          <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUpdatePer">确 定</el-button>
          </span>
        </el-dialog>

        <el-button
          class="btn"
          type="primary"
          @click="updatePermissionVisible = true"
          >修改职位的权限</el-button
        >
      </div>

      <!-- 添加职位或者删除职位 -->
      <div>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          center
        >
          <el-input
            v-model="addRole.rname"
            placeholder="请输入添加的职位名称"
            label="请输入添加的职位名称"
            clearable
          ></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="changeRole">确 定</el-button>
          </span>
        </el-dialog>
        <el-button class="btn" type="primary" @click="dialogVisible = true"
          >添加职位</el-button
        >
      </div>
      <el-button class="btn" type="primary" @click="deleteSelectedRole"
        >删除选中的职位</el-button
      >
    </div>
  </div>
</template>

<script>
import { getPermissionsList, updatePerOfRole } from "@/api/admin/permissions";
import { getRolesPList, addRole, deleteRole } from "@/api/admin/roles";
import pageUtils from "@/util/pageUtils";

export default {
  data() {
    return {
      addRole: { rname: "" },
      addRoleName: { rname: "" }, //添加的角色属性
      dialogVisible: false, // 关闭dialog
      updatePermissionVisible: false, // 关闭修改权限界面
      changePermission: [], // 修改该角色的职位
      role: "", // 存储选定的角色
      rolesData: [], // 从后端获得的职位列表
      index: 0, // 选定的职位位置

      permissionsList: [], // 选定权限列表
      totalPermissionList: [], // 总权限列表,

      checkAll: false,
      isIndeterminate: true,
    };
  },
  created() {
    this.getRolesList();
    this.getTotalPermissionsList();
    pageUtils.registerTag(this.$store, this.$route);
  },
  methods: {
    //全选权限 val为当前选中的数组
    perCheckAllChange(val) {
      this.checkAll = val;
      if (this.checkAll) {
        for (let i in this.totalPermissionList) {
          let temp = this.totalPermissionList[i];
          this.changePermission.push(temp.pid);
        }
      } else {
        this.changePermission = [];
      }
    },
    submitUpdatePer(val) {
      let convertPerList = [];
      for (let i in this.changePermission) {
        convertPerList.push({ pid: this.changePermission[i] });
      }
      let data = { rid: this.role, permissionsList: convertPerList };
      updatePerOfRole(data).then((response) => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: "职位的权限添加成功",
          });
          this.getRolesList();
        } else {
          this.$message({
            type: "error",
            message: "职位的权限添加失败",
          });
        }
      });
      this.centerDialogVisible = false;
    },
    clickPer(val) {
      this.changePermission = val;
    },
    // 修改职位权限的按钮
    updatePermission() {
      this.updatePermissionVisible = false;
    },
    // 添加职位名称的按钮
    changeRole() {
      addRole(this.addRole).then((response) => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: "添加职位成功",
          });
          this.getRolesList();
        } else {
          this.$message({
            type: "error",
            message: "添加职位失败",
          });
        }
        this.dialogVisible = false;
      });
    },
    //删除职位名称的按钮
    deleteSelectedRole() {
      deleteRole({ rid: this.role }).then((response) => {
        if (response.data.success) {
          this.$message({
            type: "success",
            message: "删除职位成功",
          });
          this.role = "";
          this.getRolesList();
        } else {
          this.$message({
            type: "error",
            message: "删除职位失败",
          });
        }
      });
    },
    // 选定职位时
    rolesChange(rid) {
      this.permissionsList = [];
      this.changePermission = [];
      let i = 0;
      for (i; i < this.rolesData.length; i++) {
        if (rid === this.rolesData[i].rid) {
          this.index = i;
        }
      }
      let tempPer = this.rolesData[this.index].permissionsList;
      this.permissionsList = tempPer;
      for (let temp in tempPer) {
        this.changePermission.push(parseInt(tempPer[temp].pid));
      }
    },
    // 获得总权限列表
    getTotalPermissionsList() {
      getPermissionsList().then((response) => {
        this.totalPermissionList = response.data.permissionsList;
      });
    },
    // 获得所有职位列表
    getRolesList() {
      getRolesPList().then((response) => {
        this.rolesData = response.data.rolesVo;
      });
    },
  },
};
</script>

<style scoped>
.el-select {
  width: 15vw;
}
.content {
  display: flex;
  flex-direction: row;
  padding: 5vh 10vw;
}
.button-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
}

.btn {
  width: 35vw;
  margin: 20px 40px;
}
.authorize {
  /* display: flex;
  align-items: center; */
  /* width: 600px;
  margin: 0 auto; */
  margin: 0 10vw 0 0;
}
</style>