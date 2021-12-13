<template>
    <div>
        <div style="display: inline-block">
            <label class="radio-label">导出模式: </label>
            <el-radio-group v-model="mode">
                <el-radio-button :label="false"> 导出当页 </el-radio-button>
                <el-radio-button :label="true"> 自选页数 </el-radio-button>
            </el-radio-group>
            <div style="margin: 0 30px 0 30px; display: inline-block">
                <el-input
                    v-if="mode"
                    type="number"
                    v-model="current"
                    placeholder="页数"
                    style="width: 120px"
                />
                <span v-if="mode"> - </span>
                <el-input
                    v-if="mode"
                    type="number"
                    v-model="size"
                    placeholder="条数"
                    style="width: 120px"
                />
            </div>
            <el-button
                :loading="downloadLoading"
                type="primary"
                icon="el-icon-document"
                @click="handleDownload"
            >
                导出 Excel
            </el-button>
        </div>
    </div>
</template>

<script>
// 接受流文件下载 需要设置axios为流状态
// getThroughCarExport().then((res) => {
//     let blob = res;
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onload = (e) => {
//         let a = document.createElement("a");
//         a.style.display = "none";
//         a.download = "excel.xlsx";
//         a.href = e.target.result;
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);
//         this.$message({
//             message: "导出成功",
//             type: "success",
//         });
//     };
// });

import { Message } from "element-ui";

export default {
    name: "exportExcel",
    props: {
        tHeader: {
            type: Array,
            default: () => {
                return [];
            },
        },
        filterVal: {
            type: Array,
            default: () => {
                return [];
            },
        },
        list: {
            type: Array,
            default: () => {
                return [];
            },
        },
        request: {
            type: Array,
            default: () => {
                return [];
            },
        },
    },
    data() {
        return {
            current: "",
            size: "",
            mode: false,
            downloadLoading: false,
        };
    },
    methods: {
        handleDownload() {
            if (this.mode) {
                if (this.current % 10 !== 0) {
                    return Message({
                        message: "请输入10位基数的条数",
                        type: "error",
                        duration: 3 * 1000,
                    });
                }
                if (!this.size) {
                    return Message({
                        message: "请输入导出条数",
                        type: "error",
                        duration: 3 * 1000,
                    });
                }
                import("@/api/other").then((res) => {
                    // 根据键值去找请求 ...解构参数进去
                    console.log(res);
                    let data = {
                        current: this.current,
                        size: this.size,
                    };
                    res[this.request[1]](data).then((res) => {
                        console.log(res);
                    });
                });
            } else {
                this.downloadLoading = true;
                import("@/utils/vendor/Export2Excel").then((excel) => {
                    // excel表头
                    // const tHeader = ["Id", "Title", "Author", "Readings", "Date"];
                    // 列表对应字段
                    // const filterVal = [
                    //     "id",
                    //     "title",
                    //     "author",
                    //     "pageviews",
                    //     "display_time",
                    // ];
                    const list = this.list;
                    const data = this.formatJson(this.filterVal, list);
                    excel.export_json_to_excel({
                        header: this.tHeader,
                        data,
                        filename: "", //  文件名
                        autoWidth: true, //  宽度自适应
                        bookType: "xlsx", // 'xlsx', 'csv', 'txt'
                    });
                    this.downloadLoading = false;
                });
            }
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map((v) =>
                filterVal.map((j) => {
                    if (j === "timestamp") {
                        return parseTime(v[j]);
                    } else {
                        return v[j];
                    }
                })
            );
        },
    },
    computed: {},
};
</script>

<style scoped>
.svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.svg-external-icon {
    background-color: currentColor;
    mask-size: cover !important;
    display: inline-block;
}
</style>
