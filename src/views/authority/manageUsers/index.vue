<template>
    <div class="manageUsers">
        <el-form :inline="true" :model="headerForm" class="demo-form-inline">
            <el-form-item label="姓名">
                <el-input
                    v-model="headerForm.name"
                    placeholder="姓名"
                ></el-input>
            </el-form-item>
            <el-form-item label="用户组">
                <el-select v-model="headerForm.grounp" placeholder="用户组">
                    <el-option
                        v-for="(item, index) of grounp"
                        :key="index"
                        :label="item.label"
                        :value="item.label"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button
                    @click="
                        headerForm = {
                            name: '',
                            grounp: '',
                        }
                    "
                    type="primary"
                    >全部</el-button
                >
            </el-form-item>
        </el-form>

        <el-button
            type="primary"
            v-permission="'manager_add'"
            @click="dialogFormVisible = true"
            >新增人员</el-button
        >
        <el-table
            :data="tableData"
            v-loading="tableDataLoading"
            style="width: 100%"
        >
            <el-table-column prop="username" label="账号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column
                prop="adminRole.roleName"
                label="用户组"
                width="180"
            >
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        v-permission="'manager_edit'"
                        @click="handleEdit(scope.row)"
                        >编辑</el-button
                    >

                    <el-tooltip
                        class="item"
                        effect="dark"
                        content="重置密码为 123456"
                        placement="top"
                        style="margin: 0 10px"
                    >
                        <el-popconfirm
                            v-permission="'manager_password'"
                            @onConfirm="handleRest(scope.row.id)"
                            confirm-button-text="确认"
                            cancel-button-text="取消"
                            icon="el-icon-info"
                            title="确定重置吗？"
                        >
                            <el-button slot="reference" size="mini"
                                >重置</el-button
                            >
                        </el-popconfirm>
                    </el-tooltip>

                    <el-button
                        size="mini"
                        type="danger"
                        v-permission="'manager_del'"
                        @click="handleDelete(scope.row.id)"
                        >删除</el-button
                    >
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            class="pagination"
            background
            layout="total, prev, pager, next"
            :total="page.total"
            :page-size="page.pageSize"
            :current-page.sync="page.page"
            @current-change="currentChange"
            :hide-on-single-page="true"
        >
        </el-pagination>
        <el-dialog
            title="新增人员"
            @close="dialogClose"
            v-model="dialogFormVisible"
        >
            <el-form :model="form">
                <el-form-item label="用户组" label-width="70px">
                    <el-select
                        @change="addSelect"
                        v-model="form.roleName"
                        placeholder="用户组"
                    >
                        <el-option
                            v-for="(item, index) of grounp"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="账号" label-width="70px">
                    <el-input
                        v-model="form.username"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" label-width="70px">
                    <el-input
                        type="password"
                        v-model="form.password"
                        autocomplete="off"
                        minlength="6"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" label-width="70px">
                    <el-input
                        type="password"
                        v-model="form.passwords"
                        autocomplete="off"
                        minlength="6"
                    ></el-input>
                </el-form-item>
                <el-form-item label="姓名" label-width="70px">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog
            title="编辑人员"
            @close="dialogClose"
            v-model="dialogFormEdit"
        >
            <el-form :model="formEdit">
                <el-form-item label="用户组" label-width="70px">
                    <el-select
                        @change="EditSelect"
                        v-model="formEdit.roleName"
                        placeholder="用户组"
                    >
                        <el-option
                            v-for="(item, index) of grounp"
                            :key="index"
                            :label="item.label"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="姓名" label-width="70px">
                    <el-input
                        v-model="formEdit.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormEdit = false">取 消</el-button>
                <el-button type="primary" @click="EditUser">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {
    adminRoleAll,
    adminUserPage,
    adminUserModify,
    adminUserPasswordReset,
    adminUserDelete,
    adminUserAdd,
} from "@/api/authority";

export default {
    name: "manageUsers",
    data() {
        return {
            headerForm: {
                name: "",
                grounp: "",
            },
            tableCacheData: [],
            dialogFormVisible: false,
            tableDataLoading: true,

            dialogFormEdit: false,
            form: {
                name: "",
                password: "",
                roleId: 0,
                username: "",
                passwords: "",
                roleName: "",
            },
            formEdit: {
                roleName: "",
                name: "",
                id: "",
                roleId: "",
            },
            grounp: [],
            page: {
                total: 0,
                page: 1,
                pageSize: 10,
            },
        };
    },
    computed: {
        tableData() {
            let data = this.tableCacheData;
            data = this.tableCacheData.filter(
                (data) =>
                    !this.headerForm.name ||
                    data.name
                        .toLowerCase()
                        .includes(this.headerForm.name.toLowerCase())
            );
            data = data.filter(
                (data) =>
                    !this.headerForm.grounp ||
                    data.adminRole.roleName
                        .toLowerCase()
                        .includes(this.headerForm.grounp.toLowerCase())
            );
            return data;
        },
    },
    created() {
        this.adminRoleAll();
        this.adminUserPage();
    },
    methods: {
        // 获取用户组
        adminRoleAll() {
            adminRoleAll().then((res) => {
                let arr = [];
                for (const item of res) {
                    arr.push({
                        label: item.roleName,
                        value: item.id,
                    });
                }
                this.grounp = arr;
            });
        },
        adminUserPage() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
            };
            adminUserPage(data).then((res) => {
                this.tableCacheData = res.records;
                this.page.total = res.total;
                this.tableDataLoading = false;
            });
        },
        EditUser() {
            let data = {
                name: this.formEdit.name,
                roleId: this.formEdit.roleId,
            };
            adminUserModify(this.formEdit.id, data).then((res) => {
                this.$message({
                    message: "修改用户成功",
                    type: "success",
                });
                this.dialogFormEdit = false;
            });
        },
        dialogClose() {
            this.adminUserPage();
            this.form = {
                name: "",
                password: "",
                roleId: 0,
                username: "",
                passwords: "",
                roleName: "",
            };
        },
        EditSelect(data) {
            this.formEdit.roleId = data;
        },
        addSelect(data) {
            this.form.roleId = data;
        },
        handleEdit(row) {
            this.formEdit = {
                roleName: row.adminRole.roleName,
                name: row.name,
                id: row.id,
                roleId: row.roleId,
            };
            this.dialogFormEdit = true;
        },
        handleDelete(row) {
            adminUserDelete(row).then((res) => {
                this.$message({
                    message: "删除用户成功",
                    type: "success",
                });
                this.adminUserPage();
            });
        },
        handleRest(row) {
            adminUserPasswordReset(row).then((res) => {
                this.$message({
                    message: "重置用户密码成功",
                    type: "success",
                });
            });
        },
        confirm() {
            if (this.form.password !== this.form.passwords) {
                this.$message({
                    message: "用户密码错误",
                    type: "error",
                });
            }
            let data = {
                name: this.form.name,
                roleId: this.form.roleId,
                password: this.form.password,
                username: this.form.username,
            };
            adminUserAdd(data).then((res) => {
                this.$message({
                    message: "创建用户成功",
                    type: "success",
                });
                this.dialogFormVisible = false;
            });
        },
        currentChange(v) {
            this.page.page = v;
            this.adminUserPage();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
