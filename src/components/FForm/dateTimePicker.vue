<template>
    <el-time-picker
        :ref="refs"
        v-model="values"
        is-range
        range-separator="-"
        :start-placeholder="list.placeholder[0]"
        :end-placeholder="list.placeholder[1]"
        @change="change"
    >
    </el-time-picker>
</template>

<script>
import { ElTimePicker } from "element-plus";

export default {
    name: "dateTimePicker",
    components: {
        "el-time-picker": ElTimePicker,
    },
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
        refs: {
            type: String,
            default: () => {
                return new Date().getTime() + "ref";
            },
        },
    },
    computed: {},
    data() {
        return {
            values: [],
        };
    },
    created() {
        if (this.startValue) {
            let startValue = this.startValue.split(":");
            let endValue = this.endValue.split(":");
            this.values = [
                new Date(
                    2016,
                    9,
                    10,
                    startValue[0],
                    startValue[1],
                    startValue[2]
                ),
                new Date(2016, 9, 10, endValue[0], endValue[1], endValue[2]),
            ];
        }
    },
    beforeUpdate() {},
    methods: {
        change(data) {
            if (data) {
                this.$emit(
                    "update:startValue",
                    this.parseTime(data[0], "{h}:{i}:{s}")
                );
                this.$emit(
                    "update:endValue",
                    this.parseTime(data[1], "{h}:{i}:{s}")
                );
                this.$refs[this.refs].blur();
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
