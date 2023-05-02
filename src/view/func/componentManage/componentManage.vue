<template>
    <div>
        <el-dialog :modal-append-to-body="false" 
            :title="(dialogConfig.isCreate?'创建菜单':'编辑菜单')"
            :visible="dialogConfig.visible" :close-on-click-modal="false"
            @close="closeDialog()">
            <add-component v-if="dialogConfig.visible" :isCreate="dialogConfig.isCreate" :parentConfig="dialogConfig.parentConfig" :initCategory="dialogConfig.initCategory"
                @closeDialog="closeDialog()" @refreshTable="refreshTable()"></add-component>
        </el-dialog>
        <el-card class="box-card" style="margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <div class="container">
                    <el-form inline size="small">
                        <el-form-item label="菜单名称：" style="margin-left: 40px;">
                            <el-input v-model="searchObj.title" placeholder="请输入名称" class="selWidth" size="small" clearable
                                @blur="handlerSearch">
                                <el-button slot="append" icon="el-icon-search" @click="handlerSearch" size="small"/>
                            </el-input>
                        </el-form-item>
                    </el-form>
                    <el-button size="mini"  style="margin-top: 10px;" type="primary"  @click="dialogConfig.visible = true,dialogConfig.parentConfig={},dialogConfig.isCreate = true">
                        新增菜单
                    </el-button>
                </div>
            </div>
        </el-card>
       
        <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;padding: 20px;"
         row-key="id" border  highlight-current-row 
         :tree-props="{children: 'child', hasChildren: 'chil'}">
        <!-- <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" height="auto"
         row-key="id" border  highlight-current-row > -->
         <el-table-column prop="title" label="菜单名称">
            <template slot-scope="scope">
                <i class="icon" :class="scope.row.icon">
                    {{ scope.row.title }}
                </i>
            </template>
          </el-table-column>
          <el-table-column prop="path" label="菜单路径" >
          </el-table-column>
          <el-table-column prop="name" label="组件路径">
          </el-table-column>
          <el-table-column prop="component" label="组件路径">
          </el-table-column>
          <el-table-column label="是否隐藏" width="120">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.hidden" ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" sortable="" >
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
                        <el-button v-if="!scope.row.pId" type="text"  @click="handleAddSubCategory(scope.row)" >
                            添加子菜单
                        </el-button>
                        
                        <el-button type="text"  @click="handleEditCategory(scope.row)">编辑</el-button>
                        <el-button type="text"  @click="handleDelCategory(scope.row)">删除</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { getComponentList,delComponent } from "@/api/func/component"
import { defaultPage } from "@/settings"
import addComponent from "./addComponent.vue"

export default {
    components: {
        addComponent
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
                title: "", // 查找的菜单名称
            },
            dialogConfig:{ // 弹出对话框的配置
                visible: false, // 展示状态
                isCreate: true, // 是否创建
                parentConfig: {
                    pId: "",
                    name: "", // 父类名称
                }, // 父级菜单的信息
                initCategory: {}// 用来初始化分类的信息
            },
        }
    },
    created(){
        this.pageParam = this.$util.deepClone(defaultPage)
        this.initComponentList()
    },
    methods: {
        // 刷新表格
        refreshTable(){
            this.initComponentList()
        },
        // 删除分类
        handleDelCategory(record){
            this.$confirm(record.pId?"是否删除该分类":"是否同所属的子分类删除", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                delComponent({id:record.id}).then( resp => {
                    if(resp && resp.code == 200){
                        this.$message.success("删除成功")
                    }else{
                        this.$message.error(resp.message)
                    }
                }).catch( e => {
                    this.$message.error("删除失败")
                }).finally( () => {
                    this.initComponentList()
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
            if(row.pId){
                this.dialogConfig.parentConfig.pId = row.pId
                this.dialogConfig.parentConfig.name = row.pName
            }else{
                this.dialogConfig.parentConfig.pId = ""
                this.dialogConfig.parentConfig.name = ""
            }
        },
        // 绑定添加的子分类
        handleAddSubCategory(row){
            this.dialogConfig.visible = true
            this.dialogConfig.parentConfig.title = row.title
            this.dialogConfig.parentConfig.pId = row.id
            console.log("this.dialogConfig ",this.dialogConfig,row)
        },
        // 关闭弹窗
        closeDialog(){
            this.dialogConfig.visible = false
        },
        // 绑定筛选条件的查询
        handlerSearch(){
            this.initComponentList()
        },
        // 绑定页面页码变化
        handlerPageChange(page){
            this.pageParam.PAGE = page
            this.initComponentList()
        },
        // 初始化组件信息
        initComponentList(){
            getComponentList({...this.searchObj}).then(resp => {
                console.log("initUserData resp ",resp)
                this.tableData = resp.data.data
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