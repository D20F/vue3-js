<template>
    <div class="userGroup">
        <el-button
            size="large"
            type="primary"
            v-permission="'group_add'"
            @click="
                dialogFormVisible = true;
                form.mode = 'add';
            "
            >新增用户组</el-button
        >
        <el-table
            :data="tableData"
            v-loading="tableDataLoading"
            style="width: 100%"
        >
            <el-table-column prop="roleName" label="名称" width="180">
            </el-table-column>
            <el-table-column prop="roleDescribe" label="备注" width="180">
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间">
            </el-table-column>
            <el-table-column label="操作" min-width="150px">
                <template #default="scope">
                    <el-button
                        v-permission="'group_edit'"
                        @click="handleEdit(scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        type="danger"
                        v-permission="'group_del'"
                        @click="handleDelete(scope.row)"
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
            v-model:current-page="page.page"
            @current-change="currentChange"
            :hide-on-single-page="true"
        >
        </el-pagination>
        <el-dialog
            width="80%"
            title="权限配置"
            v-model="dialogFormVisible"
            @close="dialogClose"
            :destroy-on-close="true"
            :close-on-click-modal="false"
        >
            <el-button
                type="primary"
                @click="setCheckedKeys(getTreeKey())"
                round
                >全选</el-button
            >
            <el-button type="success" @click="setCheckedKeys([])" round
                >清空</el-button
            >
            <el-input
                size="large"
                style="margin: 10px 0"
                placeholder="输入关键字进行过滤"
                v-model="filterText"
            >
            </el-input>

            <el-tree
                :data="tree"
                show-checkbox
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
                :filter-node-method="filterNode"
                :default-checked-keys="defaultSelect"
                check-strictly
            />

            <el-form :model="form">
                <el-form-item label="名称" label-width="40px">
                    <el-input
                        size="large"
                        v-model="form.roleName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="备注" label-width="40px">
                    <el-input
                        size="large"
                        v-model="form.roleDescribe"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer class="dialog-footer">
                <el-button size="large" @click="dialogFormVisible = false"
                    >取 消</el-button
                >
                <el-button size="large" type="primary" @click="confirm"
                    >确 定</el-button
                >
            </template>
        </el-dialog>
    </div>
</template>

<script>
import {
    adminRoleAdd,
    adminRoleModify,
    adminRoleAll,
    adminPermissionPage,
    adminRoleDelete,
} from "@/api/authority";

export default {
    name: "userGroup",
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            tableDataLoading: true,
            form: {
                roleName: "",
                roleDescribe: "",
                mode: "",
                id: "",
            },
            tree: [],
            defaultProps: {
                children: "children",
                label: "name",
            },
            filterText: "",
            defaultSelect: [],
            page: {
                total: 0,
                page: 1,
                pageSize: 10,
            },
        };
    },
    computed: {},
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    created() {
        this.adminRoleAll();
        this.adminPermissionPage();
    },
    methods: {
        // 获取用户组
        adminRoleAll() {
            let data = {
                current: this.page.page,
                size: this.page.pageSize,
            };
            adminRoleAll(data).then((res) => {
                // console.log(res);
                this.tableData = res;
                this.page.total = res.total;
                this.tableDataLoading = false;
            });
        },
        // 获取权限树
        adminPermissionPage() {
            adminPermissionPage().then((res) => {
                // console.log(res);
                this.tree = res;
            });
        },
        handleEdit(row) {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.setCheckedKeys(row.list);
            });
            this.form = {
                roleName: row.roleName,
                roleDescribe: row.roleDescribe,
                mode: "edit",
                id: row.id,
            };
        },
        handleDelete(row) {
            adminRoleDelete(row.id).then((res) => {
                this.$message({
                    message: "删除用户组成功",
                    type: "success",
                });
                this.adminRoleAll();
            });
        },
        dialogClose() {
            this.resetChecked();
            this.adminRoleAll();
            this.adminPermissionPage();
            this.form = {
                roleName: "",
                roleDescribe: "",
                mode: "",
                id: "",
            };
        },
        flatTree() {
            // 扁平化 tree
            let cache = [];
            let parseArr = (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].children instanceof Array) {
                        parseArr(data[i].children);
                        let obj = JSON.parse(JSON.stringify(data[i]));
                        obj.children = null;
                        cache.push(obj);
                    } else {
                        cache.push(data[i]);
                    }
                }
            };
            parseArr(this.tree);
            return cache;
        },
        // 获取 tree 所有key
        getTreeKey() {
            let key = [];
            let parseArr = (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].children instanceof Array) {
                        parseArr(data[i].children);
                        key.push(data[i].id);
                    } else {
                        key.push(data[i].id);
                    }
                }
            };
            parseArr(this.tree);
            return key;
        },
        // 选中 tree node节点
        getSelectedNode() {
            // 选中key
            let key = [];
            key = this.$refs.tree
                .getCheckedKeys()
                .concat(this.$refs.tree.getHalfCheckedKeys());
            // 顶层
            let onCacheParent = [];
            // 次级
            let onCacheItem = [];
            for (let item of this.$refs.tree.getCheckedNodes(false, true)) {
                if (item.supName == null) {
                    onCacheParent.push(item);
                } else {
                    onCacheItem.push(item);
                }
            }

            let parseArr = (data) => {
                for (let i = 0; i < data.length; i++) {
                    if (key.indexOf(data[i].id) == -1) {
                        data.splice(i, 1);
                        i--;
                        if (data[i].children instanceof Array) {
                            parseArr(data[i].children);
                        }
                    }
                }
            };
            for (let i = 0; i < onCacheParent.length; i++) {
                parseArr(onCacheParent[i].children);
            }
            // 选中后的tree
            return onCacheParent;
        },
        confirm() {
            if (this.form.mode == "add") {
                let key = [];
                key = this.$refs.tree
                    .getCheckedKeys()
                    .concat(this.$refs.tree.getHalfCheckedKeys());
                let data = {
                    list: key,
                    roleName: this.form.roleName,
                    roleDescribe: this.form.roleDescribe,
                };
                adminRoleAdd(data).then((res) => {
                    this.$message({
                        message: "创建用户组成功",
                        type: "success",
                    });
                    this.dialogFormVisible = false;
                });
            } else if (this.form.mode == "edit") {
                let key = [];
                key = this.$refs.tree
                    .getCheckedKeys()
                    .concat(this.$refs.tree.getHalfCheckedKeys());
                let data = {
                    list: key,
                    roleName: this.form.roleName,
                    roleDescribe: this.form.roleDescribe,
                };
                adminRoleModify(this.form.id, data).then((res) => {
                    this.$message({
                        message: "修改用户组成功",
                        type: "success",
                    });
                    this.dialogFormVisible = false;
                });
            }
        },
        // 设置tree 选中
        setCheckedKeys(data) {
            this.$refs.tree.setCheckedKeys(data);
        },
        // 清空tree 选中
        resetChecked() {
            this.$refs.tree.setCheckedKeys([]);
        },
        // 过滤
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
        currentChange(v) {
            this.page.page = v;
            this.adminRoleAll();
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
