<script>
import { h } from "vue";
export default {
    name: "exSlot",
    props: {
        row: {
            type: Object,
            default: () => {
                return {};
            },
        },
        render: {
            type: Function,
            default: () => {
                return () => {};
            },
        },
        index: {
            type: Number,
            default: 0,
        },
        column: {
            type: Object,
            default: () => null,
        },
    },
    render() {
        const params = {
            row: this.row,
            index: this.index,
            column: this.column,
        };
        return this.render(h, params);
    },
};
</script>

