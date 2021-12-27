<template>
    <div>
        <el-form :model="formList" :label-width="formLabelWidth" ref="form">
            <el-form-item
                v-for="(item, index) in rowHeader"
                :key="index"
                :label="item.label"
                :label-width="item.labelWidth"
                :rules="item.rules"
                :prop="item.value"
            >
                <el-select
                    v-if="item.type == 'select'"
                    v-model="formList[item.value]"
                    :placeholder="item.placeholder"
                >
                    <el-option
                        v-for="(i, indexs) in item.option"
                        :key="indexs"
                        :label="i.label"
                        :value="i.value"
                    ></el-option>
                </el-select>

                <datePicker
                    v-else-if="item.type == 'date'"
                    v-model="formList[item.value]"
                    :placeholder="item.placeholder"
                    type="date"
                />
                <datePicker
                    v-else-if="item.type == 'datetime'"
                    v-model="formList[item.value]"
                    :placeholder="item.placeholder"
                    type="datetime"
                />

                <datetimerange
                    v-else-if="item.type == 'datetimerange'"
                    :list="item"
                    v-model:startValue="formList[item.startValue]"
                    v-model:endValue="formList[item.endValue]"
                />

                <Tinymce
                    v-else-if="item.type == 'tinymce'"
                    ref="editor"
                    v-model="formList[item.value]"
                    :height="400"
                />

                <el-switch
                    v-else-if="item.type == 'switch'"
                    v-model="formList[item.value]"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                >
                </el-switch>

                <UploadImage
                    v-else-if="item.type == 'image'"
                    ref="upload"
                    :limit="item.limit || 1"
                    v-model="formList[item.value]"
                    :autoUpload="item.autoUpload || true"
                />
                <UploadVideo
                    v-else-if="item.type == 'video'"
                    ref="upload"
                    :limit="item.limit || 1"
                    v-model="formList[item.value]"
                    :autoUpload="item.autoUpload || true"
                />

                <el-input
                    v-else
                    v-model="formList[item.value]"
                    :placeholder="item.placeholder"
                ></el-input>
            </el-form-item>

            <slot></slot>
        </el-form>
    </div>
</template>

<script>
import Tinymce from "@/components/Tinymce";
import UploadImage from "@/components/UploadImage";
import UploadVideo from "@/components/UploadVideo";
import datePicker from "../optionSearch/datePicker.vue";
import datetimerange from "../optionSearch/datetimerange.vue";
import { ElMessage } from "element-plus";

export default {
    name: "FForm",
    props: {
        formLabelWidth: {
            type: String,
            default: "",
        },
        headerForm: {
            type: Object,
            default: () => {
                return {};
            },
        },
        rowHeader: {
            type: Array,
            default: () => {
                return [
                    // {
                    //     placeholder: "请输入标题",
                    //     value: "title",
                    //     label: "标题",
                    //     rules: [
                    //         {
                    //             validator: (rule, value, callback) => {
                    //                 value == ""
                    //                     ? callback("这里填出错信息")
                    //                     : callback();
                    //             },
                    //         },
                    //     ],
                    // },
                    // {
                    //     type: "image",
                    //     value: "cover",
                    //     label: "封面",
                    // },
                    // {
                    //     type: "video",
                    //     value: "video",
                    //     label: "视频",
                    // },
                    // {
                    //     type: "switch",
                    //     placeholder: "请选择",
                    //     value: "content",
                    //     label: "是否",
                    // },
                    // {
                    //     type: "datetimerange",
                    //     placeholder: ["开始", "结束"],
                    //     startValue: "startTime",
                    //     endValue: "endTime",
                    //     label: "创建时间",
                    // },
                    // {
                    //     type: "datetime",
                    //     placeholder: "开始",
                    //     value: "makeDate1",
                    //     label: "111创建时间",
                    // },
                    // {
                    //     type: "date",
                    //     placeholder: "开始",
                    //     value: "makeDate2",
                    //     label: "222创建时间",
                    // },
                    // {
                    //     type: "select",
                    //     placeholder: "请选择状态",
                    //     value: "id",
                    //     label: "状态",
                    //     option: [
                    //         {
                    //             value: "1",
                    //             label: "待处理",
                    //         },
                    //         {
                    //             value: "2",
                    //             label: "已处理",
                    //         },
                    //     ],
                    // },
                    // {
                    //     type: "tinymce",
                    //     placeholder: "请输入内容",
                    //     value: "content",
                    //     label: "内容",
                    // },
                ];
            },
        },
    },
    components: {
        Tinymce,
        UploadImage,
        UploadVideo,
        datetimerange,
        datePicker,
    },
    computed: {},
    data() {
        return { formList: this.headerForm };
    },
    created() {},
    methods: {
        submitForm() {
            return new Promise((resolve, reject) => {
                this.$refs.form.validate((valid, list) => {
                    for (let item in list) {
                        return ElMessage({
                            message: list[item][0].message,
                            type: "error",
                            duration: 2 * 1000,
                        });
                    }
                    valid ? resolve("成功") : reject("失败");
                });
            });
        },
    },
};
</script>

<style scoped>
</style>
