import { createApp, h } from "vue";
import { ElTable, ElTableColumn, ElDialog, ElImage } from "element-plus";
export default (v) => {
    let dom = document.body.appendChild(document.createElement("div"));
    const app = createApp({
        render() {
            let descriptions = h(
                ElTable,
                {
                    border: true,
                    fit: true,
                    data: v.headerData
                },
                () => v.rowHeader.map((item) => {
                    return h(
                        ElTableColumn,
                        {
                            label: item.label,
                            showOverflowTooltip: item.overflow,
                        },
                        {
                            default: (params) => {
                                if (item.columnType == 'render') {
                                    return item.render(h, params)
                                } else if (item.columnType == 'imageList') {
                                    if (!params.row[item.value]) {
                                        return h("span", '')
                                    }
                                    return params.row[item.value].map((item) => {
                                        return h(
                                            ElImage,
                                            {
                                                style: 'width: 50px; height: 50px',
                                                fit: 'cover',
                                                src: item,
                                                previewSrcList: [item]
                                            }
                                        )
                                    })
                                } else {
                                    return h("span", params.row[item.value])
                                }
                            }
                        }
                    );
                })
            );
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
                { default: () => descriptions }
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

// import openTable from "@/utils/funComponent/table";
// openTable({
//     dialog: { width: "90%", title: "详情" },
//     headerData: {
//         id: "21345",
//         name: "萨达",
//         moblie: 155111111111,
//         waiter: 123456,
//     },
//     rowHeader: [
//         {
//             value: "id",
//             label: "ID",
//         },
//         {
//             value: "name",
//             label: "名称",
//         },
//         {
//             value: "moblie",
//             label: "手机号",
//         },
//         {
//             columnType: "render",
//             value: "waiter",
//             label: "是否服务员",
//             render: (h, params) => {
//                 return h("span", params.waiter + "3333");
//             },
//         },
//     ],
// });