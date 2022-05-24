<template>
    <el-date-picker
        v-model="value"
        :type="dateType"
        :start-placeholder="list.placeholder[0]"
        :end-placeholder="list.placeholder[1]"
        :format="format"
        :value-format="valueFormat"
        @change="change"
    >
    </el-date-picker>
</template>

<script>
export default {
    name: "datetimerange",
    props: {
        list: {
            type: Object,
            default: () => {
                return {};
            },
        },
        startValue: {
            type: [String, Object],
            default: "",
        },
        endValue: {
            type: [String, Object],
            default: "",
        },
        dateType: {
            type: String,
            default: "datetimerange",
        },
        format: {
            type: String,
            default: "YYYY-MM-DD hh:mm:ss",
        },
        valueFormat: {
            type: String,
            default: "YYYY-MM-DD hh:mm:ss",
        },
    },
    computed: {},
    data() {
        return {
            value: [],
            cache: false,
        };
    },
    created() {
        if (this.startValue) {
            this.value = [this.startValue, this.endValue];
        }
    },
    beforeUpdate() {},
    methods: {
        change(data) {
            if (data) {
                this.$emit("update:startValue", data[0]);
                this.$emit("update:endValue", data[1]);
            }
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
