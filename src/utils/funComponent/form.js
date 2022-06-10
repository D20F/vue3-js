import { createApp, h, } from "vue";
import {
    ElForm,
    ElFormItem,
    ElDialog,
    ElInput,
    ElButton,
    ElSelect,
    ElOption,
    ElSwitch,
    ElDatePicker,
    ElColorPicker,
    ElCascader,
    ElRate,
} from "element-plus";
import UploadImage from "@/components/UploadImage";
import UploadVideo from "@/components/UploadVideo";
import Tinymce from "@/components/Tinymce";
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
                    limit: item.limit || 1,
                    uploadType: item.uploadType || 'lc',
                    autoUpload: item.autoUpload || true,
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let video = (item) => h(
                UploadVideo,
                {
                    limit: item.limit || 1,
                    uploadType: item.uploadType || 'lc',
                    autoUpload: item.autoUpload || true,
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let switchs = (item) => h(
                ElSwitch,
                {
                    inlinePrompt: true,
                    activeColor: item.activeColor || '#13ce66',
                    inactiveColor: item.inactiveColor || '#ff4949',
                    activeText: item.activeText,
                    inactiveText: item.inactiveText,
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let dateTimePickers = (item) => h(
                dateTimePicker,
                {
                    list: item,
                    startValue: v.headerData[item.startValue],
                    'onUpdate:startValue': (res) => {
                        v.headerData[item.startValue] = res;
                    },
                    endValue: v.headerData[item.endValue],
                    'onUpdate:endValue': (res) => {
                        v.headerData[item.endValue] = res;
                    },
                }
            )
            let datetimeranges = (item) => h(
                datetimerange,
                {
                    list: item,
                    dateType: item.dateType,
                    format: item.format,
                    valueFormat: item.valueFormat,
                    startValue: v.headerData[item.startValue],
                    'onUpdate:startValue': (res) => {
                        v.headerData[item.startValue] = res;
                    },
                    endValue: v.headerData[item.endValue],
                    'onUpdate:endValue': (res) => {
                        v.headerData[item.endValue] = res;
                    },
                }
            )
            let dates = (item) => h(
                ElDatePicker,
                {
                    placeholder: item.placeholder,
                    type: "date",
                    size: "large",
                    format: "YYYY/MM/DD",
                    valueFormat: "YYYY-MM-DD",
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let datetimes = (item) => h(
                ElDatePicker,
                {
                    placeholder: item.placeholder,
                    type: "datetime",
                    size: "large",
                    format: "YYYY/MM/DD hh:mm:ss",
                    valueFormat: "YYYY-MM-DD hh:mm:ss",
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let tinymces = (item) => h(
                Tinymce,
                {
                    height: 400,
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let colors = (item) => h(
                ElColorPicker,
                {
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let cascaders = (item) => h(
                ElCascader,
                {
                    options: item.options,
                    showAllLevels: false,
                    placeholder: item.placeholder || '请选择',
                    props: item.props,
                    style: {
                        width: '100%'
                    },
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
                    },
                }
            )
            let rates = (item) => h(
                ElRate,
                {
                    allowHalf: true,
                    style: {
                        marginTop: '10px'
                    },
                    modelValue: v.headerData[item.value],
                    'onUpdate:modelValue': (res) => {
                        v.headerData[item.value] = res;
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
                                } else if (item.type == 'video') {
                                    return video(item)
                                } else if (item.type == 'switch') {
                                    return switchs(item)
                                } else if (item.type == 'dateTimePicker') {
                                    return dateTimePickers(item)
                                } else if (item.type == 'datetimerange') {
                                    return datetimeranges(item)
                                } else if (item.type == 'datetime') {
                                    return datetimes(item)
                                } else if (item.type == 'date') {
                                    return dates(item)
                                } else if (item.type == 'tinymce') {
                                    return tinymces(item)
                                } else if (item.type == 'color') {
                                    return colors(item)
                                } else if (item.type == 'cascader') {
                                    return cascaders(item)
                                } else if (item.type == 'rate') {
                                    return rates(item)
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
                            console.log(this)
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