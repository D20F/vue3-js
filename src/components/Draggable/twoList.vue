<template>
    <div class="row">
        <div class="col-3">
            <h3>Draggable 1</h3>
            <draggable
                class="list-group"
                :list="list1"
                group="people"
                @change="log"
                itemKey="name"
            >
                <template #item="{ element, index }">
                    <div class="list-group-item">
                        {{ element.name }} {{ index }}
                    </div>
                </template>
            </draggable>
        </div>

        <div class="col-3">
            <h3>Draggable 2</h3>
            <draggable
                class="list-group"
                :list="list2"
                group="people"
                @change="logs"
                itemKey="name"
                handle=".el-icon-d-caret"
            >
                <template #item="{ element, index }">
                    <div class="list-group-item">
                        <i class="el-icon-d-caret" />

                        {{ element.name }} {{ index }}
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>
<script>
import draggable from "vuedraggable";
export default {
    name: "two-lists",
    display: "Two Lists",
    order: 1,
    components: {
        draggable,
    },
    data() {
        return {
            list1: [
                { name: "John", id: 1 },
                { name: "Joao", id: 2 },
                { name: "Jean", id: 3 },
                { name: "Gerard", id: 4 },
            ],
            list2: [
                { name: "Juan", id: 5 },
                { name: "Edgard", id: 6 },
                { name: "Johnson", id: 7 },
            ],
        };
    },
    methods: {
        log: function (evt) {
            window.console.log(1, evt);
        },
        logs: function (evt) {
            window.console.log(2, evt);
        },
    },
};
</script>
<style lang="scss" scoped>
.buttons {
    margin-top: 35px;
}
.ghost {
    opacity: 0.5;
    background: #c8ebfb;
}
.list-group-item {
    position: relative;
    display: block;
    padding: 0.75rem 1.25rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.125);
}
.move-draggable {
    cursor: move;
}
.not-draggable {
    cursor: no-drop;
}
</style>