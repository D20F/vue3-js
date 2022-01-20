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
            v-permission="'carousel_add'"
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
                    v-permission="'carousel_edit'"
                    @click="handleEdit(scope.row)"
                    >编辑</el-button
                >
                <el-button
                    v-permission="'carousel_delete'"
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
            layout="total, sizes, prev, pager, next, jumper"
            :total="page.total"
            :page-sizes="[page.pageSize]"
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
                ref="FFormRef"
            >
            </FForm>
            <template #footer class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import {
    addHomeAricle, //新增
    homeAricleDelete, //删除
    homeAricleModify, //修改
    getHomeAricle, //分页查询
} from "@/api/other";
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { regular_phone } from "@/utils/formRules/index";

let tableData = reactive([]);
let tableDataLoading = ref(true);
let dialogFormVisible = ref(false);
let confirmMode = ref("");
let tableHeader = reactive([
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
]);
let formHeader = reactive([
    {
        placeholder: "请输入标题",
        value: "title",
        label: "标题",
        rules: [
            {
                validator: regular_phone,
            },
        ],
    },
    {
        placeholder: "请输入标题",
        value: "rate",
        label: "标题",
    },
    {
        type: "cascader",
        value: "cascader",
        placeholder: "请输入标题",
        label: "标题",
        options: [
            {
                value: "guide",
                label: "Guide",
                children: [
                    {
                        value: "disciplines",
                        label: "Disciplines",
                    },
                ],
            },
        ],
        props: {
            lazy: true,
            lazyLoad(node, resolve) {
                // level 当前层级 value 当前值
                const { level, value } = node;
                setTimeout(() => {
                    let nodes = [
                        {
                            value: level + 1,
                            label: "Option - " + level + 1,
                            leaf: false,
                        },
                        {
                            value: level + 2,
                            label: "Option - " + level + 2,
                            leaf: true,
                        },
                    ];
                    resolve(nodes);
                }, 1000);
            },
        },
    },
    {
        type: "rate",
        value: "rate",
        label: "颜色",
    },
    {
        type: "color",
        value: "color",
        label: "颜色sss",
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
        value: "switch",
        label: "内容",
        activeText: "是",
        inactiveText: "否",
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
        type: "select",
        placeholder: "请选择状态",
        value: "multiple",
        label: "状态",
        multiple: true,
        option: [
            {
                value: "1",
                label: "待处理",
            },
            {
                value: "2",
                label: "已处理",
            },
            {
                value: "3",
                label: "已处理",
            },
            {
                value: "4",
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
]);
let form = reactive({
    title: "",
    cover: "",
    content: "",
    multiple: "",
    createTime: "",
    rate: 0,
    switch: false,
    cascader: "",
    id: "",
    color: "",
});
let headerHeader = reactive([
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
]);
let headerForm = reactive({
    writeOffNo: "",
    status: "",
    hotelName: "",
    reserveName: "",
    mobile: "",
    makeDate1: "",
    makeDate2: "",
    startTime: "",
    endTime: "",
});
let page = reactive({
    total: 0,
    page: 1,
    pageSize: 10,
});
const FFormRef = ref(null);

let change = () => {
    page.page = 1;
    getHomeAricles();
};
let getHomeAricles = () => {
    let data = {
        current: page.page,
        size: page.pageSize,
        ...headerForm,
    };
    getHomeAricle(data).then((res) => {
        tableData.length = 0;
        tableData.push(...res.records);
        page.total = res.total;
        tableDataLoading.value = false;
    });
};
getHomeAricles();

let handleEdit = (row) => {
    for (let item in form) {
        form[item] = row[item];
    }
    confirmMode.value = "edit";
    dialogFormVisible.value = true;
};
let handleDelete = (row) => {
    homeAricleDelete(row.id).then((res) => {
        ElMessage({
            message: "删除成功",
            type: "success",
        });
        getHomeAricles();
    });
};

let dialogClose = () => {
    getHomeAricles();
    for (let item in form) {
        form[item] = "";
    }
};

let confirm = () => {
    FFormRef.value
        .submitForm()
        .then((val) => {
            console.log(val);
            console.log(form);
        })
        .catch((err) => {
            console.log(err);
        });

    // if (confirmMode == "add") {
    //     addHomeAricle(form).then((res) => {
    //         dialogFormVisible = false;
    //         ElMessage({
    //             message: "创建成功",
    //             type: "success",
    //         });
    //     });
    // } else if (confirmMode == "edit") {
    //     homeAricleModify(form.id, form).then((res) => {
    //         dialogFormVisible = false;
    //         ElMessage({
    //             message: "修改成功",
    //             type: "success",
    //         });
    //     });
    // }
};

let currentChange = (v) => {
    page.page = v;
    getHomeAricles();
};
</script>

<style lang="scss" scoped>
</style>
