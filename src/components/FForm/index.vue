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
</template>

<script>
import Tinymce from "@/components/Tinymce";
import UploadImage from "@/components/UploadImage";
import UploadVideo from "@/components/UploadVideo";
import datePicker from "../optionSearch/datePicker.vue";
import datetimerange from "../optionSearch/datetimerange.vue";
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
    methods: {},
};
</script>

<style scoped>
</style>
