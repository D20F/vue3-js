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
import datetimerange from "./datetimerange.vue";
import datePicker from "./datePicker.vue";
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
    components: {
        datetimerange,
        datePicker,
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
