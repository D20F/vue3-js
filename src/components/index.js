import * as ELIcons from '@element-plus/icons-vue'

import openTinymce from './openTinymce'
import FTable from './FTable'
import FForm from './FForm'
import optionSearch from './optionSearch'


// 全局注册组件
export default (Vue) => {
    for (let item in ELIcons) {
        Vue.component(item, ELIcons[item]);
    }

    Vue.component("openTinymce", openTinymce);
    Vue.component("FTable", FTable);
    Vue.component("FForm", FForm);
    Vue.component("optionSearch", optionSearch);
}

