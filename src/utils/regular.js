export const regular_phone = function (val) {
    // 手机号
    const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/  
    // 座机号
    const regexs = /^(0[0-9]{2,3}\-)([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/
    return regex.test(val) || regexs.test(val)
}
export const regular_identityNumber = function (val) {
    const regex = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return regex.test(val)
}
export const regular_password = function (val) {
    const regex = /^[0-9A-Za-z]{6,16}$/
    return regex.test(val)
}

