<template>
    <el-date-picker
        v-model="value"
        type="datetimerange"
        :start-placeholder="list.placeholder[0]"
        :end-placeholder="list.placeholder[1]"
        format="YYYY/MM/DD hh:mm:ss"
        value-format="YYYY-MM-DD hh:mm:ss"
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
    },
    computed: {},
    data() {
        return {
            value: [],
            cache: false,
        };
    },
    created() {},
    beforeUpdate() {
        if (this.cache) {
            if (!this.startValue) {
                this.value = [];
            }
        }
        if (this.startValue) {
            this.cache = true;
        } else {
            this.cache = false;
        }
    },
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
