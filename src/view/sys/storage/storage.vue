<template>
    <div>
        <!-- <div class="header-title">存储管理</div> -->
        <div class="header">
            <el-divider><h3>存储管理</h3></el-divider>
        </div>
        <div class="function-box">
          <div class="search-box">
            <div class="search">
              <el-input placeholder="请输入搜索的文件名称" v-model="searchInput" clearable>
              </el-input>
            </div>
            <el-button type="primary" style="margin-bottom: 20px;margin-left: 20px;">搜索</el-button> 
          </div>
          <div>
            <el-button type="success">上传</el-button> 
            <el-button type="danger">删除</el-button> 
          </div>
        </div>
    </div>
  </template>
  
  <script>
//   import pageUtils from "@/util/pageUtils";
  import {upload} from "@/api/sys/fileStorage"
  export default {
    data() {
      return {
        searchInput: "", // 查找需要输入的内容

      };
    },
    created() {
      upload().then(res => {
        console.log("RES ",res)
      }).catch( e => {
        console.log("E ",e)
      })
    },
    methods: {},
  };
  </script>

<style scoped lang="scss">

.function-box{

  .search-box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;

    .search{
      width: 15%;
      margin-bottom: 20px;
    }
  }
}

.header{
     .el-divider__tex{
        background-color:rgb(247, 247, 247) !important;
    } 
}

</style>