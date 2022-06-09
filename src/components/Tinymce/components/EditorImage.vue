<template>
    <div class="upload-container">
        <el-button
            :style="{ background: color, borderColor: color }"
            icon="UploadFilled"
            type="primary"
            size="small"
            @click="dialogVisible = true"
        >
            上传
        </el-button>
        <el-dialog :modal="false" v-model="dialogVisible">
            <el-upload
                :multiple="true"
                :file-list="fileList"
                :show-file-list="true"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :before-upload="beforeUpload"
                class="editor-slide-upload"
                list-type="picture-card"
                action="http://192.168.2.222:8085/upload/file"
            >
                <el-button size="small" type="primary"> 点击上传 </el-button>
            </el-upload>
            <el-button @click="dialogVisible = false"> 取消 </el-button>
            <el-button type="primary" @click="handleSubmit"> 确定 </el-button>
            <!-- <UploadImage
                ref="upload"
                :limit="10"
                uploadType="qn"
                v-model="imageList"
                listType="picture-card"
                :autoUpload="true"
            /> -->
        </el-dialog>
    </div>
</template>

<script>
import UploadImage from "@/components/UploadImage";

export default {
    name: "EditorSlideUpload",
    props: {
        color: {
            type: String,
            default: "#1890ff",
        },
    },
    components: {
        UploadImage,
    },
    data() {
        return {
            dialogVisible: false,
            listObj: {},
            fileList: [],
            imageList: [],
        };
    },
    methods: {
        checkAllSuccess() {
            return Object.keys(this.listObj).every(
                (item) => this.listObj[item].hasSuccess
            );
        },
        handleSubmit() {
            const arr = Object.keys(this.listObj).map((v) => this.listObj[v]);
            if (!this.checkAllSuccess()) {
                this.$message(
                    "Please wait for all images to be uploaded successfully. If there is a network problem, please refresh the page and upload again!"
                );
                return;
            }
            this.$emit("successCBK", arr);
            this.listObj = {};
            this.fileList = [];
            this.dialogVisible = false;
        },
        handleSuccess(response, file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    // this.listObj[objKeyArr[i]].url = response.files.file;
                    this.listObj[objKeyArr[i]].url = response.data;
                    this.listObj[objKeyArr[i]].hasSuccess = true;
                    return;
                }
            }
        },
        handleRemove(file) {
            const uid = file.uid;
            const objKeyArr = Object.keys(this.listObj);
            for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                    delete this.listObj[objKeyArr[i]];
                    return;
                }
            }
        },
        beforeUpload(file) {
            const _self = this;
            const _URL = window.URL || window.webkitURL;
            const fileName = file.uid;
            this.listObj[fileName] = {};
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = _URL.createObjectURL(file);
                img.onload = function () {
                    _self.listObj[fileName] = {
                        hasSuccess: false,
                        uid: file.uid,
                        width: this.width,
                        height: this.height,
                    };
                };
                resolve(true);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.editor-slide-upload {
    margin-bottom: 20px;
    ::v-deep .el-upload-list {
        width: 100%;
    }
}
</style>
