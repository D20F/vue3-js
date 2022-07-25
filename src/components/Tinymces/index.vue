<template>
    <div class="tinymce-container">
        <editor
            ref="editor"
            :id="id"
            v-model="value"
            :init="{
                selector: '#' + id,
                height: 560,
                min_height: 560,
                menubar: false,
                plugins: plugins,
                toolbar: toolbar,
                fontsize_formats:
                    '12px 14px 16px 18px 24px 36px 48px 56px 72px',
                menubar: 'file edit insert view format table',
                language: 'zh_CN',
                paste_data_images: true,
            }"
            @change="change"
        />
        <div class="editor-custom-btn-container">
            <editorImage
                color="#1890ff"
                class="editor-upload-btn"
                @successCBK="imageSuccessCBK"
            />
        </div>
    </div>
</template>

<script>
// tinymce 中文文档
// http://tinymce.ax-z.cn/

import editorImage from "./components/EditorImage";
import Editor from "@tinymce/tinymce-vue";
import plugins from "./plugins";
import toolbar from "./toolbar";
export default {
    name: "Tinymces",
    props: {
        id: {
            type: String,
            default: function () {
                return (
                    "vue-tinymce-" +
                    +new Date() +
                    ((Math.random() * 1000).toFixed(0) + "")
                );
            },
        },
        modelValue: {
            default: "",
        },
    },
    data() {
        return {
            value: this.modelValue,
            plugins: plugins,
            toolbar: toolbar,
        };
    },
    components: { editor: Editor, editorImage: editorImage },
    computed: {},
    watch: {},
    created() {
        this.value = this.modelValue;
    },
    mounted() {},
    methods: {
        imageSuccessCBK(arr) {
            const _this = this;
            arr.forEach((v) => {
                window.tinymce
                    .get(_this.id)
                    .insertContent(`<img class="wscnph" src="${v}" >`);
            });
        },
        change(event, editor) {
            this.$emit("update:modelValue", event.level.content);
        },
    },
};
</script>

<style>
.el-overlay {
    z-index: 1300 !important;
}
.tox-notifications-container {
    display: none;
}
</style>
<style scoped>
.tinymce-container /deep/ .mce-container,
.mce-container *,
.mce-widget,
.mce-widget *,
.mce-reset {
    white-space: pre-wrap !important;
    width: 100% !important;
}
.tinymce-container {
    width: 100%;
    position: relative;
    line-height: normal;
}
.tinymce-container >>> .mce-fullscreen {
    z-index: 10000;
}
.tinymce-textarea {
    visibility: hidden;
    z-index: -1;
}
.editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    z-index: 2005;
}
.editor-upload-btn {
    margin-left: 10px;
    display: inline-block;
}
</style>
