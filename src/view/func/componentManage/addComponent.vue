<template>
    <div>
        <el-form ref="editParam" :model="editParam" :rules="editRules" label-width="130px">
            <el-form-item v-if="parentConfig.title" label="父菜单名称"  >
                <el-input v-model="parentConfig.title" disabled />
            </el-form-item>
            <el-form-item label="菜单标题" prop="title" >
                <el-input v-model="editParam.title"  placeholder="请输入菜单标题" />
            </el-form-item>
            <el-form-item label="组件名称">
                <el-input v-model="editParam.name"  placeholder="请输入组件名称" />
            </el-form-item>
            <el-form-item label="组件路径">
                <el-input v-model="editParam.component"  placeholder="请输入组件路径" />
            </el-form-item>
            <el-form-item label="配置权限">
                <el-input v-model="editParam.permission"  placeholder="请输入配置权限" />
            </el-form-item>
            <el-form-item label="是否隐藏">
                <el-switch v-model="editParam.hidden" >
                </el-switch>
            </el-form-item>
            <el-form-item label="排序">
                <el-input-number v-model="editParam.sort" :min="0" :max="99999"></el-input-number>
            </el-form-item>
            <el-form-item label="菜单路径" prop="path" >
                <el-input v-model="editParam.path"  placeholder="请输入菜单路径" />
            </el-form-item>
            <el-form-item label="菜单图标" >
                <!-- <el-input v-model="editParam.icon"  placeholder="请选择菜单图标" /> -->
                <select-icon @chooseIcon="chooseIcon"></select-icon>
            </el-form-item>
            <el-form-item>
                <el-button @click="handlerClose()">取消</el-button>
                <el-button type="primary" :loading="loadingStatus" @click="handlerSubmit('editParam')">{{ isCreate?'创建':'编辑' }}</el-button>
            </el-form-item>
        </el-form>
    </div>    
</template>

<script>
import { getToken } from '@/util/tokenUtils';
// import { defaultUploadPath,defaultHeader,defaultLimitFileSize,defaultLimitFileDesc } from "@/settings"
import selectIcon from "@/components/selectIcon/selectIcon.vue"
import { editRules } from "./field"
import { postSaveComponent,putUpdateComponent } from "@/api/func/component"


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
        parentConfig: { // 父分类配置
            type: Object,
            default: () => { return {} }
        },
        initCategory: { // 初始化的编辑信息
            type: Object,
            default: () => { return {} }
        }
    },
    // watch: {
    //     isCreate(){},
    //     parentConfig(){},
    //     initCategory(){
    //         this.editParam = this.initCategory
    //         this.$nextTick(() => {
    //             this.$refs['editParam'].validate()
    //         })
    //     }
    // },
    data(){
        return {
            editRules: editRules,
            // uploadPath: defaultUploadPath, // 上传地址
            // header: {}, // 发送数据的头部地址
            editParam: { // 需要进行创建或者修改的存放对象
                title: "", // 菜单标题
                name: "", // 路由名称
                icon: "", // 使用的图标
                component: "", // 菜单组件
                path: "", // 菜单路径
                hidden: false, // 是否隐藏
                permission: "",
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
            // 初始化图片
            if(!this.parentConfig.id && this.editParam.cover){
                let tempFile = {
                    name: this.editParam.cover,
                    url: this.$parsePath(this.editParam.cover)
                    // url: file.url
                }
                // this.uploadObj.fileList=[tempFile]
            }
        }
    },
    methods: {
        // 选择好的icon
        chooseIcon(iconName){
            console.log("chose icon ",iconName)
            this.editParam.icon = iconName
        },
        // 绑定提交的内容
        handlerSubmit(ref){
            this.$set(this,'loadingStatus',true)
            this.$refs[ref].validate( valid => {
                if(!valid) return
                this.$util.debounce(this.handlerSaveOrUpdate(this.isCreate),1000)
            })
        },
        // 进行保存或者修改内容
        handlerSaveOrUpdate(isCreate){
            console.log("DEBU")
            // 进行一次深拷贝
            let editParam = this.$util.deepClone(this.editParam)
            // 将得到的副本 判断是否拥有父分类
            if(this.parentConfig.pId){
               editParam.pId = this.parentConfig.pId
            }
            if(this.isCreate){   
                postSaveComponent(editParam).then( resp => {
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
                putUpdateComponent(editParam).then( resp => {
                    if(resp && resp.code == 200){
                        this.$message.success('编辑成功')
                    }else{
                        this.$message.error(resp.message)
                    }
                    this.$emit("closeDialog")
                    this.$emit("refreshTable")
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