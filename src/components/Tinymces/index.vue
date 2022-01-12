<template>
    <div class="tinymce-container">
        <editor
            ref="editor"
            :id="tinymceId"
            v-model="value"
            :init="{
                selector: '#' + tinymceId,
                height: height,
                menubar: false,
                plugins: plugins,
                toolbar: toolbar,
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
        height: {
            type: [Number, String],
            required: false,
            default: 480,
        },
    },
    data() {
        return {
            value: this.modelValue,
            plugins: plugins,
            toolbar: toolbar,
            tinymceId: this.id,
        };
    },
    components: { editor: Editor, editorImage: editorImage },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
        imageSuccessCBK(arr) {
            const _this = this;
            arr.forEach((v) => {
                window.tinymce
                    .get(_this.tinymceId)
                    .insertContent(`<img class="wscnph" src="${v.url}" >`);
            });
        },
        change(event, editor) {
            this.$emit("update:modelValue", event.level.content);
        },
    },
};
</script>

<style scoped>
/deep/ #mceu_44-body {
    white-space: pre-wrap !important;
}
/deep/ #mceu_46-body {
    white-space: pre-wrap !important;
}
/deep/ .mce-container,
.mce-container *,
.mce-widget,
.mce-widget *,
.mce-reset {
    white-space: pre-wrap !important;
    width: 100% !important;
}
/deep/ .mce-flow-layout {
    white-space: pre-wrap !important;
}

/deep/ .mce-widget {
    white-space: pre-wrap !important;
}
/deep/ .mce-ico {
    font-size: 1rem !important;
}
.tinymce-container {
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
    display: inline-block;
}
</style>
