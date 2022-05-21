<template>
    <el-upload
        class="upload-demo"
        ref="upload"
        list-type="picture"
        :auto-upload="false"
        action="abcdefg"
        :http-request="uploadSectionFile"
        :on-change="onChange"
        :on-remove="onRemove"
        :limit="limit"
        :file-list="fileList"
    >
        <template></template>
        <template #trigger>
            <el-button size="default" type="primary">选取文件</el-button>
        </template>
    </el-upload>
</template>

<script>
import { uploadFile } from "@/api/other";
import { ElLoading } from "element-plus";

export default {
    name: "UploadImage",
    props: {
        limit: {
            type: Number,
            default: 1,
        },
        autoUpload: {
            type: Boolean,
            default: false,
        },
        modelValue: {
            type: [Array, String],
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            uploadList: [],
        };
    },
    components: {},
    computed: {
        fileList() {
            if (typeof this.modelValue == "object") {
                let arr = [];
                for (const item of this.modelValue) {
                    arr.push({
                        name: item.split("/")[item.split("/").length - 1],
                        url: item,
                    });
                }
                return arr;
            }
            if (this.modelValue && typeof this.modelValue == "string") {
                return [
                    {
                        name: this.modelValue.split("/")[
                            this.modelValue.split("/").length - 1
                        ],
                        url: this.modelValue,
                    },
                ];
            }
            return [];
        },
    },
    watch: {},
    created() {},
    beforeUnmount() {},
    methods: {
        uploadSectionFile(params) {
            // 每有一张图片 submit之后 就调用几次
            // this.$emit('uploadSectionFile',res.data)
            // console.log(params);
            // 不使用
        },
        confirm() {
            // 未主动选择 不上传 直接用外面的url就好了
            if (this.uploadList.length == 0) {
                this.$emit("uploadSuccess", []);
                this.limit == 1
                    ? this.$emit("update:modelValue", "")
                    : this.$emit("update:modelValue", []);
                return;
            }
            let loadingInstance = ElLoading.service({
                text: "上传中",
            });

            // 选择了新的图片 或 删除了图片选择了新的图片
            // 替换掉已经成功上传的图片 之后再和上传完的合并
            let successList = [];
            for (let i = 0; i < this.uploadList.length; i++) {
                if (this.uploadList[i].status == "success") {
                    successList.push(this.uploadList[i].url);
                }
            }

            let form = new FormData();
            for (const item of this.uploadList) {
                if (item.status == "ready") {
                    let fileType = item.raw.type,
                        isImage = fileType.indexOf("image") != -1,
                        isLt2M = item.size / 1024 / 1024 < 2;
                    // 这里常规检验，看项目需求而定
                    if (!isImage) {
                        this.uploadList = [];
                        this.$refs.upload.clearFiles();
                        this.$nextTick(() => {
                            loadingInstance.close();
                            this.$message.error(
                                "只能上传图片格式png、jpg、gif!"
                            );
                        });
                        return;
                    }
                    // if (!isLt2M) {
                    //     this.$message.error("只能上传图片大小小于2M");
                    //     return;
                    // }
                    form.append("file", item.raw);
                }
            }

            if (this.detect(this.uploadList)) {
                this.$nextTick(() => {
                    loadingInstance.close();
                });
                this.$emit("uploadSuccess", successList);
                this.limit == 1
                    ? this.$emit("update:modelValue", [])
                    : this.$emit("update:modelValue", successList);
                return;
            }

            uploadFile(form).then((res) => {
                this.$nextTick(() => {
                    loadingInstance.close();
                });
                this.$emit("uploadSuccess", [res, ...successList]);
                this.limit == 1
                    ? this.$emit("update:modelValue", res)
                    : this.$emit("update:modelValue", [res, ...successList]);
            });

            // 不使用submit
            // this.$refs.upload.submit();
        },
        detect(list) {
            let state = true;
            for (const item of list) {
                if (item.status !== "success") {
                    state = false;
                }
            }
            return state;
        },
        onChange(file, fileList) {
            // console.log(fileList);
            // console.log(this.uploadList);
            this.uploadList = fileList;
            if (this.autoUpload) {
                this.confirm();
            }
        },
        onRemove(file, fileList) {
            // console.log(fileList);
            // console.log(this.uploadList);
            this.uploadList = fileList;
            if (this.autoUpload) {
                this.confirm();
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.upload-demo {
    width: 100%;
}
</style>
