import { createApp, h } from "vue";
import { ElDialog, ElImage } from "element-plus";
export default (v) => {
    let dom = document.body.appendChild(document.createElement("div"));
    const app = createApp({
        render() {
            if (!v) {
                return h("span", '')
            }
            let image = (item) => h(
                ElImage,
                {
                    style: 'width: 150px; height: 150px;margin:0 30px 15px 0;',
                    fit: 'cover',
                    src: item,
                    previewSrcList: [item]
                }
            );
            return h(
                ElDialog,
                {
                    width: '580px',
                    title: '图片详情',
                    modelValue: this.dialogFormVisible,
                    modal: true,
                    destroyOnClose: true,
                    closeOnClickModal: false,
                    onClose: this.dialogClose
                },
                {
                    default: () => {
                        return v.map((item) => {
                            return image(item)
                        })
                    }
                }
            );
        },
        data() {
            return {
                dialogFormVisible: true,
            };
        },
        methods: {
            dialogClose() { dom.remove(); },
        },
        computed: {},
    });
    app.mount(dom);
}

