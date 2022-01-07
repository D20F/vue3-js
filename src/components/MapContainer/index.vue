<template>
    <div id="container"></div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
    name: "MapContainer",
    data() {
        return {
            map: null,
            longitude: 114.315009,
            latitude: 30.588419,
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
    },
    methods: {
        initMap() {
            AMapLoader.load({
                key: "af03e24afc46e68e83a70eb8062edf31", // 申请好的Web端开发者Key，首次调用 load 时必填
                version: "1.4.4", //'1.4.4' 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
                plugins: [
                    "AMap.Map",
                    "AMap.MouseTool",
                    "mouseTool.polygon",
                    "AMap.Polygon",
                    "AMap.Autocomplete",
                    "AMap.PlaceSearch",
                    "AMap.Scale",
                    "AMap.OverView",
                    "AMap.ToolBar",
                    "AMap.MapType",
                    "AMap.PolyEditor",
                    "AMap.CircleEditor",
                ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
            })
                .then((AMap) => {
                    this.map = new AMap.Map("container", {
                        //设置地图容器id
                        viewMode: "3D", //是否为3D地图模式
                        zoom: 13, //初始化地图级别
                        center: [this.longitude, this.latitude], //初始化地图中心点位置
                    });
                    this.map.on("complete", () => {
                        // 地图图块加载完成后触发
                    });
                    this.map.on("click", (ev) => {
                        console.log(ev);
                        this.addMarker([ev.lnglat.R, ev.lnglat.Q]);
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
