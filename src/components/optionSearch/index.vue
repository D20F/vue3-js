<template>
    <el-form
        :model="formList"
        class="demo-form-inline"
        :size="size"
        :inline="true"
    >
        <el-form-item
            v-for="(item, index) in rowHeader"
            :key="index"
            :label="item.label"
            :label-width="item.labelWidth"
            :style="{
                width: item.formItemWidth || formWidth,
            }"
        >
            <el-select
                v-if="item.type == 'select'"
                v-model="formList[item.value]"
                :placeholder="item.placeholder || '请选择'"
                clearable
            >
                <el-option
                    v-for="(i, indexs) in item.option"
                    :key="indexs"
                    :label="i.label"
                    :value="i.value"
                ></el-option>
            </el-select>

            <el-cascader
                v-else-if="item.type == 'cascader'"
                v-model="formList[item.value]"
                :options="item.option"
                clearable
                :show-all-levels="false"
                :placeholder="item.placeholder || '请选择'"
            />

            <el-date-picker
                v-else-if="item.type == 'date'"
                v-model="formList[item.value]"
                :placeholder="item.placeholder"
                type="date"
                format="YYYY/MM/DD"
                value-format="YYYY-MM-DD"
            />
            <el-date-picker
                v-else-if="item.type == 'datetime'"
                v-model="formList[item.value]"
                :placeholder="item.placeholder"
                type="datetime"
                format="YYYY/MM/DD hh:mm:ss"
                value-format="YYYY-MM-DD hh:mm:ss"
            />

            <datetimerange
                v-else-if="item.type == 'datetimerange'"
                :list="item"
                v-model:startValue="formList[item.startValue]"
                v-model:endValue="formList[item.endValue]"
            />

            <el-input
                v-else
                v-model="formList[item.value]"
                :placeholder="item.placeholder || '请输入'"
            ></el-input>
        </el-form-item>
        <slot name="formItem"></slot>

        <el-form-item>
            <el-button @click="search" :size="size" type="primary"
                >搜索</el-button
            >
        </el-form-item>
        <el-form-item>
            <el-button @click="restart" :size="size" type="primary"
                >全部</el-button
            >
        </el-form-item>
        <slot name="button"></slot>
    </el-form>
</template>

<script>
import datetimerange from "./datetimerange.vue";
export default {
    name: "optionSearch",
    emits: ["change"],
    props: {
        size: {
            type: String,
            default: "large",
        },
        formWidth: {
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
                    //     placeholder: "请输入电话",
                    //     value: "mobile",
                    //     label: "电话",
                    // },
                    // {
                    //     type: "select",
                    //     placeholder: "请选择状态",
                    //     value: "status",
                    //     label: "状态",
                    //     option: [
                    //         {
                    //             value: "-1",
                    //             label: "已取消",
                    //         },
                    //         {
                    //             value: "1",
                    //             label: "待支付",
                    //         },
                    //     ],
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
                ];
            },
        },
    },
    components: { datetimerange },
    computed: {},
    data() {
        return { formList: this.headerForm };
    },
    methods: {
        restart() {
            for (let item in this.formList) {
                this.formList[item] = "";
            }
            this.$emit("change", {
                value: this.formList,
                type: "all",
            });
        },
        search() {
            this.$emit("change", {
                value: this.formList,
                type: "change",
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.content {
    width: 100%;
    height: 600px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: auto;
}
.demo-form-inline {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    .el-form-item {
        margin-right: 20px;
    }
    .el-select {
        width: 100%;
    }
}
</style>
