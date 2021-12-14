<template>
    <el-form :model="formList" label-width="80px">
        <el-form-item
            v-for="(item, index) in rowHeader"
            :key="index"
            :label="item.label"
            :label-width="item.labelWidth"
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

            <!-- <el-date-picker
                v-else-if="item.type == 'date'"
                v-model="formList[item.value]"
                :placeholder="item.placeholder"
                type="date"
                :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
            >
            </el-date-picker>

            <el-date-picker
                v-else-if="item.type == 'datetime'"
                v-model="formList[item.value]"
                :placeholder="item.placeholder"
                type="datetime"
                :value-format="item.valueFormat || 'yyyy-MM-dd HH:mm:ss'"
            >
            </el-date-picker>

            <el-row
                style="width: 480px"
                :gutter="0"
                v-else-if="item.type == 'timeInterval'"
            >
                <el-col :span="11">
                    <el-date-picker
                        v-model="formList[item.value[0]]"
                        :placeholder="item.placeholder[0]"
                        :type="item.dateType ? item.dateType[0] : 'datetime'"
                        :value-format="
                            item.valueFormat
                                ? item.valueFormat[0]
                                : 'yyyy-MM-dd HH:mm:ss'
                        "
                    ></el-date-picker>
                </el-col>
                <el-col style="text-align: center" :span="2">-</el-col>
                <el-col :span="11">
                    <el-date-picker
                        v-model="formList[item.value[1]]"
                        :placeholder="item.placeholder[1]"
                        :type="item.dateType ? item.dateType[1] : 'datetime'"
                        :value-format="
                            item.valueFormat
                                ? item.valueFormat[1]
                                : 'yyyy-MM-dd HH:mm:ss'
                        "
                    ></el-date-picker>
                </el-col>
            </el-row> -->

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

            <el-input
                v-else
                v-model="formList[item.value]"
                :placeholder="item.placeholder"
            ></el-input>
        </el-form-item>

        <slot></slot>
    </el-form>
</template>

<script>
// {
//     type: "datetime",
//     labelWidth: "50px",
//     placeholder: "请输入名称",
//     value: "nickname",
//     label: "名称",
//     option: {
//         label: "",
//         value: "",
//     }
// }
import Tinymce from "@/components/Tinymce";
import UploadImage from "@/components/UploadImage";

export default {
    name: "FForm",
    props: {
        headerForm: {
            type: Object,
            default: () => {
                return {};
            },
        },
        rowHeader: {
            type: Array,
            default: () => {
                return {};
            },
        },
    },
    components: { Tinymce, UploadImage },
    computed: {},
    data() {
        return { formList: this.headerForm };
    },
    created() {},
    methods: {},
};
</script>

<style scoped>
</style>
