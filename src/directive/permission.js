import Vue from 'vue'
import { Message } from 'element-ui'
import store from '@/store/index'

const disableClickFn = (event) => {
    Message.error('您没有此按钮权限')
    event && event.stopImmediatePropagation();
}

Vue.directive('permission', {
    bind(el, binding) {
        let disable = false;
        if (store.state.user.btnGroup.indexOf(binding.value) == -1) {
            disable = true;
        }
        if (disable) {
            // el.setAttribute('disabled', 'disabled');
            // el.style.cursor = "not-allowed!important";
            el.classList.add('is-disabled');
            el.addEventListener('click', disableClickFn, true,{ passive: true });
        }
    },
    unbind(el) {
        el.removeEventListener('click', disableClickFn);
    }
});


