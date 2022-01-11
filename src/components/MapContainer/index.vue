<template>
    <div class="operate">
        <el-input v-model="input" id="input" style="width: 40%" />

        <div class="button">
            <el-button @click="marker.switch = true">标点</el-button>
            <el-button @click="marker.switch = false">保存标点</el-button>
            <el-button @click="openPolygon">开始绘制</el-button>
            <el-button @click="closePolygon">结束绘制并保存</el-button>
            <el-button @click="clearMap">清空</el-button>
        </div>
    </div>
    <div id="container"></div>
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
            zoom: 13,
            mouseTool: "",
            marker: {
                list: [],
                switch: false,
                limit: 1,
            },
            polygon: {
                list: [],
                limit: 1,
            },
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
                version: "2.0",
                plugins: [
                    "AMap.MouseTool",
                    "AMap.PlaceSearch",
                    "AMap.AutoComplete  ",
                ],
            })
                .then((AMap) => {
                    this.map = new AMap.Map("container", {
                        // viewMode: "3D", //是否为3D地图模式
                        resizeEnable: true,
                        zoom: this.zoom, //初始化地图级别
                        center: [this.longitude, this.latitude], //初始化地图中心点位置
                    });
                    this.map.on("complete", () => {
                        this.initSearch();
                        this.initMouseTool();
                    });
                    this.map.on("click", (ev) => {
                        console.log(ev);
                        console.log(ev.lnglat.lng, ev.lnglat.lat);
                        this.addMarker(ev.lnglat.lng, ev.lnglat.lat);
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
        addMarker(lng, lat) {
            if (
                this.marker.switch &&
                this.marker.list.length < this.marker.limit
            ) {
                let marker = new AMap.Marker({
                    icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
                    position: [lng, lat],
                });
                this.map.add(marker);
                this.marker.list.push([lng, lat]);
            }
        },
        clearMap() {
            this.map.clearMap();
        },
        initSearch() {
            let autoOptions = { input: "input" };
            let autocomplete = new AMap.AutoComplete(autoOptions);
            let placeSearch = new AMap.PlaceSearch({ map: this.map });
            autocomplete.on("select", (e) => {
                placeSearch.search(e.poi.name);
                placeSearch.setCity(e.poi.adcode);
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
            this.mouseTool.on("draw", (e) => {
                // console.log(e)
                // 点的位置
                // console.log(e.obj.w.position)
                // 矩形的位置
                // console.log(e.obj.getPath());
                if (this.polygon.list.length < this.polygon.limit) {
                    // console.log(e);
                    console.log(e.obj.getPath());
                    this.polygon.list.push(e.obj.getPath());
                }
            });
        },
        openPolygon() {
            this.mouseTool.polygon({
                fillOpacity: 0,
                strokeColor: "#F90B0B",
            });
        },
        closePolygon() {
            this.mouseTool.close(false);
            console.log(this.marker)
            console.log(this.polygon)
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
.operate {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
