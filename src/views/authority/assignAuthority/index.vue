<template>
    <div class="assignAuthority">
        <div class="left">
            <div class="header">
                <el-input
                    size="large"
                    placeholder="输入关键字进行过滤"
                    v-model="filterText"
                />
                <el-button
                    size="large"
                    v-permission="'rule_add'"
                    @click="open()"
                    type="primary"
                    >新增顶层菜单</el-button
                >
            </div>
            <el-tree
                :data="tree"
                node-key="id"
                ref="tree"
                highlight-current
                :props="defaultProps"
                :filter-node-method="filterNode"
                :default-checked-keys="defaultSelect"
                @current-change="currentChange"
            >
                <template #default="{ data }">
                    <span class="custom-tree-node">
                        <el-icon v-if="data.type == 2"><avatar /></el-icon>
                        <i v-else-if="data.type == 1" :class="data.icon"></i>
                        <span>{{ data.name }}</span>
                        <span v-if="data.name == form.name">
                            <el-button
                                v-if="data.type == 1"
                                type="text"
                                v-permission="'rule_add'"
                                @click.stop="append(data)"
                            >
                                新增
                            </el-button>
                            <el-button
                                type="text"
                                v-permission="'rule_del'"
                                @click.stop="remove(data)"
                            >
                                删除
                            </el-button>
                        </span>
                    </span>
                </template>
            </el-tree>
        </div>

        <div class="right">
            <el-form :model="form">
                <el-form-item label="上级菜单" label-width="70px">
                    <el-input
                        size="large"
                        :disabled="true"
                        v-model="form.supName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    v-if="form.type == 1"
                    label="URL"
                    label-width="70px"
                >
                    <el-input
                        size="large"
                        v-model="form.menuPath"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="名称" label-width="70px">
                    <el-input
                        size="large"
                        v-model="form.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    v-if="form.type == 1"
                    label="选择图标"
                    label-width="70px"
                >
                    <div style="display: flex">
                        <iconPicker v-model="form.icon" />
                        <el-input
                            size="large"
                            :disabled="false"
                            v-model="form.icon"
                            autocomplete="off"
                        ></el-input>
                    </div>
                </el-form-item>
                <el-form-item
                    v-else-if="form.type == 2"
                    label="按钮标识"
                    label-width="70px"
                >
                    <el-input
                        size="large"
                        v-model="form.identify"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="备注" label-width="70px">
                    <el-input
                        size="large"
                        v-model="form.content"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer">
                <el-button
                    size="large"
                    type="primary"
                    v-permission="'rule_edit'"
                    @click.stop="confirm()"
                    >确 定</el-button
                >
            </div>
        </div>

        <el-dialog width="80%" title="新增" v-model="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="上级菜单" label-width="70px">
                    <el-input
                        size="large"
                        :disabled="true"
                        v-model="form.supName"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="名称" label-width="70px">
                    <el-input
                        size="large"
                        v-model="form.name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="选择类型" label-width="70px">
                    <el-button
                        size="large"
                        type="primary"
                        @click="form.type = 1"
                        >菜单</el-button
                    >
                    <el-button
                        size="large"
                        type="success"
                        @click="form.type = 2"
                        >按钮</el-button
                    >
                </el-form-item>
                <el-form-item
                    v-if="form.type == 1"
                    label="URL"
                    label-width="70px"
                >
                    <el-input
                        size="large"
                        v-model="form.menuPath"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    v-if="form.type == 1"
                    label="选择图标"
                    label-width="70px"
                >
                    <div style="display: flex">
                        <iconPicker v-model="form.icon" />
                        <el-input
                            size="large"
                            :disabled="false"
                            v-model="form.icon"
                            autocomplete="off"
                        ></el-input>
                    </div>
                </el-form-item>
                <el-form-item
                    v-if="form.type == 2"
                    label="按钮标识"
                    label-width="70px"
                >
                    <el-input
                        size="large"
                        v-model="form.identify"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>

                <el-form-item label="备注" label-width="70px">
                    <el-input
                        size="large"
                        v-model="form.content"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <template #footer class="dialog-footer">
                <el-button size="large" @click="dialogFormVisible = false"
                    >取 消</el-button
                >
                <el-button size="large" type="primary" @click="dialogConfirm"
                    >确 定</el-button
                >
            </template>
        </el-dialog>

        <el-icon><apple /></el-icon>
    </div>
</template>

<script>
import iconPicker from "./component/iconPicker.vue";
import {
    adminPermissionPage,
    adminPermissionAdd,
    adminPermissionDelete,
    adminPermissionModify,
} from "@/api/authority";

export default {
    name: "assignAuthority",
    components: {
        iconPicker,
    },
    mixins: [],
    data() {
        return {
            tree: [],
            form: {
                supName: "", //上级菜单  顶层为''空
                content: "", //备注
                icon: "", //
                menuPath: "", // 路径
                name: "", //
                type: "", // 1页面 2按钮
                pid: "", //pid
                identify: "", // 按钮标识
                sequence: "", // 排序
            },
            defaultProps: {
                children: "children",
                label: "name",
            },
            filterText: "",
            dialogFormVisible: false,
            defaultSelect: [],
        };
    },
    computed: {},
    watch: {
        filterText(val) {
            this.$refs.tree.filter(val);
        },
    },
    created() {
        this.init();
    },
    methods: {
        init() {
            this.adminPermissionPage();
        },
        // 获取权限树
        adminPermissionPage() {
            adminPermissionPage().then((res) => {
                this.tree = res;
            });
        },
        open() {
            for (const item in this.form) {
                if (item == "sequence") {
                    this.form.sequence = this.tree.length + 1;
                } else if (item == "type") {
                    this.form.type = 1;
                } else {
                    this.form[item] = "";
                }
            }
            this.dialogFormVisible = true;
        },
        clear() {
            for (const item in this.form) {
                this.form[item] = "";
            }
        },
        currentChange(v) {
            // 把选中的数据 传给右边的form表单
            let data = JSON.parse(JSON.stringify(v));
            this.form = data;
        },
        confirm() {
            adminPermissionModify(this.form.id, this.form).then((res) => {
                this.adminPermissionPage();
                this.clear();
            });
        },
        dialogConfirm() {
            adminPermissionAdd(this.form).then((res) => {
                this.adminPermissionPage();
                this.clear();
                this.dialogFormVisible = false;
            });
        },
        append(v) {
            let data = JSON.parse(JSON.stringify(v));
            for (const item in this.form) {
                this.form[item] = "";
            }
            this.form.pid = data.id;
            this.form.supName = data.name;
            this.form.type = 1;
            this.dialogFormVisible = true;
        },
        remove(data) {
            adminPermissionDelete(data.id).then((res) => {
                this.adminPermissionPage();
            });
        },
        filterNode(value, data) {
            if (!value) return true;
            return data.name.indexOf(value) !== -1;
        },
    },
};
</script>

<style lang="scss" scoped>
.assignAuthority {
    display: flex;
    justify-content: space-around;
    width: 100%;
}
.left {
    width: 40%;
    .header {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
}
.right {
    width: 40%;
}
.custom-tree-node {
    span:nth-child(2) {
        margin: 0 8px;
    }
}
</style>
