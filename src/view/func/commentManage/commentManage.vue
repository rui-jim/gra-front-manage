<template>
    <div>
        <el-card class="box-card" style="margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <div class="container">
                    <el-form inline size="small">
                        <el-form-item label="评论用户昵称：" style="margin-right: 40px;">
                            <el-input v-model="searchObj.uNickname" placeholder="请输入评论的用户名昵称" class="selWidth" size="small" clearable
                                @blur="handlerSearch">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="菜谱名称：" style="margin-right: 40px;">
                            <el-input v-model="searchObj.rName" placeholder="请输入菜谱名称" class="selWidth" size="small" clearable
                                @blur="handlerSearch">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="菜谱分类" style="margin-right: 40px;">
                            <el-cascader v-model="searchObj.cateId" :options="categoryList" 
                                @change="handlerCascaderChange"></el-cascader>
                        </el-form-item>
                        <el-form-item label="禁用状态" style="margin-right: 40px;">
                            <el-select v-model="searchObj.isBan" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                    <el-button size="mini"  style="margin-top: 10px;" type="primary"  @click="handlerSearch">搜索</el-button>
                </div>
            </div>
        </el-card>

        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" 
          style="width: 100%;padding: 20px;" >
        <!-- <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" height="auto"
         row-key="id" border  highlight-current-row > -->
         <el-table-column prop="rname" label="评论菜谱">
          </el-table-column>
          <el-table-column label="菜谱图片" >
            <template slot-scope="scope">
                <el-image v-if="scope.row.rcover"
                    style="width: 60px; height: 60px"
                    :src="$parsePath(scope.row.rcover)" fit="cover">
                </el-image>
              </template>
          </el-table-column>
          <el-table-column prop="unickname" label="评论用户昵称">
          </el-table-column>
          <el-table-column label="用户头像" >
            <template slot-scope="scope">
                <el-image v-if="scope.row.uavatar"
                    style="width: 60px; height: 60px"
                    :src="$parsePath(scope.row.uavatar)" fit="cover">
                </el-image>
              </template>
          </el-table-column>
          <el-table-column prop="content" label="评论内容" width="150">
          </el-table-column>
          <el-table-column prop="isBan" label="禁用评论" width="120">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.isBan" ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="评论时间" sortable width="200">
          </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: center;align-items: center;margin: 25px 0;">
            <el-pagination layout="prev, pager, next" :background="true" :total="paginition.totalCount" 
                :current-page="pageParam.PAGE" :page-size="pageParam.SIZE" @current-change="handlerPageChange"> </el-pagination>
        </div>
    </div>
</template>

<script>
import { getRecipeCommentList } from "@/api/func/recipeComment"
import { defaultPage } from "@/settings"
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
            
            // tProps: { multiple: true }, 
            paginition: {
                totalCount: 1
            },
            searchObj: { // 查询对象
                uNickname: "", // 查找的用户昵称
                rName: "", // 查找的邮箱
                cateId: "",
                isBan: null // 是否被禁止
            }
        }
    },
    created(){
        this.pageParam = this.$util.deepClone(defaultPage)
        this.initRecipeComment()
        this.initCategoryList()
    },
    methods: {
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
        handlerCascaderChange(){
            this.searchObj.cateId = this.searchObj.cateId[this.searchObj.cateId.length - 1]
            this.handlerSearch()
        },
        // 绑定筛选条件的查询
        handlerSearch(){
            this.initRecipeComment()
        },
        // 绑定页面页码变化
        handlerPageChange(page){
            this.pageParam.PAGE = page
            this.initRecipeComment()
        },
        // 初始化用户信息
        initRecipeComment(){
            getRecipeCommentList({...this.searchObj,...this.pageParam}).then(resp => {
                console.log("initUserData resp ",resp)
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