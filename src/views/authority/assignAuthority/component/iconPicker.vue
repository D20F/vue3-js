
<template>
    <el-popover
        placement="bottom-start"
        popper-class="pupop-select-icon"
        trigger="click"
        :visible="popoverVisible"
        width="400"
    >
        <el-scrollbar
            v-if="popoverVisible"
            style="height: 300px"
            class="hide-x"
            :native="false"
            :noresize="false"
        >
            <div
                class="icon-item"
                v-for="item in options"
                :key="item"
                :class="{ 'is-active': isActive(item) }"
                @click="onClickSelected(item)"
            >
                <component :is="item" />
            </div>
        </el-scrollbar>

        <template #reference>
            <div
                :class="{
                    'mod-select-icon': 1,
                    'is-opened': popoverVisible,
                    'is-active': value,
                }"
            >
                <div
                    class="icon-item icon-plus"
                    @click="popoverVisible = !popoverVisible"
                >
                    <el-icon>
                        <component :is="value ? value : 'plus'" />
                    </el-icon>
                </div>
            </div>
        </template>
    </el-popover>
</template>

<script>
import { fa } from "element-plus/lib/locale";
import icon from "./icon";

export default {
    name: "SelectIcon",
    data() {
        return {
            // 弹出框显示状态
            popoverVisible: false,
            // 选项数据，图标类名数组
            options: icon,
            value: "",
        };
    },
    props: {
        modelValue: {
            type: [String, Object],
            default: "",
        },
    },
    computed: {},
    methods: {
        // 是否为当前已选项
        isActive(item) {
            return this.value === item;
        },
        // 选中图标
        onClickSelected(item) {
            this.$emit("update:modelValue", item);
            this.popoverVisible = false;
            this.value = item;
        },
    },
};
</script>


<style lang="scss" scoped>
.pupop-select-icon {
}
.hide-x {
    width: 400px;
    height: 400px;
}
.icon-plus {
    display: flex;
    align-items: center;
    justify-content: center;
}

.mod-select-icon {
    $size: 40px; // 图标项大小
    $col-count: 8; // 多少列
    $row-count: 4; // 多少行
    $scope: 5px; // 间隔
    $--border-color-base: #dcdfe6;
    $--color-primary: #409eff;
    $--background-color-base: #f5f7fa;
    $--color-info: #909399;
    $--color-danger: #f56c6c;
    $--color-white: #fff !default;
    $--color-success: #67c23a !default;
    $--color-info-light: mix($--color-white, $--color-info, 80%) !default;
    $--color-success-light: mix($--color-white, $--color-success, 80%) !default;

    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: $size + 2px;
    height: $size + 2px;
    border: 1px dashed $--border-color-base;
    border-radius: 5px;
    text-align: center;
    cursor: pointer;
    outline: none;

    // 菜单打开状态
    &.is-opened,
    &:hover {
        border-color: $--color-primary;
    }
    // 禁用状态
    &.is-disabled:hover {
        border-color: $--border-color-base !important;
    }
    &.is-disabled,
    &.is-disabled > .icon-item,
    // 已选状态
    &.is-active {
        border-style: solid;
        border-radius: 0;
        > .icon-item {
            width: $size;
            height: $size;
            line-height: $size;
            padding: $scope;
            text-align: center;
            cursor: pointer;
            > i {
                display: block;
                width: 100%;
                height: 100%;
                line-height: $size - ($scope * 2);
                color: $--color-white;
                background-color: $--color-primary;
            }
        }
    }
    > .icon-item > i {
        font-size: 16px;
    }
    > .icon-item > i.el-icon-plus {
        width: 100%;
        line-height: $size;
        font-size: ($size / 2);
        font-weight: bold;
        color: $--color-info;
        cursor: inherit;
    }

    // 弹出内容
    @at-root .el-popover.el-popper.pupop-select-icon {
        display: block;
        padding: 0;
        width: ($size + $scope * 2) * $col-count + 2px;
        height: ($size + $scope * 2) * $row-count;

        > .el-scrollbar {
            height: 100%;
        }
        .el-scrollbar__view {
            // @extend .fn-clear;
        }

        .icon-item {
            float: left;
            width: $size;
            height: $size;
            line-height: $size;
            margin: $scope;
            padding: $scope;
            text-align: center;
            cursor: pointer;
            &:hover {
                background-color: $--color-info-light;
            }
            &.is-active {
                background-color: $--color-success-light;
                border: 1px solid $--color-success;
            }
            > i {
                display: block;
                width: 100%;
                height: 100%;
                font-size: 16px;
                line-height: $size - ($scope * 2);
                color: $--color-white;
                background-color: $--color-primary;
            }
        }
    }
}
</style>
