<template>
    <div class="navbar">
        <hamburger
            :is-active="sidebar.opened"
            class="hamburger-container"
            @toggleClick="toggleSideBar"
        />

        <breadcrumb class="breadcrumb-container" />

        <div class="right-menu">
            <el-dropdown class="avatar-container">
                <div class="avatar-wrapper">
                    <img :src="avatar" class="user-avatar" />
                    <div class="right-name">
                        <p>{{ name }}</p>
                    </div>
                </div>
                <template #dropdown class="user-dropdown">
                    <el-dropdown-menu>
                        <router-link to="/">
                            <el-dropdown-item icon="el-icon-user">
                                主页
                            </el-dropdown-item>
                        </router-link>
                        <el-dropdown-item
                            icon="el-icon-edit"
                            divided
                            @click="dialogFormVisible = true"
                        >
                            修改密码
                        </el-dropdown-item>
                        <el-dropdown-item
                            icon="el-icon-switch-button"
                            divided
                            @click="logout"
                        >
                            退出
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
        <el-dialog
            title="修改密码"
            v-model="dialogFormVisible"
            :modal="true"
            :destroy-on-close="true"
            :close-on-click-modal="false"
        >
            <el-form :model="form">
                <el-form-item label="旧密码" label-width="100px">
                    <el-input
                        v-model="form.oldPassword"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="新密码" label-width="100px">
                    <el-input
                        show-password
                        v-model="form.newPassword"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="再次输入密码" label-width="100px">
                    <el-input
                        show-password
                        v-model="form.newPasswords"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>

            <template #footer class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirm">确 定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Breadcrumb from "@/components/Breadcrumb";
import Hamburger from "@/components/Hamburger";
import { adminUserPasswordUpdate } from "@/api/authority";
import { ElMessage } from "element-plus";

export default {
    data() {
        return {
            dialogFormVisible: false,
            form: {
                oldPassword: "",
                newPassword: "",
                newPasswords: "",
            },
        };
    },
    components: {
        Breadcrumb,
        Hamburger,
    },
    computed: {
        ...mapGetters(["sidebar", "name", "avatar"]),
    },
    methods: {
        toggleSideBar() {
            this.$store.dispatch("app/toggleSideBar");
        },
        async logout() {
            await this.$store.dispatch("user/logout");
            this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        },
        confirm() {
            if (this.form.newPassword.length < 6) {
                return ElMessage({
                    message: "密码长度需要大于6位",
                    type: "error",
                    duration: 3 * 1000,
                });
            }
            if (this.form.newPassword !== this.form.newPasswords) {
                return ElMessage({
                    message: "两次输入密码不同",
                    type: "error",
                    duration: 3 * 1000,
                });
            }
            let data = {
                newPassword: this.form.newPassword,
                oldPassword: this.form.oldPassword,
            };
            adminUserPasswordUpdate(data).then((res) => {
                ElMessage({
                    message: "修改成功,请重新登录",
                    type: "success",
                    duration: 3 * 1000,
                });
                this.dialogFormVisible = false;
                this.form = {
                    oldPassword: "",
                    newPassword: "",
                    newPasswords: "",
                };
                this.$store.dispatch("user/logout");
                this.$router.replace("/login");
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .hamburger-container {
        line-height: 46px;
        height: 100%;
        float: left;
        cursor: pointer;
        transition: "background" 0.3s;
        -webkit-tap-highlight-color: transparent;

        &:hover {
            background: rgba(0, 0, 0, 0.025);
        }
    }

    .breadcrumb-container {
        float: left;
    }

    .right-menu {
        float: right;
        height: 100%;
        &:focus {
            outline: none;
        }

        .right-menu-item {
            display: inline-block;
            padding: 0 8px;
            height: 100%;
            font-size: 18px;
            color: #5a5e66;
            vertical-align: text-bottom;

            &.hover-effect {
                cursor: pointer;
                transition: "background" 0.3s;

                &:hover {
                    background: rgba(0, 0, 0, 0.025);
                }
            }
        }

        .avatar-container {
            .avatar-wrapper {
                margin-top: 7.5px;
                position: relative;

                .user-avatar {
                    cursor: pointer;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                }

                .right-name {
                    display: inline-block;
                    margin: 0 20px 0 5px;
                    height: 100%;
                    vertical-align: top;
                    p {
                        font-size: 14px;
                        color: #5a5e66;
                        line-height: 40px;
                    }
                }

                .el-icon-caret-bottom {
                    cursor: pointer;
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>
