<template>
    <div class="dashboard-container">
        <img src="@/assets/svg/undraw_innovative_re_rr5i.svg" alt="" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "Dashboard",
    components: {},
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
}
</style>
