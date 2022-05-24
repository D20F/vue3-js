export const regular_phone = (value) => {
    // 手机号
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    // 座机号
    const regexs = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
    return regex.test(value) || regexs.test(value)
}
export const regular_identityNumber = function (val) {
    const regex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    regex.test(value) ? callback() : callback('身份证格式错误');
}
export const regular_password = function (val) {
    const regex = /^[0-9A-Za-z]{6,16}$/
    regex.test(value) ? callback() : callback('密码格式为小于6位不大于16位');
}

