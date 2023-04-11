<template>
  <div>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="账号">
        <el-input v-model="queryForm.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model="queryForm.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="queryInfo">查询</el-button>
      </el-form-item>
    </el-form>

    <el-button type="primary" @click="editAcountVisble = true"
      >添加账号</el-button
    >
    <!-- 账户信息编辑对话框 -->
    <el-dialog
      :visible.sync="editAcountVisble"
      width="60%"
      :before-close="handleClose"
    >
      <el-form
        :model="editAccountsInfo"
        class="demo-form-inline"
        label-width="80px"
      >
        <el-form-item label="账号">
          <el-input
            v-model="editAccountsInfo.account"
            placeholder="账号"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input
            v-model="editAccountsInfo.password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input
            v-model="editAccountsInfo.name"
            placeholder="姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码">
          <el-input
            v-model="editAccountsInfo.phone"
            placeholder="电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址">
          <el-input
            v-model="editAccountsInfo.email"
            placeholder="邮箱地址"
          ></el-input>
        </el-form-item>
        <el-form-item label="所属职位">
          <el-select
            v-model="editAccountsInfo.rolesVo[0].rid"
            placeholder="请选择"
          >
            <el-option
              v-for="item in roles"
              :key="item.rid"
              :label="item.rname"
              :value="item.rid"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editAcountVisble = false">取 消</el-button>
        <el-button type="primary" @click="identifiedChange">确 定</el-button>
      </span>
    </el-dialog>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="account" label="账号"></el-table-column>
      <el-table-column prop="password" label="密码"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="phone" label="电话号码"> </el-table-column>
      <el-table-column prop="email" label="邮箱地址" width="200">
      </el-table-column>
      <el-table-column label="所属角色" width="100">
        <template slot-scope="scope">
          <el-popover
            placement="top-start"
            title="所属的角色及权限:"
            width="200"
            trigger="hover"
          >
            <ul class="tips-content">
              <li v-for="(item, index) in scope.row.rolesVo" :key="index">
                {{ item.rname }}
                <ul>
                  <li
                    v-for="(permission, index) in item.permissionsList"
                    :key="index"
                  >
                    {{ permission.pnickname }}
                  </li>
                </ul>
              </li>
            </ul>
            <p slot="reference">{{ scope.row.rolesVo[0].rname }}</p>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="loginTime" label="上次登录时间"> </el-table-column>
      <el-table-column prop="gmtTime" label="上次修改时间"> </el-table-column>
      <el-table-column prop="createTime" label="创建时间"> </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editAcountInfo(scope.$index, scope.row.uid)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="deleteAcount(scope.row.uid)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import {
  getAccountsList,
  submitUpdateAccounts,
  deleteAcountInfo,
} from "@/api/admin/admins";
import { getRolesPList } from "@/api/admin/roles";
import pageUtils from "@/util/pageUtils";
export default {
  data() {
    return {
      chooseRoleIndex: 0,
      editAcountVisble: false, // 显示编辑账户对话框
      tableData: [], // 所列账户信息
      queryForm: { name: "", address: "" }, // 查询的表单,
      editAccountsInfo: { rolesVo: [{ name: "" }] }, //点击编辑按钮选定的内容，即要修改的内容
      identiedAccount: [], // 添加的账户信息或者修改的账户信息
      editRole: {}, //存放编辑内容里的职位名称
      roles: [], //从后端获取的职位信息
    };
  },
  created() {
    this.queryAccountsListInfo();
    this.getRoles();
    pageUtils.registerTag(this.$store, this.$route);
  },
  methods: {
    deleteAcount(uid) {
      this.$confirm("是否删除这个账户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        deleteAcountInfo(uid).then((response) => {
          if (response.success) {
            this.$message({
              type: "success",
              message: response.data.resInfo,
            });
          } else {
            this.$message({
              type: "error",
              message: response.data.resInfo,
            });
          }
          this.queryAccountsListInfo();
        });
      });
    },
    addAccount() {
      this.editAccountsInfo = [];
      this.identifiedChange();
    },
    identifiedChange() {
      console.log("change Info ", this.editAccountsInfo);
      submitUpdateAccounts(this.editAccountsInfo).then((response) => {
        console.log("UPDATE ", response);
        if (response.success) {
          this.$message({
            type: "success",
            message: response.data.resInfo,
          });
        } else {
          this.$message({
            type: "error",
            message: response.data.resInfo,
          });
        }
        this.queryAccountsListInfo();
      });
      this.editAcountVisble = false;
    },
    editAcountInfo(index, uid) {
      this.editAccountsInfo = this.tableData[index];
      this.editAcountVisble = true;
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    getRoles() {
      getRolesPList().then((response) => {
        this.roles = response.data.rolesVo;
      });
    },
    queryInfo() {},
    chooseRoleChange() {},
    queryAccountsListInfo() {
      getAccountsList().then((response) => {
        this.tableData = response.data.accountsList;
      });
    },
  },
};
</script>
<style scoped>
.el-pagination {
  margin-top: 10px;
}
</style>
