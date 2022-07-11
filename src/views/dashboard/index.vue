<template>
    <div class="dashboard-container">
        <img src="@/assets/svg/undraw_innovative_re_rr5i.svg" alt="" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import imageViewer from "@/utils/funComponent/imageViewer";
import openForm from "@/utils/funComponent/form";
import { ref, reactive, onMounted } from "vue";
export default {
    name: "Dashboard",
    components: {},
    computed: {
        ...mapGetters(["name"]),
    },
    created() {
        return imageViewer([
            require("@/assets/svg/undraw_innovative_re_rr5i.svg"),
        ]);

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
        //     dialog: { width: "50%", title: "详情" },
        //     formLabelWidth: "70px",
        //     headerData: headerData,
        //     rowHeader: [
        //         {
        //             value: "title",
        //             label: "标题",
        //             rules: [
        //                 {
        //                     validator: (rule, value, callback) => {
        //                         value == 1
        //                             ? callback()
        //                             : callback("请输入正确手机号");
        //                     },
        //                     trigger: "blur",
        //                 },
        //             ],
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
        //             rules: {
        //                 required: true,
        //                 message: "Please input Activity name",
        //                 trigger: "blur",
        //             },
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
        //     error: (res) => {
        //         console.log(res);
        //     },
        // });
    },
    methods: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
}
</style>
