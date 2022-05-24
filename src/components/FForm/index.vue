<template>
    <div>
        <el-form
            :model="formList"
            :label-width="formLabelWidth"
            ref="form"
            size="large"
        >
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
                    :multiple="item.multiple"
                >
                    <el-option
                        v-for="(i, indexs) in item.option"
                        :key="indexs"
                        :label="i.label"
                        :value="i.value"
                    ></el-option>
                </el-select>

                <el-date-picker
                    v-else-if="item.type == 'date'"
                    v-model="formList[item.value]"
                    :placeholder="item.placeholder"
                    type="date"
                    size="large"
                    format="YYYY/MM/DD"
                    value-format="YYYY-MM-DD"
                />
                <el-date-picker
                    v-else-if="item.type == 'datetime'"
                    v-model="formList[item.value]"
                    :placeholder="item.placeholder"
                    type="datetime"
                    size="large"
                    format="YYYY/MM/DD hh:mm:ss"
                    value-format="YYYY-MM-DD hh:mm:ss"
                />

                <dateTimePicker
                    v-else-if="item.type == 'dateTimePicker'"
                    :list="item"
                    v-model:startValue="formList[item.startValue]"
                    v-model:endValue="formList[item.endValue]"
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
                    inline-prompt
                    :active-color="item.activeColor || '#13ce66'"
                    :inactive-color="item.inactiveColor || '#ff4949'"
                    :active-text="item.activeText"
                    :inactive-text="item.inactiveText"
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
                    :uploadType="item.uploadType || 'lc'"
                    v-model="formList[item.value]"
                    :autoUpload="item.autoUpload || true"
                />
                <el-color-picker
                    v-else-if="item.type == 'color'"
                    v-model="formList[item.value]"
                />
                <el-cascader
                    v-else-if="item.type == 'cascader'"
                    v-model="formList[item.value]"
                    :options="item.options"
                    :show-all-levels="false"
                    :placeholder="item.placeholder || '请选择'"
                    :props="item.props"
                    style="width: 100%"
                />

                <el-rate
                    v-else-if="item.type == 'rate'"
                    v-model="formList[item.value]"
                    style="margin-top: 10px"
                    allow-half
                />

                <el-input
                    v-else
                    :type="item.inputType || 'text'"
                    v-model="formList[item.value]"
                    :placeholder="item.placeholder || '请输入'"
                    :disabled="item.disabled || false"
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
import { ElMessage } from "element-plus";
import datetimerange from "./datetimerange.vue";
import dateTimePicker from "./dateTimePicker.vue";
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
                    //              },
                    //              trigger: 'blur' ,//change
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
        dateTimePicker,
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
