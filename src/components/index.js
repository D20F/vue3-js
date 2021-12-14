import openTinymce from './openTinymce'
import FTable from './FTable'
// import FForm from './FForm'
import optionSearch from './optionSearch'

// 全局注册组件
export default (Vue) => {
    Vue.component("openTinymce", openTinymce);
    Vue.component("FTable", FTable);
    // Vue.component("F-form", FForm);
    Vue.component("optionSearch", optionSearch);
}

