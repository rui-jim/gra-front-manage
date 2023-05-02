<template>
    <div>
        <!-- <div class="header-title">存储管理</div> -->
        <div class="header">
            <el-divider class="divider"><h3>存储管理</h3></el-divider>
        </div>
        <div class="function-box">
          <div class="search-box">
            <div class="search">
              <el-input placeholder="请输入搜索的文件名称" v-model="searchParam.realName" 
                clearable @blur="initFileStorage()"  @clear="initFileStorage()">
              </el-input>
            </div>
            <el-button type="primary" style="margin-bottom: 20px;margin-left: 20px;"
              @blur="initFileStorage()">搜索</el-button> 
          </div>
          <div>
            <el-button type="success" @click="uploadDialog.visible = true">上传</el-button> 
            <el-button type="danger" @click="handlerRemove()">删除</el-button> 
          </div>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" 
          style="width: 100%;padding: 20px;" @selection-change="handlerSelection">
        <!-- <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" height="auto"
         row-key="id" border  highlight-current-row > -->
         <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column prop="name" label="图片" sortable >
            <template slot-scope="scope">
                <el-image v-if="scope.row.name"
                    style="width: 60px; height: 60px"
                    :src="$parsePath(scope.row.name)" fit="cover">
                </el-image>
              </template>
          </el-table-column>
          <el-table-column prop="name" label="文件名称" sortable width="260">
          </el-table-column>
          <el-table-column prop="realName" label="源文件名称" sortable >
          </el-table-column>
          <el-table-column prop="suffix" label="文件后缀" sortable >
          </el-table-column>
          <el-table-column prop="type" label="文件类型" sortable >
          </el-table-column>
          <el-table-column prop="size" label="文件大小" sortable >
          </el-table-column>
          <el-table-column prop="createTime" label="文件创建时间" sortable width="200">
          </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: center;align-items: center;margin: 25px 0;">
          <el-pagination layout="prev, pager, next" :background="true" :total="paginition.totalCount" 
            :current-page="pageParam.PAGE" :page-size="pageParam.SIZE" @current-change="handlerPageChange"> </el-pagination>
        </div>

        <el-dialog :modal-append-to-body="false" 
          title="上传文件" width="40%" 
          :visible="uploadDialog.visible" :close-on-click-modal="true"
          @close="closeDialogRefresh()">
          <div style="display: flex;flex-direction: column;align-items: center;width: 100%;padding-bottom: 30px;">
            <el-upload class="upload-demo" ref="upload" drag 
              :action="uploadDialog.uploadPath" multiple :headers="uploadDialog.header"
              :before-upload="uploadBefore" :on-success="uploadSuccess">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </div>
        </el-dialog>
    </div>
  </template>
  
<script>
import { getToken } from '@/util/tokenUtils';
import { defaultUploadPath,defaultHeader,defaultLimitFileSize,defaultLimitFileDesc } from "@/settings"
//   import pageUtils from "@/util/pageUtils";
import { upload,getData,removeData } from "@/api/sys/fileStorage"
import pageUtils from "@/util/pageUtils"
import { defaultPage } from "@/settings"

export default {
  data() {
    return {
      searchInput: "", // 查找需要输入的内容
      tableData: [], // 展示的数据
      pageParam: { // 分页参数
        PAGE: 1, 
        SIZE: 10
      },
      searchParam: { // 查询参数
        realName: '' // 源文件名
      },
      uploadDialog: { // 上传文件弹窗
        visible: false, // 展示
        uploadPath: defaultUploadPath, // 默认上传的路径
        header: {}
      },
      paginition: {
        totalCount: 1
      },
      refresh: false, // 上文件成功后为true,从而加载新数据
      removeIds: [] // 存放删除的id以及文件名{id,name}
    };
  },
  created() {
    console.log("FF",this)
    this.pageParam = this.$util.deepClone(defaultPage)
    this.uploadDialog.header = this.$util.deepClone(defaultHeader)
    this.uploadDialog.header['token'] = getToken()
    pageUtils.registerTag(this.$store, this.$route);
    this.initFileStorage()
  },
  methods: {
    // 绑定页面页码变化
    handlerPageChange(page){
      console.log("handlerPageChange page ",page)
      this.pageParam.PAGE = page
      this.initFileStorage()
    },
    // 绑定删除文件
    handlerRemove(){
      if(this.removeIds.length == 0 ){
        this.$message.warning("请选择删除的文件")
        return 
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        removeData({removeIds: this.removeIds}).then(resp => {
          if(resp.code && resp.code == 200){
            this.$message.success("操作成功")
            this.initFileStorage()
          }else{
            this.$message.error(resp.message)
          }
        }).catch( e => {
          this.$message.error("操作失败")
        })
      }).catch((e) => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
     
      
    },
    // 当选择表格内的文件时触发
    handlerSelection(selection){
      console.log("selection == ",selection)
      this.removeIds = selection.map( val => {
        return {
          id: val.id,
          name: val.name
        }
      })
    },
    // 关闭弹窗并刷新数据
    closeDialogRefresh(){
      this.$refs.upload.clearFiles()
      this.uploadDialog.visible = false
      if(this.refresh){
        this.initFileStorage()
      }
      this.refresh = false
    },
    // 上传成功的处理
    uploadSuccess(response,file){
      console.log("response upload ",response)
      if(response.code && response.code == 200){
        this.$message.success("上传成功")
        this.refresh = true
        // 重新加载数据
        this.initFileStorage()
      }else{
        this.$message.error("上传失败 请稍后重试")
      }
    },
    // 上传之前
    uploadBefore(file){
      if(file.size > defaultLimitFileSize){
          this.$message.error(`上传文件的最大大小为${defaultLimitFileDesc}`)
          return false
      }
      return true
    },
    // 初始化仓库数据
    initFileStorage(){
      console.log('   initFileStorage ',this.searchParam.realName)
      getData({realName: this.searchParam.realName},this.pageParam).then(resp => {
        console.log("get data ",resp)
        this.tableData = resp.data.data.records
        this.paginition.totalCount = resp.data.data.total
      })
    }
  },
};
</script>

<style scoped lang="scss">

.function-box{
  margin: 20px;

  .search-box{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: nowrap;

    .search{
      width: 25%;
      margin-bottom: 20px;
    }
  }
}

.header{
  // .divider{
  //   background-color:rgb(247, 247, 247) !important;
  // }
     .el-divider__text{
        background-color:rgb(247, 247, 247) !important;
    } 
}

</style>