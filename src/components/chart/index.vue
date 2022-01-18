<template>
    <div class="dashboard-container">
        <div class="dashboard-text" @click="open">name:</div>
        <div :style="{ width: width, height: height }">
            <canvas
                id="myChart"
                @mousemove="mousemove"
                @mouseout="mouseout"
                @click="click"
            ></canvas>
        </div>
    </div>
</template>

<script>
import Chart from "chart.js";

export default {
    name: "chart",
    props: {
        width: {
            type: Number,
            default: 400,
        },
        height: {
            type: Number,
            default: 400,
        },
    },
    created() {
        //  中文  https://chartjs.bootcss.com/docs/charts/line.html 
        //  英文  https://www.chartjs.org/docs/latest/samples/bar/vertical.html
    },
    methods: {
        open() {
            var ctx = document.getElementById("myChart");
            console.log(ctx);
            // 用完记的销毁
            // myChart.destroy();  
            var myChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: [
                        "Red",
                        "Blue",
                        "Yellow",
                        "Green",
                        "Purple",
                        "Orange",
                    ],
                    datasets: [
                        {
                            label: "颜色",
                            data: [12, 19, 3, 5, 2, 3],
                            backgroundColor: [
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 206, 86, 0.2)",
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ],
                            borderColor: [
                                "rgba(255,99,132,1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 206, 86, 1)",
                                "rgba(75, 192, 192, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ],
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    // 图表的 title 配置
                    title: {
                        display: true,
                        text: "Custom Chart Title",
                    },
                    // 图表的 label 配置
                    legend: {
                        display: false, //是否显示
                        position: "top", //位置选项 top,left,bottom,right
                        // 点击事件
                        onClick: (e, v) => {
                            // console.log(e);
                            // console.log(v);
                        },
                        // 字体配置
                        labels: {
                            // fontColor: "black",
                            // fontSize: 40,
                            // fontStyle: 'normal',
                        },
                    },
                    // 图表的布局
                    layout: {
                        padding: {
                            // 图表对于画布的内边距
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                        },
                    },
                    // 列触摸提示
                    tooltips: {
                        callbacks: {
                            label: (v, list) => {
                                // console.log(v);  // 当前列数据
                                // console.log(list);  // 全部数据数组
                                return v.xLabel + ":" + v.yLabel; //输出
                            },
                        },
                    },
                },
            });
        },
        click(e) {
            console.log(e);
        },
        mousemove(e) {
            // console.log(e);
            // this.$emit('mousemove', e);
        },
        mouseout(e) {
            // console.log(e);
            // this.$emit('mouseout', e);
        },
    },
};
</script>

<style lang="scss" scoped>
</style>
