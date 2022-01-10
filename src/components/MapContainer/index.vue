<template>
    <div id="container"></div>
    <!-- <el-input v-model="input" id="tipinput" /> -->
    <input id="input" />
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
    name: "MapContainer",
    data() {
        return {
            input: null,
            map: null,
            longitude: 114.315009,
            latitude: 30.588419,
            mouseTool: "",
        };
    },
    components: {},
    computed: {},
    watch: {},
    created() {},
    mounted() {
        // https://lbs.amap.com/api/jsapi-v2/guide/overlays/editable-vector-overlay
        // 使用 鼠标工具 MouseTool 编辑矢量图形
        // 自行添加地图控件

        this.initMap();

        // 标点;
        // 保存标点;
        // 开始绘制;
        // 清空当前绘制;
        // 结束绘制并保存;
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: "af03e24afc46e68e83a70eb8062edf31", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "1.4.4", //'1.4.4' 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [
                    "AMap.MouseTool",
                    // "AMap.PlaceSearch",
                    // "AMap.AutoComplete",
                ],
            })
                .then((AMap) => {
                    this.map = new AMap.Map("container", {
                        // viewMode: "3D", //是否为3D地图模式
                        resizeEnable: true,
                        zoom: 13, //初始化地图级别
                        center: [this.longitude, this.latitude], //初始化地图中心点位置
                    });
                    this.map.on("complete", () => {
                        this.initSearch();
                        this.initMouseTool();
                    });
                    this.map.on("click", (ev) => {
                        console.log(ev);
                        console.log([ev.lnglat.R, ev.lnglat.Q]);
                    });
                })
                .catch((e) => {
                    console.log(e);
                });
        },
        setCenter(v) {
            // var v = [116, 39];
            this.map.setCenter(v);
        },
        setZoom(v) {
            this.map.setZoom(v);
        },
        addMarker(v) {
            let marker = new AMap.Marker({
                icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                position: v,
            });
            this.map.add(marker);
        },
        clearMap() {
            this.map.clearMap();
        },
        initSearch() {
            // 看看 这两个怎么加载和配合
            window.AMap.plugin("AMap.PlaceSearch",  ()=> {
                var placeSearch = new window.AMap.PlaceSearch({
                    map: this.map,
                });
                // autocomplete.on("select", function (e) {
                //     placeSearch.search(e.poi.name);
                //     placeSearch.setCity(e.poi.adcode);
                // });
                // var placeSearch = new window.AMap.PlaceSearch();
                placeSearch.search("江滩", function (status, result) {
                    console.log(result);
                });
            });
            window.AMap.plugin("AMap.AutoComplete",  ()=> {
                // var autoOptions = {
                //     input: "input",
                // };
                // var autocomplete = new window.AMap.AutoComplete(
                //     autoOptions
                // );
                var placeSearch = new window.AMap.PlaceSearch({
                    map: this.map,
                });
                // autocomplete.on("select", function (e) {
                //     placeSearch.search(e.poi.name);
                //     placeSearch.setCity(e.poi.adcode);
                // });
                // var placeSearch = new window.AMap.PlaceSearch();
                placeSearch.search("江滩", function (status, result) {
                    console.log(result);
                });
            });

        },
        initMouseTool() {
            this.mouseTool = new AMap.MouseTool(this.map);
            // 绘制工具开始画点
            // this.mouseTool.marker();
            // 绘制工具开始画多边形
            // this.mouseTool.polygon();
            // 关闭当前鼠标操作。参数arg设为true时，鼠标操作关闭的同时清除地图上绘制的所有覆盖物对象；设为false时，保留所绘制的覆盖物对象。默认为false
            // this.mouseTool.close(true);
            this.mouseTool.on("draw", function (e) {
                // console.log(e)
                // 点的位置
                // console.log(e.obj.w.position)
                // 矩形的位置
                // console.log(e.obj.getPath());
            });
        },
    },
    beforeUnmount() {
        this.map.destroy();
    },
};
</script>

<style lang="scss" scoped>
#container {
    padding: 0px;
    margin: 0px;
    width: 100%;
    height: 800px;
}
</style>
