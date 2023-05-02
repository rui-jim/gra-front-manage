<template>
    <div>
        <el-dialog :modal-append-to-body="false" 
            title="授予权限" width="30%"
            :visible="dialogConfig.visible" :close-on-click-modal="false"
            @close="dialogConfig.visible = false">
            <el-form ref="editParam" label-width="130px">
                <el-form-item label="用户昵称">
                    <el-input v-model="dialogConfig.editParam.uNickname" disabled/>
                </el-form-item>
                <el-form-item label="角色信息" :rules="{require: true,message:'请选择角色信息',min:1}">
                    <el-cascader v-model="dialogConfig.editParam.rIdList" :props="perCascaderProps"
                        :options="dialogConfig.roleOption" @change="changeRole" clearable></el-cascader >
                </el-form-item>
                <el-form-item>
                    <el-button @click="dialogConfig.visible = false">取消</el-button>
                    <el-button type="primary" :loading="loadingStatus" @click="handlerGrantSubmit()">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-card class="box-card" style="margin-bottom: 20px;">
            <div slot="header" class="clearfix">
                <div class="container">
                    <el-form inline size="small">
                        <el-form-item label="性别" style="margin-right: 40px;">
                            <el-select v-model="searchObj.uGender" placeholder="筛选性别" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="男" :value="1"></el-option>
                                <el-option label="女" :value="0"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="能否跳转后台" style="margin-right: 40px;">
                            <el-select v-model="searchObj.isGoBack" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="禁止用户登录" style="margin-right: 40px;">
                            <el-select v-model="searchObj.isDisableUser" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="禁止用户评论" style="margin-right: 40px;">
                            <el-select v-model="searchObj.isDisableDiscuss" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="禁止发表菜谱" style="margin-right: 40px;">
                            <el-select v-model="searchObj.isDisablePublishRecipe" class="selWidth" @change="handlerSearch">
                                <el-option label="" :value="null"></el-option>
                                <el-option label="是" :value="true"></el-option>
                                <el-option label="否" :value="false"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="电子邮箱：" style="margin-right: 40px;">
                            <el-input v-model="searchObj.uEmail" placeholder="请输入搜索的邮箱" class="selWidth" size="small" clearable
                                @blur="handlerSearch">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="名称：" style="margin-right: 40px;">
                            <el-input v-model="searchObj.uNickname" placeholder="请输入搜索的用户名昵称" class="selWidth" size="small" clearable
                                @blur="handlerSearch">

                            </el-input>
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
         <el-table-column prop="unickname" label="用户昵称">
            <!-- <template slot-scope="scope">
                <el-popover v-if="scope.row.rname" trigger="hover" placement="top">
                    <p>所属角色: {{ scope.row.rname }}</p>
                    <div slot="reference" class="name-wrapper">
                        <el-tag size="medium">{{ scope.row.unickname }}</el-tag>
                    </div>
                </el-popover>
                <div v-else>{{ scope.row.unickname }}</div>
            </template> -->
          </el-table-column>
          <el-table-column prop="uavatar" label="图片" >
            <template slot-scope="scope">
                <el-image v-if="scope.row.uavatar"
                    style="width: 60px; height: 60px"
                    :src="$parsePath(scope.row.uavatar)" fit="cover">
                </el-image>
              </template>
          </el-table-column>
          <el-table-column prop="ugender" label="性别">
            <template slot-scope="scope">
                {{ scope.row.ugender == 1?'男':'女' }}
            </template>
          </el-table-column>
          <el-table-column prop="uemail" label="绑定邮箱"  width="200">
          </el-table-column>
          <el-table-column prop="uname" label="自定义账号" width="150">
          </el-table-column>
          <el-table-column prop="isDisableUser" label="禁止用户登录" width="120">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.isDisableUser" disabled ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isDisableDiscuss" label="禁止用户评论" width="120">
            <template slot-scope="scope">
                <el-switch v-model="scope.row.isDisableDiscuss" ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="isDisablePublishRecipe" label="禁止用户发表菜谱" >
            <template slot-scope="scope">
                <el-switch v-model="scope.row.isDisablePublishRecipe" ></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="加入时间" sortable width="200">
          </el-table-column>
          <el-table-column prop="modifiedTime" label="最近一次修改信息" sortable width="200">
          </el-table-column>
          <el-table-column prop="pwdModifiedTime" label="最后一次修改密码" sortable width="200">
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="100" >
                <template slot-scope="scope">
                    <div  style="display: flex;justify-content: center;align-items: center;">
                        <el-button type="text"  @click="grantPermission(scope.row)">授予权限</el-button>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div style="display: flex;justify-content: center;align-items: center;margin: 25px 0;">
            <el-pagination layout="prev, pager, next" :background="true" :total="paginition.totalCount" 
                :current-page="pageParam.PAGE" :page-size="pageParam.SIZE" @current-change="handlerPageChange"> </el-pagination>
        </div>
    </div>
