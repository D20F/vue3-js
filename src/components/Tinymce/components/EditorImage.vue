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
            <UploadImage
                ref="upload"
                :limit="10"
                uploadType="qn"
                v-model="imageList"
                listType="picture-card"
                :autoUpload="true"
            />
            <el-button style="margin-top: 20px" @click="dialogVisible = false">
                取消
            </el-button>
            <el-button
                style="margin-top: 20px"
                type="primary"
                @click="handleSubmit"
            >
                确定
            </el-button>
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
            imageList: [],
        };
    },
    methods: {
        handleSubmit() {
            this.$emit("successCBK", this.imageList);
            this.imageList = [];
            this.dialogVisible = false;
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
