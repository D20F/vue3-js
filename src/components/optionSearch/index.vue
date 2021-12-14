<template>
    <el-form :inline="true" :model="formList" class="demo-form-inline">
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

            <el-input
                v-else
                v-model="formList[item.value]"
                :placeholder="item.placeholder"
            ></el-input>
        </el-form-item>
        <slot name="formItem"></slot>

        <el-form-item>
            <el-button @click="search" type="primary">搜索</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="restart" type="primary">全部</el-button>
        </el-form-item>
        <slot name="button"></slot>
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

export default {
    name: "optionSearch",
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

<style scoped>
.content {
    width: 100%;
    height: 600px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: auto;
}
</style>
