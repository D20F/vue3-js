<template>
    <div>
        <el-table
            :data="tableData"
            v-loading="tableDataLoading"
            max-height="786px"
            style="width: 100%"
        >
            <el-table-column
                v-for="(item, index) in rowHeader"
                :key="index"
                :prop="item.value"
                :show-overflow-tooltip="item.overflow"
                :label="item.label"
                :width="item.width"
                :fixed="item.fixed"
                :align="item.align"
            >
                <template slot-scope="scope">
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
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <slot name="operate" v-bind:scope="scope"> </slot>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
/**
 *  columnType: '', 类型
 *  value: '',      键值
 *  overflow: '',   show-overflow-tooltip
 *  label: '',
 *  width: '',
 *  fixed: '',
 *  align: '',
 */
// <F-table
//     :tableDataLoading="tableDataLoading"
//     :rowHeader="rowHeader"
//     :tableData="tableData"
// >
//     <template v-slot:operate="{ scope }">
//         <el-button
//             size="mini"
//             v-permission="'industrialResources_edit'"
//             @click="handleEdit(scope.row)"
//             >编辑</el-button
//         >
//         <el-button
//             size="mini"
//             type="danger"
//             v-permission="'industrialResources_delete'"
//             @click="handleDelete(scope.row)"
//             >删除</el-button
//         >
//     </template>
// </F-table>
// 自定义内容的组件
var exSlot = {
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null,
        },
    },

    render: (h, data) => {
        const params = {
            row: data.props.row,
            index: data.props.index,
        };
        if (data.props.column) params.column = data.props.column;
        return data.props.render(h, params);
    },
};
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
                    {
                        columnType: "noHandle",
                        value: "title",
                        label: "标题",
                        width: "60px",
                        overflow: true,
                    },
                ];
            },
        },
        tableDataLoading: {
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
