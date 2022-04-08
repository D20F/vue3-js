<script>
import { h } from "vue";
import * as ELIcons from "@element-plus/icons-vue";

export default {
    name: "MenuItem",
    functional: true,
    props: {
        icon: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            default: "",
        },
    },
    render() {
        const icon = this.icon;
        const title = this.title;
        const vnodes = [];
        if (icon) {
            if (icon.includes("el-icon")) {
                vnodes.push(h(ELIcons[icon]));
            } else {
                vnodes.push(<svg-icon icon-class={icon} />);
            }
        }
        if (title) {
            vnodes.push(<span slot="title">{title}</span>);
        }
        return vnodes;
    },
};
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
}
</style>
