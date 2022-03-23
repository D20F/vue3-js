<template>
    <div>
        <el-table
            :data="tableData"
            v-loading="tableDataLoading"
            style="width: 100%"
            :fit="true"
            border
        >
            <el-table-column
                v-for="(item, index) in rowHeader"
                :key="index"
                :prop="item.value"
                :show-overflow-tooltip="item.overflow"
                :label="item.label"
                :width="item.width || '{}'"
                :fixed="item.fixed"
                :align="item.align"
            >
                <template #default="scope">
                    <openTinymce
                        v-if="item.columnType == 'tinymce'"
                        :content="scope.row[item.value]"
                    />
                    <el-image
                        v-else-if="item.columnType == 'image'"
                        style="width: 100px; height: 100px"
                        :src="scope.row[item.value]"
                        :preview-src-list="[scope.row[item.value]]"
                        fit="cover"
                    ></el-image>
                    <el-image
                        v-else-if="item.columnType == 'imageList'"
                        v-for="(i, indexs) in scope.row[item.value]"
                        :key="indexs"
                        style="width: 50px; height: 50px"
                        :src="i"
                        :preview-src-list="[i]"
                        fit="cover"
                    ></el-image>
                    <ex-slot
                        v-else-if="item.columnType == 'render'"
                        :render="item.render"
                        :row="scope.row"
                        :index="scope.$index"
                        :column="item"
                    ></ex-slot>
                    <div v-else>
                        <span>
                            {{ scope.row[item.value] }}
                        </span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="操作" v-if="operateShow">
                <template #default="scope">
                    <slot name="operate" :scope="scope"> </slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import exSlot from "./ex-solt.vue";

export default {
    name: "FTable",
    components: {
        "ex-slot": exSlot,
    },
    props: {
        tableData: {
            type: Array,
            default: () => {
                return [];
            },
        },
        rowHeader: {
            type: Array,
            default: () => {
                return [
                    // {
                    //     value: "title",
                    //     label: "标题",
                    // },
                    // {
                    //     columnType: "image",
                    //     value: "cover",
                    //     label: "封面",
                    // },
                    // {
                    //     columnType: "tinymce",
                    //     value: "tinymce",
                    //     label: "富文本",
                    // },
                    // {
                    //     value: "content",
                    //     columnType: "render",
                    //     label: "内容",
                    //     render: (h, params) => {
                    //         return h(
                    //             "span",
                    //             params.row.industrialParkStatus
                    //                 ? "显示"
                    //                 : "不显示"
                    //         );
                    //     },
                    // },
                ];
            },
        },
        tableDataLoading: {
            type: Boolean,
            default: true,
        },
        operateShow: {
            type: Boolean,
            default: true,
        },

    },
    computed: {},
    data() {
        return {};
    },
    methods: {},
};
</script>

<style scoped>
</style>
