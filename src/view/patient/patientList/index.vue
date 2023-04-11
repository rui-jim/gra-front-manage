<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="pid" label="病人id" width="80"> </el-table-column>
      <el-table-column prop="pname" label="姓名" width="80"> </el-table-column>
      <el-table-column prop="pavatar" label="头像"> </el-table-column>
      <el-table-column prop="paddress" label="居住地址"> </el-table-column>
      <el-table-column prop="pidentified" label="身份证"> </el-table-column>
      <el-table-column label="负责的医生">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in doctorsName"
            :key="item"
            :label="item"
            :value="item"
          >
          </el-option> </el-select
      ></el-table-column>
      <el-table-column prop="pentryTime" label="入职时间"> </el-table-column>
      <el-table-column prop="presignTime" label="辞职时间"> </el-table-column>
      <el-table-column prop="modTime" label="最后修改时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPatientList } from "@/api/patients/patients";
import pageUtils from "@/util/pageUtils";
export default {
  data() {
    return {
      tableData: [{ doctorsName: [] }],
      value: "",
    };
  },
  created() {
    this.getPatientsList();
    pageUtils.registerTag(this.$store, this.$route);
  },
  methods: {
    getPatientsList() {
      getPatientList().then((response) => {
        this.tableData = response.data.patientList;
        this.value = this.tableData[0].doctorsName[0];
      });
    },
  },
};
</script>