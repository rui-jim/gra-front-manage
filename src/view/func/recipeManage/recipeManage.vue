<template>
    <div style="position: relative;">
        <el-dialog :modal-append-to-body="false" 
            title="禁用菜谱" width="30%"
            :visible="disableDialog.visible" :close-on-click-modal="false"
            @close="closeDisableDialog">
            <el-form label-width="130px">
                <el-form-item label="请填写禁用理由">
                    <el-input v-model="disableDialog.editParam.forceTakeReason"/>
                </el-form-item>
                <el-form-item>
                    <el-button @click="disableDialog.visible = false">取消</el-button>
                    <el-button type="primary" @click="handlerDisableRecipe()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-card class="box-card" style="margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <div class="container">
                    <el-form inline size="small">
                        <el-form-item label="菜谱名称：">
                            <el-input v-model="searchObj.name" placeholder="菜谱名称" class="selWidth" size="small" clearable
                                @blur="handlerSearch">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="菜谱分类" style="margin-right: 40px;">
                            <el-cascader v-model="searchObj.cateId" :options="categoryList" 
                                @change="handlerCascaderChange"></el-cascader>
                        </el-form-item>
                        <el-form-item label="处理时间" style="margin-right: 40px;">
                            <div style="width: 300px; display: flex;align-items: center;">
                                <el-input v-model="searchObj.takeTime" style="width: 200px;" 
                                    placeholder="请输入处理时间" class="selWidth" clearable
                                    @blur="handlerSearch">
                                </el-input>
                                <el-select v-model="searchObj.takeUnit" placeholder="选择菜谱分类" class="selWidth" @change="handlerSearch">
                                    <el-option label="" :value="''">
                                    </el-option>
                                    <el-option v-for="(item,index) in unitOption" :key="index"
                                        :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-form-item>
                        <el-form-item label="强制下架" style="margin-right: 40px;">
                            <el-select v-model="searchObj.isForceTake" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-button size="mini"  style="margin-top: 10px;" type="primary"  @click="handlerSearch">搜索</el-button>
                    <el-button size="mini"  style="margin-top: 10px;" type="success"  @click="resetSearch">重置</el-button>
                </div>
            </div>
        </el-card>

        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" 
          style="width: 100%;padding: 20px;" >
        <!-- <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" height="auto"
         row-key="id" border  highlight-current-row > -->
         <el-table-column prop="unickname" label="用户昵称" width="100">
          </el-table-column>
          <el-table-column prop="uavatar" label="用户头像" >
            <template slot-scope="scope">
                <el-image v-if="scope.row.uavatar"
                    style="width: 60px; height: 60px"
                    :src="$parsePath(scope.row.uavatar)" fit="cover">
                </el-image>
              </template>
          </el-table-column>
          <el-table-column prop="name" label="菜谱名称">
            <template slot-scope="scope">
                <el-popover trigger="hover" placement="top">
                <p>菜谱描述: {{ scope.row.description }}</p>
                <div slot="reference" class="name-wrapper">
                    <el-tag size="medium">{{ scope.row.name }}</el-tag>
                </div>
                </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="cover" label="菜谱封面"  width="200">
            <template slot-scope="scope">
                <el-image v-if="scope.row.cover"
                    style="width: 60px; height: 60px"
                    :src="$parsePath(scope.row.cover)" fit="cover">
                </el-image>
            </template>
          </el-table-column>
          <el-table-column label="处理时间" width="150">
            <template slot-scope="scope">
                {{ scope.row.takeTime + " " + formatUnit(scope.row.takeUnit)}}
            </template>
          </el-table-column>
          <el-table-column prop="isForceTake" label="是否下架" width="120">
            <template slot-scope="scope">
                <el-popover v-if="scope.row.forceTakeReason" trigger="hover" placement="top">
                    <p>下架原因描述: {{ scope.row.forceTakeReason }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-switch v-model="scope.row.isForceTake" @change="handlerTakeDown(scope.row)"></el-switch>
                    </div>
                </el-popover>
                <el-switch v-else v-model="scope.row.isForceTake" @change="handlerTakeDown(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="发表时间" sortable width="200">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="120">
            <template slot-scope="scope">
                <el-button size="small" type="text" @click="dialogParam.visible = true">详情</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: center;align-items: center;margin: 25px 0;">
            <el-pagination layout="prev, pager, next" :background="true" :total="paginition.totalCount" 
                :current-page="pageParam.PAGE" :page-size="pageParam.SIZE" @current-change="handlerPageChange"> </el-pagination>
        </div>
        <el-dialog :visible.sync="dialogParam.visible" width="100%" :modal="false" style="margin-left: 185px;">
            <iframe src="http://localhost:5000/detail/5ebbd6bb8fb3d2cf2d58972737a3af79" style="width:100%;height:520px;border:none;"></iframe>
        </el-dialog>
    </div>
</template>

<script>
import { getRecipeList,putTakedownRecipe } from "@/api/func/recipeManage"
import { defaultPage,DEFAULT_UNIT_OPTIONS } from "@/settings"
import { listReceiptCategory } from "@/api/func/recipeCategory"


export default {
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
            unitOption: DEFAULT_UNIT_OPTIONS,
            searchObj: { // 查询对象
                name: "", // 菜谱名称
                cateId: null, // 查找的菜谱分类
                isForceTake: null, // 是否被下架
                takeTime: null, // 处理时间
                takeUnit: "" // 处理的时间单位
            },
            dialogParam: {
                visible: false,
            },
            disableDialog:{ // 禁用弹窗
                visible: false,
                desc: "", // 弹窗描述
                recipe: "", // 存放操作用户对象
                key: "", // 操作的键
                editParam:{
                    forceTakeReason: "", // 释放时间
                    isForceTake: false, // 下架状态
                    id: "" // 禁用的用户ID
                }
            },
        }
    },
    created(){
        this.pageParam = this.$util.deepClone(defaultPage)
        this.initRecipeData()
        this.initCategoryList()
    },
    methods: {
        // 绑定下架菜谱
        handlerTakeDown(row){
            console.log("take down row",row)
            if(row.isForceTake){
                this.disableDialog.editParam.id = row.id,
                this.disableDialog.editParam.isForceTake = row.isForceTake,
                this.disableDialog.visible = true
                this.disableDialog.recipe = row
            }else{
                this.$confirm("是否取消对该菜谱的下架", "提示", {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then( () => {
                    let tempEditParam = {
                        id: row.id,
                        isForceTake: row.isForceTake,
                        forceTakeReason: ""
                    }
                    putTakedownRecipe(tempEditParam).then( resp => {
                        if(resp && resp.code == 200){
                            this.$message.success(resp.message)
                        }else{
                            this.$message.error(resp.message)
                        }
                        // 刷新内容
                        this.initRecipeData()
                    })
                }).catch(()=>{
                    row.isForceTake = !row.isForceTake
                })
                
            }
        },
        // 绑定提交禁止菜谱
        handlerDisableRecipe(){
            // 如果选择时间小于当前时间
            if(this.disableDialog.editParam.forceTakeReason.length == 0){
                this.$message.warning("请填写下架原因");
                return
            }
            let tempEditParam = this.$util.deepClone(this.disableDialog.editParam)
            putTakedownRecipe(tempEditParam).then( resp => {
                if(resp && resp.code == 200){
                    this.$message.success(resp.message)
                }else{
                    this.$message.error(resp.message)
                }
                this.disableDialog.visible = false
                // 刷新内容
                this.initRecipeData()
            })
        },
        // 关闭操作弹窗
        closeDisableDialog(){
            this.disableDialog.editParam.forceTakeReason = ""
            this.disableDialog.visible = false
            this.disableDialog.recipe.isForceTake = !this.disableDialog.recipe.isForceTake
        },
        // 初始化分类列表
        initCategoryList(){
            listReceiptCategory().then( resp => {
                let tempList = resp.data.data
                this.categoryList = tempList.map( val => {
                    return {
                        label: val.name,
                        value: val.id,
                        children: val.child.map(value => {
                            return {
                                label: value.name,
                                value: value.id
                            }
                        })
                    }
                })
                console.log("this init category list ",this.categoryList)
            })
        },
        // 格式化时间单位
        formatUnit(takeUnit){
            let str = ""
            this.unitOption.forEach(val => {
                if(val.value == takeUnit){
                    str = val.label
                    return 
                }
            })
            return str
        },
        handlerCascaderChange(){
            this.searchObj.cateId = this.searchObj.cateId[this.searchObj.cateId.length - 1]
            this.handlerSearch()
        },
        // 重置搜索
        resetSearch(){
            this.searchObj = { // 查询对象
                name: "", // 菜谱名称
                cateId: null, // 查找的菜谱分类
                isForceTake: false, // 是否被下架
                takeTime: null, // 处理时间
                takeUnit: "" // 处理的时间单位
            }
            this.handlerSearch()
        },
        // 绑定筛选条件的查询
        handlerSearch(){
            console.log(" handlerSearch ",this.searchObj)
            this.initRecipeData()
        },
        // 绑定页面页码变化
        handlerPageChange(page){
            this.pageParam.PAGE = page
            this.initRecipeData()
        },
        // 初始化用户信息
        initRecipeData(){
            getRecipeList({...this.searchObj,...this.pageParam}).then(resp => {
                console.log("getRecipeList init category list ",this.categoryList)
                this.tableData = resp.data.data.records
                this.paginition.totalCount = resp.data.data.total
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