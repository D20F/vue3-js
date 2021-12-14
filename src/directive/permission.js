import { ElMessage } from 'element-plus'
import store from '@/store/index'

const disableClickFn = (event) => {
    ElMessage.error('您没有此按钮权限')
    event && event.stopImmediatePropagation();
}

export default {
    beforeMount(el, binding) {
        let disable = false;
        if (store.state.user.btnGroup.indexOf(binding.value) == -1) {
            disable = true;
        }
        if (disable) {
            // el.setAttribute('disabled', 'disabled');
            // el.style.cursor = "not-allowed!important";
            el.classList.add('is-disabled');
            el.addEventListener('click', disableClickFn, true, { passive: true });
        }
    },
    unmounted(el) {
        el.removeEventListener('click', disableClickFn);
    }
}


