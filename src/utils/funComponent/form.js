import { createApp, h, } from "vue";
import {
    ElForm,
    ElFormItem,
    ElDialog,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElMessage,
} from "element-plus";
import Tinymce from "@/components/Tinymce";
import UploadImage from "@/components/UploadImage";
import UploadVideo from "@/components/UploadVideo";
import datetimerange from "@/components/FForm/datetimerange";
import dateTimePicker from "@/components/FForm/dateTimePicker";



export default (v) => {
    let dom = document.body.appendChild(document.createElement("div"));
    const app = createApp({
        render() {
            let select = (item) => h(
                ElSelect,
                {
                    size: item.size || 'large',
                    multiple: item.multiple,
                    placeholder: item.placeholder || '请选择',
                    modelValue: v.headerData[item.value],
                    onChange: (val) => {
                        v.headerData[item.value] = val;
                    },
                },
                () => item.option.map((item) => {
                    return h(
                        ElOption,
                        {
                            label: item.label,
                            value: item.value,
                        },
                    );
                })
            );
            let input = (item) => h(
                ElInput,
                {
                    type: item.inputType || 'text',
                    rows: item.rows || 4,
                    modelValue: v.headerData[item.value],
                    onInput: (res) => {
                        v.headerData[item.value] = res;
                    },
                    placeholder: item.placeholder || '请输入',
                    disabled: item.disabled || false,
                }
            )
            let image = (item) => h(
                UploadImage,
                {
                    props: {
                        limit: item.limit || 1,
                        uploadType: item.uploadType || 'lc',
                        autoUpload: item.autoUpload || true,
                        modelValue: v.headerData[item.value],
                        'onUpdate:modelValue': (res) => {
                            console.log(res)
                            v.headerData[item.value] = res;
                        },
                    },
                }
            )

            let form = h(
                ElForm,
                {
                    model: v.headerData,
                    labelWidth: v.formLabelWidth,
                },
                () => v.rowHeader.map((item) => {
                    return h(
                        ElFormItem,
                        {
                            label: item.label,
                            labelWidth: item.labelWidth,
                            rules: item.rules,
                            prop: item.value
                        },
                        {
                            default: () => {
                                if (item.type == 'select') {
                                    return select(item)
                                } else if (item.type == 'image') {
                                    return image(item)
                                } else {
                                    return input(item)
                                }
                            }
                        }
                    );
                })
            );
            let footer = [
                h(
                    ElButton,
                    {
                        size: 'large',
                        onClick: () => {
                            this.dialogFormVisible = false
                        }
                    },
                    () => '取消'
                ),
                h(
                    ElButton,
                    {
                        size: 'large',
                        type: 'primary',
                        onClick: () => {
                            v.success(v.headerData)
                        }
                    },
                    () => '确定'
                )
            ]
            return h(
                ElDialog,
                {
                    width: v.dialog.width,
                    title: v.dialog.title,
                    modelValue: this.dialogFormVisible,
                    modal: true,
                    destroyOnClose: true,
                    closeOnClickModal: false,
                    onClose: this.dialogClose
                },
                {
                    default: () => form,
                    footer: () => footer,
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




// import openForm from "@/utils/funComponent/form";
// import { ref, reactive, onMounted } from "vue";
// let headerData = reactive({
//     title: "",
//     cover: "",
//     video: "",
//     startTime: "",
//     endTime: "",
//     content: "",
//     makeDate1: "",
//     createTime: "",
//     cs: "",
//     id: "",
// });
// openForm({
//     dialog: { width: "90%", title: "详情" },
//     formLabelWidth: "40px",
//     headerData: headerData,
//     rowHeader: [
//         {
//             value: "title",
//             label: "标题",
//         },
//         {
//             type: "image",
//             value: "cover",
//             label: "封面",
//         },
//         {
//             type: "video",
//             value: "cs",
//             label: "封面s",
//         },
//         {
//             type: "switch",
//             value: "content",
//             label: "内容",
//         },
//         {
//             type: "datetimerange",
//             placeholder: ["开始", "结束"],
//             startValue: "startTime",
//             endValue: "endTime",
//             label: "创建时间",
//         },
//         {
//             type: "datetime",
//             placeholder: "开始",
//             value: "makeDate1",
//             label: "创建时间",
//         },
//         {
//             type: "select",
//             placeholder: "请选择状态",
//             value: "id",
//             label: "状态",
//             option: [
//                 {
//                     value: "1",
//                     label: "待处理",
//                 },
//                 {
//                     value: "2",
//                     label: "已处理",
//                 },
//             ],
//         },
//         {
//             type: "tinymce",
//             value: "content",
//             label: "内容",
//         },
//     ],
//     success: (res) => {
//         console.log(res);
//     },
// });