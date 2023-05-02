<template>
    <div>
        <el-form ref="editParam" :model="editParam" :rules="editRules" label-width="130px">
            <el-form-item label="角色名称" prop="rName" >
                <el-input v-model="editParam.rName"  placeholder="请输入角色名称" />
            </el-form-item>
            <el-form-item label="角色描述"  prop="rDescription">
                <el-input v-model="editParam.rDescription"  placeholder="请输入角色描述" />
            </el-form-item>
            <el-form-item label="是否有效">
                <el-switch v-model="editParam.isShow" >
                </el-switch>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="editParam.sort" :min="0" :max="99999"></el-input-number>
            </el-form-item>
            <el-form-item label="管理菜单" >
                <!-- <el-cascader-panel  v-model="editParam.componentList" :options="componentList" 
                    @change="handlerCascaderChange">
                    
                </el-cascader-panel> -->
                <el-cascader v-model="editParam.componentList" :options="componentList"
                     :props="cascaderProps" clearable
                    @change="handlerCascaderChange"></el-cascader >
            </el-form-item>
            <el-form-item>
                <el-button @click="handlerClose()">取消</el-button>
                <el-button type="primary" :loading="loadingStatus" @click="handlerSubmit('editParam')">{{ isCreate?'创建':'编辑' }}</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
// import { defaultUploadPath,defaultHeader,defaultLimitFileSize,defaultLimitFileDesc } from "@/settings"
import selectIcon from "@/components/selectIcon/selectIcon.vue"
import { editRules } from "./field"
import { postSaveRole,putUpdatetRole,getRoleComponentList } from "@/api/func/roleManage"


export default {
    components: {
        selectIcon
    },
    props: {
        isCreate: { // 是否创建分类
            type: Boolean,
            required: true,
            default: true
        },
        initCategory: { // 初始化的编辑信息
            type: Object,
            default: () => { return {} }
        },
        componentList: {
            type: Array,
            default: ()=>[]
        }
    },
    watch: {
        componentList: ()=>{},
        initCategory: {
            handler(newVal){
                if(newVal.rid){
                    getRoleComponentList({rId: newVal.rid}).then(resp => {
                        let tempList = resp.data.data.map(val => {
                            return [val.pid,val.id]
                        })
                        this.$set(this.editParam,'componentList',tempList)
                    })
                }
            },
            immediate: true
        }
    },
    data(){
        return {
            editRules: editRules,
            // uploadPath: defaultUploadPath, // 上传地址
            // header: {}, // 发送数据的头部地址
            cascaderProps: { multiple: true,emitPath:true},
            editParam: { // 需要进行创建或者修改的存放对象
                rName: "", //角色名称
                isShow: true, // 是否有效
                rDescription: "", // 描述信息
                componentList: [], // 绑定的组件列表
                sort: 0
            },
            // uploadObj: { // 上传功能组件的控制对象
            //     previewUrl: "",
            //     disabled: false, 
            //     fileList: [], // 初始化的文件列表
            // },
            loadingStatus: false // 加载状态
        }
    },
    created(){
        console.log("this ",this)
        // 如果是编辑则初始化信息
        if(!this.isCreate){
            this.editParam = this.$util.deepClone(this.initCategory)
        }
    },
    methods: {
        // 绑定cascader的改变
        handlerCascaderChange(cascaderVal){
            console.log("cascaderVal icon ",this.editParam.componentList)
        },
        // 选择好的icon
        chooseIcon(iconName){
            this.editParam.icon = iconName
        },
        // 绑定提交的内容
        handlerSubmit(ref){
            this.$set(this,'loadingStatus',true)
            this.$util.debounce(()=>{
                this.$refs[ref].validate( valid => {
                    if(!valid) return
                    this.$util.debounce(this.handlerSaveOrUpdate(this.isCreate),1000)
                })
            })
        },
        // 进行保存或者修改内容
        handlerSaveOrUpdate(isCreate){

            // 进行一次深拷贝
            let editParam = this.$util.deepClone(this.editParam)
            let setArr = new Set()
            editParam.componentList.forEach(val => {
                val.forEach( value => {
                    setArr.add(value)
                })
            })
            editParam.componentList = [...setArr]

            // 将得到的副本 判断是否拥有父分类
            if(isCreate){   
                postSaveRole(editParam).then( resp => {
                    if(resp && resp.code == 200){
                        this.$message.success('创建成功')
                    }else{
                        this.$message.error(resp.message)
                    }
                    this.$emit("closeDialog")   
                    this.$emit("refreshTable")
                    this.loadingStatus = false
                }).catch( e => {
                    console.log("appear error ",e)
                    this.$message.error('创建失败，请重新尝试')
                })
            }else{
                putUpdatetRole(editParam).then( resp => {
                    if(resp && resp.code == 200){
                        this.$message.success('编辑成功')
                    }else{
                        this.$message.error(resp.message)
                    }
                    this.$emit("closeDialog")
                    this.$emit("refreshTable")
                    this.loadingStatus = false
                }).catch( e => {
                    console.log("appear error ",e)
                    this.$message.error('编辑失败，请重新尝试')
                })
            }
            
        },
        // 绑定取消对话框
        handlerClose(){
            this.$emit("closeDialog")
        },
        
    }
}
</script>

<style lang="scss" scoped>


.upload{

    ::v-deep .el-upload-dragger{
        width: 200px;
        height: 150px;  
    }
    /* width: 200px;
    height: 150px; */
}

.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}

.avatar-uploader {
  border: 1px dashed #4C4D4F;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: .2s;;
  width: 227px !important;
  height: 168px;

  ::v-deep .el-upload-dragger {
    width: 227px !important;
    height: 168px !important;
  }
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 227px !important;
  height: 168px;
  text-align: center;
}
.avatar{
    width: 227px !important; 
    height: 168px;
}
</style>