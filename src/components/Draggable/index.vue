<template>
    <div class="row">
        <div class="col-6">
            <draggable
                class="list-group"
                item-key="id"
                tag="transition-group"
                :component-data="{
                    tag: 'ul',
                    type: 'transition-group',
                    name: !drag ? 'flip-list' : null,
                }"
                v-model="list"
                @start="start"
                @end="end"
                :animation="200"
                group="description"
                :disabled="false"
                ghostClass="ghost"
            >
                <template #item="{ element }">
                    <div class="list-group-item">
                        {{ element.name }}
                    </div>
                </template>
            </draggable>
        </div>
    </div>
</template>

<script>
import draggable from "vuedraggable";

// https://github.com/SortableJS/vue.draggable.next


export default {
    name: "transition-example",
    components: {
        draggable,
    },
    data() {
        return {
            list: [
                { name: "vue.draggable", id: 0 },
                { name: "draggable", id: 1 },
                { name: "component", id: 2 },
                { name: "for", id: 3 },
                { name: "vue.js 2.0", id: 4 },
                { name: "based", id: 5 },
                { name: "on", id: 6 },
                { name: "Sortablejs", id: 7 },
            ],
        };
    },
    methods: {
        start(e) {
            console.log(e);
        },
        end(e) {
            console.log(e);
        },
        checkMove: function (e) {
            window.console.log("Future index: " + e.draggedContext.futureIndex);
        },
    },
    computed: {},
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
    cursor: move;
}
.move-draggable {
}
.not-draggable {
    cursor: no-drop;
}

.fade-move {
    transition: transform 0.5s;
}
</style>