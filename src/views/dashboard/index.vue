<template>
    <div class="dashboard-container">
        <div class="dashboard-text">name: {{ name }}</div>
        <Draggable />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import twoList from "@/components/Draggable/twoList.vue";
import Draggable from "@/components/Draggable";
export default {
    name: "Dashboard",
    components: {
        Draggable,
    },
    computed: {
        ...mapGetters(["name"]),
    },
    created() {},
    methods: {},
};
</script>

<style lang="scss" scoped>
.dashboard {
    &-container {
        margin: 30px;
    }
    &-text {
        font-size: 30px;
        line-height: 46px;
    }
}
</style>
