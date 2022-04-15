<script>
import { h } from "vue";
import * as ELIcons from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";

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
            vnodes.push(
                h(
                    ElIcon,
                    {
                        size: 15,
                    },
                    h(ELIcons["Bowl"])
                    // h(ELIcons[icon])
                )
            );
            // vnodes.push(<svg-icon icon-class={icon} />);
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
