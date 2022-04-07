<template>
    <el-date-picker
        v-model="value"
        type="datetimerange"
        :start-placeholder="list.placeholder[0]"
        :end-placeholder="list.placeholder[1]"
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
        };
    },
    created() {},
    beforeUpdate() {
        if (!this.startValue) {
            this.value = [];
        }
    },
    methods: {
        change(data) {
            if (data) {
                let startValue = this.parseTime(data[0]);
                let endValue = this.parseTime(data[1]);
                this.$emit("update:startValue", startValue);
                this.$emit("update:endValue", endValue);
            }
        },
        parseTime(time, cFormat) {
            if (arguments.length === 0 || !time) {
                return null;
            }
            const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
            let date;
            if (typeof time === "object") {
                date = time;
            } else {
                if (typeof time === "string") {
                    if (/^[0-9]+$/.test(time)) {
                        // support "1548221490638"
                        time = parseInt(time);
                    } else {
                        // support safari
                        // https://stackoverflow.com/questions/4310953/invalid-date-in-safari
                        time = time.replace(new RegExp(/-/gm), "/");
                    }
                }

                if (typeof time === "number" && time.toString().length === 10) {
                    time = time * 1000;
                }
                date = new Date(time);
            }
            const formatObj = {
                y: date.getFullYear(),
                m: date.getMonth() + 1,
                d: date.getDate(),
                h: date.getHours(),
                i: date.getMinutes(),
                s: date.getSeconds(),
                a: date.getDay(),
            };
            const time_str = format.replace(
                /{([ymdhisa])+}/g,
                (result, key) => {
                    const value = formatObj[key];
                    // Note: getDay() returns 0 on Sunday
                    if (key === "a") {
                        return ["日", "一", "二", "三", "四", "五", "六"][
                            value
                        ];
                    }
                    return value.toString().padStart(2, "0");
                }
            );
            return time_str;
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
