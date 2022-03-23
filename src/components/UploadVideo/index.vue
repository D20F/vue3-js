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
            <template></template>
            <template #trigger>
                <el-button size="small" type="primary">上传视频</el-button>
            </template>
        </el-upload>
        <el-progress v-if="percentageShow" :percentage="percentage" />
        <div class="video" v-if="modelValue">
            <video :src="modelValue" controls="controls"></video>
        </div>
    </div>
</template>
<script>
import { uploadFile } from "@/api/other";
import { ElLoading } from "element-plus";
import axios from "axios";
import * as qiniu from "qiniu-js";

export default {
    name: "uploadVideo",
    components: {},
    props: {
        modelValue: {
            type: [Array, String],
            default: () => {
                return [];
            },
        },
        autoUpload: {
            type: Boolean,
            default: true,
        },
        uploadType: {
            type: String,
            default: "lc",
        },
    },
    data() {
        return {
            uploadList: [],
            percentage: 0,
            percentageShow: false,
        };
    },
    created() {},
    methods: {
        confirm() {
            // 未主动选择 不上传 直接用外面的url就好了
            if (this.uploadList.length == 0) {
                return this.$emit("update:modelValue", "");
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
                this.$emit("update:modelValue", res.data);
            });
        },
        qn_confirm() {
            // 未主动选择 不上传 直接用外面的url就好了
            if (this.uploadList.length == 0) {
                return this.$emit("update:modelValue", "");
            }
            // axios.get("/m").then((res) => {
            let token =
                "8KraoCrl2hKRD2fok6SsO5hwzI5TYYfeRrpdAoZe:iJHoTYFzJ1SBqSC5ARigYD4IUE4=:eyJzY29wZSI6ImppYXlpcGMiLCJkZWFkbGluZSI6MTY0ODAwMjYzN30=";
            let config = {
                useCdnDomain: true,
            };
            let putExtra = {
                fname: "",
                params: {},
                mimeType: null,
            };

            let file = this.uploadList[0];
            let raw = file.raw;
            let observable;
            let key = new Date().getTime() + file.name;
            putExtra.params["x:name"] = file.name.split(".")[0];
            this.percentage = 0;
            this.percentageShow = true;

            observable = qiniu.upload(raw, key, token, putExtra, config);
            observable.subscribe({
                next: (response) => {
                    let total = response.total;
                    this.percentage = total.percent;
                    console.log(response);
                    console.log("进度", total.percent);
                },
                error: () => {
                    this.$message({ message: "上传失败", type: "error" });
                },
                complete: (res) => {
                    console.log(res);
                    this.$message({ message: "上传成功", type: "success" });
                    let filePath = "http://qny.jyxxwh.com/" + key;
                    this.$emit("update:modelValue", filePath);
                },
            });
            // });
        },
        onChange(file, fileList) {
            this.uploadList = fileList;
            if (this.autoUpload) {
                if (this.uploadType == "lc") {
                    this.confirm();
                } else if (this.uploadType == "qn") {
                    this.qn_confirm();
                }
            }
        },
        onRemove(file, fileList) {
            this.uploadList = fileList;
            if (this.autoUpload) {
                if (this.uploadType == "lc") {
                    this.confirm();
                } else if (this.uploadType == "qn") {
                    this.qn_confirm();
                }
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
