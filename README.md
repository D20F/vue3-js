多层嵌套子路由在上一层加上<router-view></router-view>

Draggable

## 接收 excel 表格 
```js
// axios 应该这样设置一下
const blobService = axios.create({
    baseURL: URL,
    responseType: "blob",
    timeout: 60000,
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'tokenType': 1,
    }
})

// 页面内接收
getHotelExport(data).then((res) => {
    let blob = res;
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = (e) => {
        let a = document.createElement("a");
        a.style.display = "none";
        a.download = "excel.xlsx";
        a.href = e.target.result;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        this.$message({
            message: "导出成功",
            type: "success",
        });
    };
});
```
