import { getData, postData, deleteData, putData } from '@/utils/request/request.js'


/*
    上传图片
    params:{
    }
*/
export const uploadImage = (reqData) => {
    const url = '/upload/images';
    const data = reqData;
    return postData(url, data);
}
/*
    上传视频
    params:{
    }
*/
export const uploadvideo = (reqData) => {
    const url = '/upload/video';
    const data = reqData;
    return postData(url, data);
}
/*
    上传文件
    params:{
    }
*/
export const uploadFile = (reqData) => {
    const url = '/upload/file';
    const data = reqData;
    return postData(url, data);
}

/*
    增加企业风采
    params:{
    }
*/
export const addHomeAricle = (reqData) => {
    const url = '/homeAricle';
    const data = reqData;
    return postData(url, data);
}
/*
    删除企业风采
    params:{}
*/
export const homeAricleDelete = (id) => {
    const url = `/homeAricle/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    修改企业风采
    params:{}
*/
export const homeAricleModify = (id, reqData) => {
    const url = `/homeAricle/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    查询企业风采
    params:{
    }
*/
export const getHomeAricle = (reqData) => {
    const url = `/homeAricle/page`;
    const data = reqData;
    return getData(url, data);
}