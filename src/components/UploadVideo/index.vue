<template>
    <div>
        <el-upload
            class="upload-demo"
            ref="upload"
            :auto-upload="false"
            action="abcdefg"
            :on-change="onChange"
            :on-remove="onRemove"
            :limit="1"
        >
            <template #trigger>
                <el-button size="small" type="primary">上传视频</el-button>
            </template>
        </el-upload>
        <div class="video" v-if="video">
            <video :src="video" controls="controls"></video>
        </div>
    </div>
</template>
<script>
import { uploadFile } from "@/api/other";
import { ElLoading } from "element-plus";

export default {
    name: "uploadVideo",
    components: {},
    props: {
        video: {
            type: String,
            default: "",
        },
        autoUpload: {
            type: Boolean,
            default: true,
        },
    },
    data() {
        return {
            uploadList: [],
        };
    },
    created() {},
    methods: {
        confirm(file, fileList) {
            // 未主动选择 不上传 直接用外面的url就好了
            if (this.uploadList.length == 0) {
                return this.$emit("uploadSuccess", "");
            }
            let loadingInstance = ElLoading.service({
                text: "上传中",
            });

            let form = new FormData();
            for (const item of this.uploadList) {
                form.append("file", item.raw);
            }
            uploadFile(form).then((res) => {
                this.$nextTick(() => {
                    loadingInstance.close();
                });
                this.$emit("uploadSuccess", res);
            });
        },
        onChange(file, fileList) {
            this.uploadList = fileList;
            // console.log(fileList);
            // console.log(this.uploadList);
            if (this.autoUpload) {
                this.confirm();
            }
        },
        onRemove(file, fileList) {
            this.uploadList = fileList;
            // console.log(fileList);
            // console.log(this.uploadList);
            if (this.autoUpload) {
                this.confirm();
            }
        },
    },
};
</script>

<style scoped>
.video {
    width: 100%;
    height: 300px;
}
.video video {
    width: 100%;
    height: 100%;
}
</style>
