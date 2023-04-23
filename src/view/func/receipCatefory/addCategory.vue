<template>
    <div>
        <el-form ref="editParam" :model="editParam" label-width="130px">
            <el-form-item v-if="parentConfig.name" label="父分类名称"  >
                <el-input v-model="parentConfig.name" disabled placeholder="分类名称" />
            </el-form-item>
            <el-form-item label="分类名称" prop="name"  :rules="[{ required:true,message:'请输入分类名称',trigger:['blur','change'] }]">
                <el-input v-model="editParam.name"  placeholder="分类名称" />
            </el-form-item>
            <!-- 如果父分类存在 则这个不创建 -->
            <el-form-item v-if="!parentConfig.name" label="一级分类图片" >
                <el-upload class="upload" ref="upload" drag :action="uploadPath" :headers="header" :limit="1" :multiple="false"
                    :file-list="uploadObj.fileList" list-type="picture-card" :auto-upload="true" 
                    :on-success="uploadSuccess" :before-upload="uploadBefore">
                    <!-- <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div> -->
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{file}">
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)" >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span v-if="!uploadObj.disabled" class="el-upload-list__item-delete" 
                                @click="handleRemove(file)">
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否显示" prop="isShow" >
                <el-switch v-model="editParam.isShow" >
                </el-switch>
            </el-form-item>
            <el-form-item label="标记为热门" prop="isHot" >
                <el-switch v-model="editParam.isHot" >
                </el-switch>
            </el-form-item>
            <el-form-item label="出现在横幅" prop="isBanner" >
                <el-switch v-model="editParam.isBanner" >
                </el-switch>
            </el-form-item>
            <el-form-item label="出现在左边的推荐" prop="isRecommand" >
                <el-switch v-model="editParam.isRecommand" >
                </el-switch>
            </el-form-item>
            <el-form-item label="排序" prop="sort" >
                <el-input-number v-model="editParam.sort" :min="0" :max="99999"></el-input-number>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" :loading="loadingStatus" @click="handlerSubmit('editParam')">{{ isCreate?'创建':'编辑' }}</el-button>
                <el-button @click="handlerClose()">取消</el-button>
            </el-form-item>
        </el-form>
        <el-dialog class="preview-dialog" :modal="false" :modal-append-to-body="false" :visible.sync="uploadObj.disabled">
            <img width="100%" :src="uploadObj.previewUrl" alt="">
        </el-dialog>
    </div>    
</template>

<script>
import { getToken } from '@/util/tokenUtils';
import { defaultUploadPath,defaultHeader,defaultLimitFileSize,defaultLimitFileDesc } from "@/settings"
import { saveReceiptCategory,updateReceiptCategory } from "@/api/func/receipCategory"

export default {
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
            uploadPath: defaultUploadPath, // 上传地址
            header: {}, // 发送数据的头部地址
            editParam: { // 需要进行创建或者修改的存放对象
                name: "", // 分类名称
                cover: "", // 封面图片
                isShow: true, // 是否展示该菜单
                isHot: false, // 是否标记为热门
                isBanner: false, // 菜谱可以出现在横条的筛选上
                isRecommand: false, // 出现做首页左边的推荐栏
                sort: 0,
            },
            uploadObj: { // 上传功能组件的控制对象
                previewUrl: "",
                disabled: false, 
                fileList: [], // 初始化的文件列表
            },
            loadingStatus: false // 加载状态
        }
    },
    destroyed(){
        console.log("ADD destroyed")
    },
    created(){
        console.log("this ",this)
        // 将默认头进行绑定
        this.header = defaultHeader
        // 初始化登录的token信息
        this.header['token'] = getToken()
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
                this.uploadObj.fileList=[tempFile]
            }
        }
    },
    methods: {
        // 上传的图片进行预览
        handlePictureCardPreview(file){
            console.log("PREVIEW FILE ",file)
            this.uploadObj.previewUrl = file.url;
            this.uploadObj.disabled = true;
        },
        // 绑定上传的图片删除
        handleRemove(){
            this.uploadObj.fileList = []
        },
        // 绑定提交的内容
        handlerSubmit(ref){
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
            if(isCreate){   
                saveReceiptCategory(editParam).then( resp => {
                    if(resp && resp.code == 200){
                        this.$message.success('创建成功')
                    }else{
                        this.$message.error(resp.message)
                    }
                    this.$emit("closeDialog")   
                    this.$emit("refreshTable")
                }).catch( e => {
                    console.log("appear error ",e)
                    this.$message.error('创建失败，请重新尝试')
                })
            }else{
                updateReceiptCategory(editParam).then( resp => {
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
        // 上传之前
        uploadBefore(file){
            if(this.uploadObj.fileList.length > 0){
                this.$message.error("只能上传一个内容")
                return false
            }
            if(file.size > defaultLimitFileSize){
                this.$message.error(`上传文件的最大大小为${defaultLimitFileDesc}`)
                return false
            }
            return true
        },
        // 上传成功的处理
        uploadSuccess(response,file){
            console.log(" uploadSuccess response ",response,file)
            this.editParam.cover = response.data.data.name
            let tempFile = {
                name: file.name,
                // url: this.$parsePath(response.data.data.name)
                url: file.url
            }
            this.uploadObj.fileList=[tempFile]
            this.$message.success("上传成功")
        }
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
</style>