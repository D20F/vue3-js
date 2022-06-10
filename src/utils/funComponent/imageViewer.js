import { createApp, h } from "vue";
import { ElImageViewer } from "element-plus";
export default (v) => {
    let dom = document.body.appendChild(document.createElement("div"));
    const app = createApp({
        render() {
            return h(
                ElImageViewer,
                {
                    urlList: v,
                    onClose: this.dialogClose
                },
            );
        },
        data() {
            return {};
        },
        methods: {
            dialogClose() {
                dom.remove();
            },
        },
        computed: {},
    });
    app.mount(dom);
}

