<template>
    <div>
        <el-button type="success" size="mini" @click="dialogFormVisible = true"
            >查看详情</el-button
        >
        <el-dialog
            width="70%"
            title="详情"
            :visible.sync="dialogFormVisible"
            :modal="true"
            :destroy-on-close="true"
            :close-on-click-modal="false"
        >
            <div class="content" v-html="content"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name: "openTinymce",
    props: {
        content: {
            type: String,
            default: "",
        },
    },
    computed: {},
    data() {
        return { dialogFormVisible: false };
    },
    methods: {},
};
</script>

<style scoped>
.content {
    width: 100%;
    height: 600px;
    overflow: hidden;
    overflow-y: auto;
    overflow-x: auto;
}
</style>
