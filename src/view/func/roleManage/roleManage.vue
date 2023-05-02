<template>
    <div>
        <el-dialog :modal-append-to-body="false" 
            :title="(dialogConfig.isCreate?'创建角色':'编辑角色')"
            :visible="dialogConfig.visible" :close-on-click-modal="false"
            @close="closeDialog()">
            <add-Role v-if="dialogConfig.visible" :isCreate="dialogConfig.isCreate" :initCategory="dialogConfig.initCategory"
                :componentList="dialogConfig.componentList" @closeDialog="closeDialog()" @refreshTable="refreshTable()"></add-Role>
        </el-dialog>
        <el-card class="box-card" style="margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <div class="container">
                    <el-form inline size="small" @submit.prevent>
                        <el-form-item label="角色名称：" style="margin-right: 40px;">
                            <el-input v-model="searchObj.rName" @keydown.enter.prevent placeholder="请输入搜索的角色名称" class="selWidth" size="small" clearable>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="是否可用" style="margin-right: 40px;">
                            <el-select v-model="searchObj.isShow" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="margin-right: 40px;">
                            <el-button size="mini"  style="margin-top: 10px;" type="primary"  @click="handlerSearch">
                                搜索
                            </el-button>
                        </el-form-item>
                    </el-form>
                    <el-button size="mini"  style="margin-top: 10px;" type="primary"  @click="dialogConfig.visible = true,dialogConfig.isCreate = true">
                        新增角色
                    </el-button>
                </div>
            </div>
        </el-card>
       
        <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;padding: 20px;"
         row-key="id" border  highlight-current-row 
         :tree-props="{children: 'child', hasChildren: 'chil'}">
        <!-- <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" height="auto"
         row-key="id" border  highlight-current-row > -->
         <el-table-column prop="rName" label="角色名称">
          </el-table-column>
          <el-table-column prop="rDescription" label="角色描述" >
          </el-table-column>
          <el-table-column prop="sort" label="排序" sortable>
          </el-table-column>
          <el-table-column label="是否有效" width="120">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.isShow" ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" sortable>
            <template slot-scope="scope">
                {{ $util.timeFormat(scope.row.createTime) }}
            </template>
          </el-table-column>
          <el-table-column prop="modifiedTime" label="修改时间" sortable>
            <template slot-scope="scope">
                {{ $util.timeFormat(scope.row.modifiedTime) }}
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="200" >
                <template slot-scope="scope">
                    <div  style="display: flex;justify-content: center;align-items: center;">
                        <!-- <el-button v-if="!scope.row.pId" type="text"  @click="handleAddSubCategory(scope.row)" >
                            添加子菜单
                        </el-button> -->
                        
                        <el-button type="text"  @click="handleEditCategory(scope.row)">编辑</el-button>
                        <el-button type="text"  @click="handleDelCategory(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getComponentList } from "@/api/func/component"
import { getRoleList,delRole } from "@/api/func/roleManage"
import { defaultPage } from "@/settings"
import addRole from "./addRole.vue"

export default {
    components: {
        addRole
    },
    data(){
        return {
            tableData: [], //展示表格的数据
            categoryList: [], // 分类列表
            pageParam: { // 分页信息
                PAGE: 1,
                SIZE: 10
            },
            paginition: {
                totalCount: 1
            },
            searchObj: { // 查询对象
                rName: "", // 角色的名称
                isShow: null // 是否展示
            },
            dialogConfig:{ // 弹出对话框的配置
                visible: false, // 展示状态
                isCreate: true, // 是否创建
                initCategory: {},// 用来初始化分类的信息
                componentList: []
            },
        }
    },
    created(){
        this.pageParam = this.$util.deepClone(defaultPage)
        this.initComponentList()
        this.initRoleList()
    },
    methods: {
        // 刷新表格
        refreshTable(){
            this.initRoleList()
        },
        // 删除分类
        handleDelCategory(record){
            this.$confirm("是否删除该角色", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                delRole({rId:record.rid}).then( resp => {
                    if(resp && resp.code == 200){
                        this.$message.success("删除成功")
                    }else{
                        this.$message.error(resp.message)
                    }
                }).catch( e => {
                    this.$message.error("删除失败")
                }).finally( () => {
                    this.initRoleList()
                })
            } ).catch( () => {
                this.$message.info("已取消删除")
            })
            
        },
        // 绑定编辑分类的信息
        handleEditCategory(row){
            this.dialogConfig.visible = true
            this.dialogConfig.isCreate = false
            this.dialogConfig.initCategory = row
        },
        // 绑定添加的子分类
        handleAddSubCategory(row){
            this.dialogConfig.visible = true
            console.log("this.dialogConfig ",this.dialogConfig,row)
        },
        // 关闭弹窗
        closeDialog(){
            this.dialogConfig.visible = false
        },
        // 绑定筛选条件的查询
        handlerSearch(){
            this.initRoleList()
        },
        // 绑定页面页码变化
        handlerPageChange(page){
            this.pageParam.PAGE = page
            this.initRoleList()
        },
         // 初始化组件信息
         initComponentList(){
            getComponentList().then(resp => {
                console.log("getComponentList resp ",resp)
                let tempList = resp.data.data
                this.dialogConfig.componentList = tempList.map(val => {
                    return {
                        label: val.title,
                        value: val.id,
                        children: val.child.map( value =>{
                            return {
                                label: value.title,
                                value: value.id
                            }
                        })
                    }
                })
                 
            })
        },
        // 初始化用户信息
        initRoleList(){
            getRoleList({...this.searchObj,...this.pageParam}).then(resp => {
                console.log("initUserData resp ",resp)
                this.tableData = resp.data.data.records
            })
        }
    }
}
</script>
<style scoped lang="scss">
.box-card{
    ::v-deep .el-card__body {
        padding: 0px !important;
    }
}

</style>