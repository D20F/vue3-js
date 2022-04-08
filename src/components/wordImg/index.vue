<template>
    <div class="dashboard-container">
        <!-- <input
            class="upload-input"
            ref="upload-input"
            type="file"
            @change="change"
        />
        <el-button type="primary" @click="select"> 选择 </el-button>
        <el-button type="primary" @click="open"> open </el-button>
        <img :src="imgurl" alt="" />
        <div id="list" v-html="html"></div>
        <wordTemplate id="sss" :list="list" /> -->
    </div>
</template>

<script>
// import mammoth from "mammoth";
// import domtoimage from "dom-to-image";
import wordTemplate from "./wordTemplate.vue";
export default {
    name: "wordImg",
    computed: {},
    data() {
        return {
            list: {
                name: "名字-1",
                number: -1,
            },
            html: "",
            fileName: "",
            imgurl: "",
        };
    },
    components: {
        wordTemplate,
    },
    created() {},
    methods: {
        // select() {
        //     this.$refs["upload-input"].click();
        // },
        // change(e) {
        //     this.fileName = e.target.files[0].name;
        //     let file = e.target.files[0];
        //     let reader = new FileReader();
        //     reader.onload = (loadEvent) => {
        //         let arrayBuffer = loadEvent.target.result;
        //         mammoth
        //             .convertToHtml({ arrayBuffer: arrayBuffer })
        //             .then((result) => {
        //                 console.log(result);
        //                 this.html = result.value;
        //             })
        //             .done();
        //     };
        //     reader.readAsArrayBuffer(file);
        // },
        // async open() {
        //     let dom = document.querySelector("#sss");
        //     let start = new Date().getTime(); 
        //     let length = 100;
        //     for (let i = 0; i < length; i++) {
        //         await this.toPng(dom,i);
        //     }
        //     let end = new Date().getTime(); 
        //     console.log(end - start + "ms");
        // },
        // async toPng(dom,i) {
        //     return new Promise((resolve, reject) => {
        //         domtoimage
        //             .toPng(dom)
        //             // .toBlob(dom)
        //             .then((dataUrl) => {
        //                 console.log("成功", i);
        //                 console.log(dataUrl);
        //                 this.list = {
        //                     name: "名字" + i,
        //                     number: i,
        //                 };
        //                 resolve(i);
        //             })
        //             .catch((error) => {
        //                 reject(error);
        //                 console.error("oops, something went wrong!", error);
        //             });
        //     });
        // },
    },
};
</script>

<style lang="scss" scoped>
.dashboard {
}
.upload-input {
    display: none;
}
#list {
    background: #ffffff;
}
</style>
