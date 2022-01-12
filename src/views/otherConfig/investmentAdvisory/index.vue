<template>
    <div class="userGroup">
        <optionSearch
            :rowHeader="headerHeader"
            v-model:headerForm="headerForm"
            @change="change"
        >
        </optionSearch>
        <el-button
            type="primary"
            v-permission="'cainvestmentAdvisory_add'"
            @click="
                dialogFormVisible = true;
                confirmMode = 'add';
            "
            >新增文章</el-button
        >

        <FTable
            :tableDataLoading="tableDataLoading"
            :rowHeader="tableHeader"
            :tableData="tableData"
        >
            <template v-slot:operate="{ scope }">
                <el-button
                    size="mini"
                    v-permission="'cainvestmentAdvisory_edit'"
                    @click="handleEdit(scope.row)"
                    >编辑</el-button
                >
                <el-button
                    v-permission="'cainvestmentAdvisory_delete'"
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.row)"
                    >删除</el-button
                >
            </template>
        </FTable>
        <el-pagination
            class="pagination"
            background
            layout="total, prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            v-model:current-page="page.page"
            @current-change="currentChange"
            :hide-on-single-page="true"
        >
        </el-pagination>

        <el-dialog
            width="70%"
            title="新增文章"
            v-model="dialogFormVisible"
            @close="dialogClose"
            :modal="true"
            :destroy-on-close="true"
            :close-on-click-modal="false"
        >
            <FForm
                :rowHeader="formHeader"
                formLabelWidth="70px"
                v-model:headerForm="form"
                ref="form"
            >
            </FForm>
            <template #footer class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {
    addHomeAricle, //新增
    homeAricleDelete, //删除
    homeAricleModify, //修改
    getHomeAricle, //分页查询
} from "@/api/other";
export default {
    name: "investmentAdvisory",
    data() {
        return {
            tableData: [],
            tableDataLoading: true,
            tableHeader: [
                {
                    value: "title",
                    label: "标题",
                },
                {
                    columnType: "image",
                    value: "cover",
                    label: "封面",
                },
                {
                    value: "content",
                    columnType: "render",
                    label: "内容",
                    render: (h, params) => {
                        return h(
                            "span",
                            params.row.industrialParkStatus ? "显示" : "不显示"
                        );
                    },
                },
            ],
            formHeader: [
                {
                    placeholder: "请输入标题",
                    value: "title",
                    label: "标题",
                },
                {
                    placeholder: "请输入标题",
                    value: "id",
                    label: "标题",
                },
                {
                    type: "image",
                    value: "cover",
                    label: "封面",
                },
                {
                    type: "video",
                    value: "createTime",
                    label: "封面s",
                },
                {
                    type: "switch",
                    placeholder: "请输入内容",
                    value: "content",
                    label: "内容",
                },
                {
                    type: "datetimerange",
                    placeholder: ["开始", "结束"],
                    startValue: "startTime",
                    endValue: "endTime",
                    label: "创建时间",
                },
                {
                    type: "datetime",
                    placeholder: "开始",
                    value: "makeDate1",
                    label: "创建时间",
                },
                {
                    type: "date",
                    placeholder: "开始",
                    value: "makeDate2",
                    label: "创建时间",
                },
                {
                    type: "select",
                    placeholder: "请选择状态",
                    value: "id",
                    label: "状态",
                    option: [
                        {
                            value: "1",
                            label: "待处理",
                        },
                        {
                            value: "2",
                            label: "已处理",
                        },
                    ],
                },
                {
                    type: "tinymce",
                    placeholder: "请输入内容",
                    value: "content",
                    label: "内容",
                },
            ],
            form: {
                title: "",
                cover: "",
                content: "",
                createTime: "",
                id: "",
            },
            headerHeader: [
                {
                    placeholder: "请输入电话",
                    value: "mobile",
                    label: "电话",
                },
                {
                    type: "select",
                    placeholder: "请选择状态",
                    value: "status",
                    label: "状态",
                    option: [
                        {
                            value: "-1",
                            label: "已取消",
                        },
                        {
                            value: "1",
                            label: "待支付",
                        },
                        {
                            value: "2",
                            label: "待使用",
                        },
                        {
                            value: "3",
                            label: "已完成",
                        },
                        {
                            value: "4",
                            label: "已过期",
                        },
                    ],
                },
                {
                    type: "datetimerange",
                    placeholder: ["开始", "结束"],
                    startValue: "startTime",
                    endValue: "endTime",
                    label: "创建时间",
                },
                {
                    type: "datetime",
                    placeholder: "开始",
                    value: "makeDate1",
                    label: "111创建时间",
                },
                {
                    type: "date",
                    placeholder: "开始",
                    value: "makeDate2",
                    label: "222创建时间",
                },
            ],
            headerForm: {
                writeOffNo: "",
                status: "",
                hotelName: "",
                reserveName: "",
                mobile: "",
                makeDate1: "",
                makeDate2: "",
                startTime: "",
                endTime: "",
            },
            dialogFormVisible: false,
            confirmMode: "",
            page: {
                total: 0,
                page: 1,
                pageSize: 10,
            },
        };
    },
    components: {},
    computed: {},
    watch: {},
    created() {
        this.getHomeAricle();
    },
    mounted() {},
    methods: {
        change() {
            console.log(this.headerForm);
            this.page.page = 1;
            // this.getHomeAricle();
        },
        getHomeAricle() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
                ...this.headerForm,
            };
            getHomeAricle(data).then((res) => {
                this.tableData = res.records;
                this.page.total = res.total;
                this.tableDataLoading = false;
            });
        },
        handleEdit(row) {
            for (let item in this.form) {
                this.form[item] = row[item];
            }
            this.confirmMode = "edit";
            this.dialogFormVisible = true;
        },
        handleDelete(row) {
            homeAricleDelete(row.id).then((res) => {
                this.$message({
                    message: "删除成功",
                    type: "success",
                });
                this.getHomeAricle();
            });
        },
        dialogClose() {
            this.getHomeAricle();
            for (let item in this.form) {
                this.form[item] = "";
            }
        },
        confirm() {
            this.$refs.form
                .submitForm()
                .then((val) => {
                    console.log(val);
                })
                .catch((err) => {
                    console.log(err);
                });

            // if (this.confirmMode == "add") {
            //     addHomeAricle(this.form).then((res) => {
            //         this.dialogFormVisible = false;
            //         this.$message({
            //             message: "创建成功",
            //             type: "success",
            //         });
            //     });
            // } else if (this.confirmMode == "edit") {
            //     homeAricleModify(this.form.id, this.form).then((res) => {
            //         this.dialogFormVisible = false;
            //         this.$message({
            //             message: "修改成功",
            //             type: "success",
            //         });
            //     });
            // }
        },

        currentChange(v) {
            this.page.page = v;
            this.getHomeAricle();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
