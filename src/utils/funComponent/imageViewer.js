import { createApp, h, defineComponent, ref } from "vue";
import { ElDialog, ElImage } from "element-plus";

export default (v) => {
    let dom = document.body.appendChild(document.createElement("div"));
    const app = createApp({
        render() {
            if (!v) {
                return h("span", '')
            }
            const MyImage = defineComponent({
                props: {
                    src: {
                        type: String,
                        default: '',
                    },
                },
                setup(props) {
                    let params = {
                        src: props.src,
                        style: 'width: 150px; height: 150px;margin:0 30px 15px 0;',
                        fit: 'cover',
                        previewSrcList: [props.src]
                    }
                    return () => (
                        <ElImage {...params} />
                    )

                }
            })

            const MyElDialog = defineComponent({
                props: {
                    width: {
                        type: String,
                        default: '600px',
                    },
                    title: {
                        type: String,
                        default: '图片详情',
                    },
                },
                setup(props, context) {
                    let params = {
                        width: props.width,
                        title: props.title,
                        modal: true,
                        destroyOnClose: true,
                        closeOnClickModal: false,
                    }
                    const dialogFormVisible = ref(true)
                    let onClose = () => {
                        dom.remove();
                    }
                    const slots = {
                        default: () => v.map((item) => <MyImage src={item} />)
                    }

                    return () => (
                        <ElDialog {...params} modelValue={dialogFormVisible.value} onClose={onClose} v-slots={slots} />
                    )

                }
            })

            return h(MyElDialog, { width: '580px', title: '图片详情' });
        }
    });
    app.mount(dom);
}

