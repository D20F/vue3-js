<script>
import { h, defineComponent } from "vue";
import * as ELIcons from "@element-plus/icons-vue";
import { ElIcon } from "element-plus";

export default defineComponent({
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
    setup(props) {
        const slots = {
            default: () => h(ELIcons[props.icon]),
            // default: () => h(ELIcons["Bowl"]),
        };
        return () => (
            <div>
                <ElIcon size="15" v-slots={slots} />
                <span>{props.title}</span>
            </div>
        );
    },
});
</script>

<style scoped>
.sub-el-icon {
    color: currentColor;
    width: 1em;
    height: 1em;
}
</style>
