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
        <el-button slot="trigger" size="small" type="primary"
            >选取文件</el-button
        >
        <!-- <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
        </div> -->
    </el-upload>
</template>

<script>
import { uploadImage } from "@/api/other";
import { Loading } from "element-ui";

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
        value: {
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
            if (typeof this.value == "object") {
                let arr = [];
                for (const item of this.value) {
                    arr.push({
                        name: item.split("/")[item.split("/").length - 1],
                        url: item,
                    });
                }
                return arr;
            }
            if (this.value && typeof this.value == "string") {
                return [
                    {
                        name: this.value.split("/")[
                            this.value.split("/").length - 1
                        ],
                        url: this.value,
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
                    ? this.$emit("input", "")
                    : this.$emit("input", []);
                return;
            }
            let loadingInstance = Loading.service({
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
                    form.append("images", item.raw);
                }
            }

            uploadImage(form).then((res) => {
                this.$nextTick(() => {
                    loadingInstance.close();
                });
                this.$emit("uploadSuccess", [...res, ...successList]);
                this.limit == 1
                    ? this.$emit("input", res[0])
                    : this.$emit("input", [...res, ...successList]);
            });

            // 不使用submit
            // this.$refs.upload.submit();
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
</style>