</template>

<script>
import { getRoleList } from "@/api/func/roleManage"
import { getUserList,putUpdateUserRole,getUserRole } from "@/api/func/userManage"
import { defaultPage } from "@/settings"

export default {
    data(){
        return {
            tableData: [], //展示表格的数据
            pageParam: { // 分页信息
                PAGE: 1,
                SIZE: 10
            },
            paginition: {
                totalCount: 1
            },
            dialogConfig:{ // 弹出对话框的配置
                visible: false, // 展示状态
                roleOption: [], // 展示的角色ID选项
                editParam: { // 编辑信息
                    uId: "", // 需要修改的用户ID
                    rIdList: [],// 选中的角色ID
                    uNickname: "", // 用户昵称
                } 
            },
            perCascaderProps:{ // 权限多选的props
                multiple: true
            },
            loadingStatus:false,
            searchObj: { // 查询对象
                uNickname: "", // 查找的用户昵称
                uEmail: "", // 查找的邮箱
                uGender: null, // 筛选性别
                isGoBack: null, // 开启父分类查找
                isDisableUser: null, // 禁止用户登录
                isDisableDiscuss: null, // 禁止用户评论
                isDisablePublishRecipe: null, // 禁止用户发表菜谱
            }
        }
    },
    created(){
        this.pageParam = this.$util.deepClone(defaultPage)
        this.initUserData()
        this.initRoleList()
    },
    methods: {
        changeRole(valList){
            this.dialogConfig.editParam.rIdList = valList.map(val => {
                return val[val.length - 1]
            })
        },
        // 绑定保存权限
        handlerGrantSubmit(){
            this.loadingStatus = true
            this.$util.debounce(()=>{
                putUpdateUserRole(this.dialogConfig.editParam).then(resp => {
                    if(resp && resp.code == 200){
                        this.$message.success(resp.message)
                    }else{
                        this.$message.error(resp.message)
                    }
                    this.dialogConfig.visible = false
                    this.loadingStatus = false
                })
            })
        },
        // 绑定授权
        grantPermission(row){
            this.dialogConfig.editParam.uId = row.uId
            this.dialogConfig.editParam.uNickname = row.unickname
            this.dialogConfig.visible = true
            getUserRole({uId: row.uId}).then(resp => {
                this.dialogConfig.editParam.rIdList = resp.data.data
            })
        },
        // 绑定筛选条件的查询
        handlerSearch(){
            this.initUserData()
        },
        // 绑定页面页码变化
        handlerPageChange(page){
            this.pageParam.PAGE = page
            this.initUserData()
        },
        initRoleList(){
            getRoleList({PAGE:1,SIZE: 9999}).then(resp => {
                let tempRole = resp.data.data.records
                this.dialogConfig.roleOption = tempRole.map(val => {
                    return {
                        label: val.rName,
                        value: val.rid
                    }
                })
                console.log("getRoleList resp ",resp,this.dialogConfig.roleOption)
            })
        },
        // 初始化用户信息
        initUserData(){
            getUserList({...this.searchObj,...this.pageParam}).then(resp => {
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