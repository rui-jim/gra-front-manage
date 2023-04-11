<template>
  <div>
    <el-select v-model="role" placeholder="请选择" @change="rolesChange">
      <el-option
        v-for="item in roles"
        :key="item.rname"
        :label="item.rname"
        :value="item.rname"
      >
      </el-option>
    </el-select>
    <el-select v-model="permission" placeholder="请选择">
      <el-option
        v-for="item in roles[index].permissionsList"
        :key="item.pnickname"
        :label="item.pnickname"
        :value="item.pnickname"
      >
      </el-option>
    </el-select>
  </div>
</template>
<script>
import { getRolesPList } from "@/api/admin/roles";
export default {
  data() {
    return {
      roles: [],
      permissions: [],
      permission: "",
      index: 0,
    };
  },
  props: {
    role: String,
  },
  created() {
    this.getRolesPList();
  },
  methods: {
    rolesChange(rname) {
      for (let i = 0; i < this.roles.length; i++) {
        if (rname === this.roles[i].rname) {
          this.index = i;
        }
      }
    },
    getRolesPList() {
      getRolesPList().then((response) => {
        console.log("resp ", response);
        this.roles = response.data.rolesVo;
      });
    },
  },
};
</script>