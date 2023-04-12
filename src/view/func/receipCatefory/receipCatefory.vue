<template>
    <div>
        <el-card class="box-card" style="margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <div class="container">
                    <el-form inline size="small">
                    <el-form-item label="状态：">
                        <el-select v-model="searchObj.isShow" placeholder="展示状态" class="selWidth" @change="handlerSearch">
                            <el-option label="全部" :value="null"></el-option>
                            <el-option label="显示" :value="true"></el-option>
                            <el-option label="不显示" :value="false"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="热门" style="margin-left: 40px;" >
                        <el-switch v-model="searchObj.isHot" @change="handlerSearch">
                        </el-switch>    
                    </el-form-item>
                    <el-form-item label="横幅">
                        <el-switch v-model="searchObj.isBanner" @change="handlerSearch">
                        </el-switch>    
                    </el-form-item>
                    <el-form-item label="首页推荐">
                        <el-switch v-model="searchObj.isRecommand" @change="handlerSearch">
                        </el-switch>    
                    </el-form-item>
                    <el-form-item label="名称：" style="margin-left: 40px;">
                        <el-input v-model="searchObj.name" placeholder="请输入名称" class="selWidth" size="small" clearable
                            @change="handlerSearch">
                            <el-button slot="append" icon="el-icon-search" @click="handlerSearch" size="small"/>
                        </el-input>
                    </el-form-item>
                    </el-form>
                </div>
                <el-button size="mini"  style="margin-top: 10px;" type="primary"  @click="addCategory">新增分类</el-button>
            </div>
        </el-card>
        <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;"
         row-key="id" border  highlight-current-row 
         :tree-props="{children: 'child', hasChildren: 'chil'}">
            <el-table-column prop="name" label="分类名称" sortable width="180">
            </el-table-column>
            <el-table-column label="封面" sortable >
                <template slot-scope="scope">
                    <el-image v-if="scope.row.cover"
                        style="width: 60px; height: 60px"
                        :src="$parsePath(scope.row.cover)" fit="cover">
                    </el-image>
                </template>
            </el-table-column>

            <el-table-column label="显示" >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isShow" ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="热门" >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isHot" ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="分类横幅" >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isBanner" ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="推荐" >
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.isRecommand" ></el-switch>
                </template>
            </el-table-column>

            <el-table-column prop="sort" width label="排序" sortable>
            </el-table-column>
            <el-table-column prop="createTime" min-width="100" label="创建日期" sortable>
            </el-table-column>
            <el-table-column prop="modifiedTime" min-width="100" label="创修改期" sortable>
            </el-table-column>

            <el-table-column label="操作" min-width="120" fixed="right">
                <template slot-scope="scope">
                    <el-button v-if="!scope.row.pid" type="text"  @click="handleAddSubCategory(scope.row)" >
                        添加子分类
                    </el-button>
                  <el-button type="text"  @click="handleEditCategory(scope.row)">编辑</el-button>
                  <el-button type="text"  @click="handleDelCategory(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :modal-append-to-body="false" 
            :title="(dialogConfig.isCreate?'创建分类':'编辑分类')"
            :visible.sync="dialogConfig.visible" destroy-on-close :close-on-click-modal="false"
            @close="closeDialog()">
            <add-category :isCreate="dialogConfig.isCreate" :parentConfig="dialogConfig.parentConfig" :initCategory="dialogConfig.initCategory"
                @closeDialog="closeDialog()" @refreshTable="refreshTable()"></add-category>
        </el-dialog>
    </div>    
</template>

<script>
import addCategory from "./addCategory.vue"
import pageUtils from "@/util/pageUtils"
import { listReceiptCategory,delReceiptCategory } from "@/api/func/receipCategory"
import { $parsePath } from "@/util/global"

export default {
    components: {
        addCategory
    },
    data(){
        return {
            dialogConfig:{ // 弹出对话框的配置
                visible: false, // 展示状态
                isCreate: true, // 是否创建
                parentConfig: {
                    pId: "",
                    name: "", // 父类名称
                }, // 父级菜单的信息
                initCategory: {}// 用来初始化分类的信息
            },
            tableData: [], // 展示的菜谱分类数据
            shortlist: { // 筛选的查询对象
                status: -1, // 展示状态
                name: "" // 分类名称
            }, 
            searchObj: { // 查询对象
                isParent: false, // 开启父分类查找
                name: "",
                isShow: null,
                isHot: false,
                isBanner: false,
                isRecommand: false
            }
        }
    },
    created(){
        console.log("FF")
        pageUtils.registerTag(this.$store, this.$route);
        this.getTableData(this.searchObj)
    },
    methods: {
        // 关闭弹窗
        closeDialog(){
            this.dialogConfig = { // 弹出对话框的配置
                visible: false, // 展示状态
                isCreate: true, // 是否创建
                parentConfig: {
                    pId: "",
                    name: "", // 父类名称
                }, // 父级菜单的信息
                initCategory: {}// 用来初始化分类的信息
            }
        },
        // 删除分类
        handleDelCategory(record){
            this.$confirm(record.pId?"是否删除该分类":"是否同所属的子分类删除", "提示", {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then( () => {
                delReceiptCategory(record.id).then( resp => {
                    if(resp && resp.code == 200){
                        this.$message.success("删除成功")
                    }else{
                        this.$message.error(resp.message)
                    }
                }).catch( e => {
                    this.$message.error("删除失败")
                }).finally( () => {
                    this.getTableData(this.searchObj)
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
                this.dialogConfig.parentConfig.name = row.name
            }else{
                this.dialogConfig.parentConfig.pId = ""
                this.dialogConfig.parentConfig.name = ""
            }
        },
        // 绑定添加的子分类
        handleAddSubCategory(row){
            this.dialogConfig.visible = true
            this.dialogConfig.parentConfig.name = row.name
            this.dialogConfig.parentConfig.pId = row.id
        },

        // 刷新表格
        refreshTable(){
            this.getTableData(this.searchObj,{ page: 1, size: 10 })
            this.dialogConfig.visible = false
        },
        // 获得表格数据
        getTableData(searchObj){
            listReceiptCategory(searchObj).then( resp => {
                this.tableData = resp.data.data
            })
        },
        // 新增分类
        addCategory(){
            this.dialogConfig = { // 弹出对话框的配置
                visible: true, // 展示状态
                isCreate: true, // 是否创建
                parentConfig: {
                    pId: "",
                    name: "", // 父类名称
                }
            }
        },
        // 绑定筛选条件的查询
        handlerSearch(){
            this.getTableData(this.searchObj)
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