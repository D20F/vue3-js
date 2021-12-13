import { getData, postData, deleteData, putData } from '@/utils/request/request.js'


/*
    首页轮播查询
    params:{}
*/
export const appBannerall = (reqData) => {
    const url = '/appBanner/all';
    const data = reqData;
    return getData(url, data);
}
/*
    创建首页轮播
    params:{}
*/
export const appBanner = (reqData) => {
    const url = '/appBanner';
    const data = reqData;
    return postData(url, data);
}
/*
    修改首页轮播
    params:{}
*/
export const appBannerModify = (id, reqData) => {
    const url = `/appBanner/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除首页轮播
    params:{}
*/
export const appBannerDelete = (id) => {
    const url = `/appBanner/${id}`;
    const data = '';
    return deleteData(url, data);
}
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
    查询文章 分页
    params:{}
*/
export const getIndustrialResourcesPage = (reqData) => {
    const url = `/industrialResources/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    增加文章
    params:{
    }
*/
export const addIndustrialResources = (reqData) => {
    const url = '/industrialResources';
    const data = reqData;
    return postData(url, data);
}
/*
    删除文章
    params:{}
*/
export const industrialResourcesDelete = (id) => {
    const url = `/industrialResources/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    修改文章
    params:{}
*/
export const industrialResourcesModify = (id, reqData) => {
    const url = `/industrialResources/${id}`;
    const data = reqData;
    return putData(url, data);
}

/*
    我的消息  分页
    params:{}
*/
export const getInformationPage = (reqData) => {
    const url = '/message/page';
    const data = reqData;
    return getData(url, data);
}
/*
    增加发展规划
    params:{
    }
*/
export const addTimeAxis = (reqData) => {
    const url = '/timeAxis';
    const data = reqData;
    return postData(url, data);
}
/*
    发展规划分页查询
    params:{
    }
*/
export const TimeAxisPage = (reqData) => {
    const url = `/timeAxis/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改发展规划
    params:{}
*/
export const TimeAxisModify = (id, reqData) => {
    const url = `/timeAxis/${id}`;
    const data = reqData;
    return putData(url, data);
}

/*
    删除发展规划
    params:{}
*/
export const TimeAxisDelete = (id) => {
    const url = `/timeAxis/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    增加地块
    params:{
    }
*/
export const addPlotDetails = (reqData) => {
    const url = '/plotDetails';
    const data = reqData;
    return postData(url, data);
}
/*
    地块分页查询
    params:{
    }
*/
export const PlotDetailsPage = (reqData) => {
    const url = `/plotDetails/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    地块所属查询
    params:{
    }
*/
export const dictionarylist = (reqData) => {
    const url = `/dictionary/easyMapGroup`;
    const data = reqData;
    return getData(url, data);
}


/*
    修改地块
    params:{}
*/
export const PlotDetailsModify = (id, reqData) => {
    const url = `/plotDetails/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除地块
    params:{}
*/
export const PlotDetailsDelete = (id) => {
    const url = `/plotDetails/${id}`;
    const data = '';
    return deleteData(url, data);
}

/*
    增加重点项目
    params:{
    }
*/
export const addImportantProject = (reqData) => {
    const url = '/importantProject';
    const data = reqData;
    return postData(url, data);
}
/*
    重点项目分页查询
    params:{
    }
*/
export const ImportantProjectPage = (reqData) => {
    const url = `/importantProject/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改重点项目
    params:{}
*/
export const ImportantProjectModify = (id, reqData) => {
    const url = `/importantProject/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除重点项目
    params:{}
*/
export const ImportantProjectDelete = (id) => {
    const url = `/importantProject/${id}`;
    const data = '';
    return deleteData(url, data);
}


/*
    增加招商动态
    params:{
    }
*/
export const addInvestmentTrends = (reqData) => {
    const url = '/investmentTrends';
    const data = reqData;
    return postData(url, data);
}
/*
    招商项目分页查询
    params:{
    }
*/
export const InvestmentTrendsPage = (reqData) => {
    const url = `/investmentTrends/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改招商项目
    params:{}
*/
export const InvestmentTrendsModify = (id, reqData) => {
    const url = `/investmentTrends/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除招商项目
    params:{}
*/
export const InvestmentTrendsDelete = (id) => {
    const url = `/investmentTrends/${id}`;
    const data = '';
    return deleteData(url, data);
}



/*
    增加161产业体系
    params:{
    }
*/
export const addIndustrialBase = (reqData) => {
    const url = '/industrialBase';
    const data = reqData;
    return postData(url, data);
}
/*
    161产业体系分页查询
    params:{
    }
*/
export const IndustrialBasePage = (reqData) => {
    const url = `/industrialBase/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改161产业体系
    params:{}
*/
export const IndustrialBaseModify = (id, reqData) => {
    const url = `/industrialBase/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除161产业体系
    params:{}
*/
export const IndustrialBaseDelete = (id) => {
    const url = `/industrialBase/${id}`;
    const data = '';
    return deleteData(url, data);
}


/*
    增加一区三园
    params:{
    }
*/
export const addIndustrialPark = (reqData) => {
    const url = '/industrialPark';
    const data = reqData;
    return postData(url, data);
}
/*
    获取一区三园
    params:{
    }
*/
export const IndustrialParkPage = (reqData) => {
    const url = `/industrialPark/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改一区三园
    params:{}
*/
export const IndustrialParkModify = (id, reqData) => {
    const url = `/industrialPark/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除一区三园
    params:{}
*/
export const IndustrialParkDelete = (id) => {
    const url = `/industrialPark/${id}`;
    const data = '';
    return deleteData(url, data);
}



/*
    增加楼宇
    params:{
    }
*/
export const addBuildingDetails = (reqData) => {
    const url = '/buildingDetails';
    const data = reqData;
    return postData(url, data);
}
/*
    获取楼宇
    params:{
    }
*/
export const BuildingDetailsPage = (reqData) => {
    const url = `/buildingDetails/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改楼宇
    params:{}
*/
export const BuildingDetailsModify = (id, reqData) => {
    const url = `/buildingDetails/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除楼宇
    params:{}
*/
export const BuildingDetailsDelete = (id) => {
    const url = `/buildingDetails/${id}`;
    const data = '';
    return deleteData(url, data);
}
//查找园区
export const getParkList = (reqData) => {
    const url = `/dictionary/getParkList`;
    const data = reqData;
    return getData(url, data);
}
// 查询 分类字典 类型
export const getchangList = (reqData) => {
    const url = `/dictionary/getDictionary`;
    const data = reqData;
    return getData(url, data);
}
export const getinvestigationRouteList = (reqData) => {
    const url = `/investigationRoute/page`;
    const data = reqData;
    return getData(url, data);
}



/*
    增加厂房管理
    params:{
    }
*/
export const addPlantManagement = (reqData) => {
    const url = '/plantManagement';
    const data = reqData;
    return postData(url, data);
}
/*
    查询厂房管理
    params:{
    }
*/
export const PlantManagementPage = (reqData) => {
    const url = `/plantManagement/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改厂房管理
    params:{}
*/
export const PlantManagementModify = (id, reqData) => {
    const url = `/plantManagement/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除厂房管理
    params:{}
*/
export const PlantManagementDelete = (id) => {
    const url = `/plantManagement/${id}`;
    const data = '';
    return deleteData(url, data);
}



/*
    增加厂房管理
    params:{
    }
*/
export const addIncubator = (reqData) => {
    const url = '/incubator';
    const data = reqData;
    return postData(url, data);
}
/*
    查询厂房管理
    params:{
    }
*/
export const IncubatorPage = (reqData) => {
    const url = `/incubator/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改厂房管理
    params:{}
*/
export const IncubatorModify = (id, reqData) => {
    const url = `/incubator/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除厂房管理
    params:{}
*/
export const IncubatorDelete = (id) => {
    const url = `/incubator/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    增加厂房管理
    params:{
    }
*/
export const addScienceAndEducationResources = (reqData) => {
    const url = '/scienceAndEducationResources';
    const data = reqData;
    return postData(url, data);
}
/*
    查询厂房管理
    params:{
    }
*/
export const ScienceAndEducationResourcesPage = (reqData) => {
    const url = `/scienceAndEducationResources/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改厂房管理
    params:{}
*/
export const ScienceAndEducationResourcesModify = (id, reqData) => {
    const url = `/scienceAndEducationResources/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除厂房管理
    params:{}
*/
export const ScienceAndEducationResourcesDelete = (id) => {
    const url = `/scienceAndEducationResources/${id}`;
    const data = '';
    return deleteData(url, data);
}

/*
    增加产业类别
    params:{
    }
*/
export const addIndustryMap = (reqData) => {
    const url = '/industryMap';
    const data = reqData;
    return postData(url, data);
}
/*
    查询产业类别
    params:{
    }
*/
export const IndustryMapPage = (reqData) => {
    const url = `/industryMap/getList`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改产业类别
    params:{}
*/
export const IndustryMapModify = (id, reqData) => {
    const url = `/industryMap/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除产业类别
    params:{}
*/
export const IndustryMapDelete = (id) => {
    const url = `/industryMap/${id}`;
    const data = '';
    return deleteData(url, data);
}

/*
    增加考察路线
    params:{
    }
*/
export const addinvestigationRoute = (reqData) => {
    const url = '/investigationRoute';
    const data = reqData;
    return postData(url, data);
}
/*
    查询考察路线
    params:{
    }
*/
export const investigationRoutePage = (reqData) => {
    const url = `/investigationRoute/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改考察路线
    params:{}
*/
export const investigationRouteModify = (id, reqData) => {
    const url = `/investigationRoute/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除考察路线
    params:{}
*/
export const investigationRouteDelete = (id) => {
    const url = `/investigationRoute/${id}`;
    const data = '';
    return deleteData(url, data);
}


/*
    增加企业管理
    params:{
    }
*/
export const addbusinessManagement = (reqData) => {
    const url = '/businessManagement';
    const data = reqData;
    return postData(url, data);
}
/*
    查询企业管理
    params:{
    }
*/
export const businessManagementPage = (reqData) => {
    const url = `/businessManagement/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    修改企业管理
    params:{}
*/
export const businessManagementModify = (id, reqData) => {
    const url = `/businessManagement/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    删除企业管理
    params:{}
*/
export const businessManagementDelete = (id) => {
    const url = `/businessManagement/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    查询考察路线
    params:{
    }
*/
export const dictionaryList = (reqData) => {
    const url = `/dictionary/selectList`;
    const data = reqData;
    return getData(url, data);
}
/*
    查询地块分组
    params:{
    }
*/
export const dictionaryEasyMassifMapGroup = (reqData) => {
    const url = `/dictionary/easyMassifMapGroup`;
    const data = reqData;
    return getData(url, data);
}
/*
    查询地块类型
    params:{
    }
*/
export const getDictionaryList = (reqData) => {
    const url = `/dictionary/getDictionary`;
    const data = reqData;
    return getData(url, data);
}




/*
    增加云梦印象
    params:{
    }
*/
export const addYmImpression = (reqData) => {
    const url = '/ymImpression';
    const data = reqData;
    return postData(url, data);
}
/*
    删除云梦印象
    params:{}
*/
export const ymImpressionDelete = (id) => {
    const url = `/ymImpression/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    修改云梦印象
    params:{}
*/
export const ymImpressionModify = (id, reqData) => {
    const url = `/ymImpression/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    查询云梦印象
    params:{
    }
*/
export const getYmImpression = (reqData) => {
    const url = `/ymImpression/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    增加招商政策
    params:{
    }
*/
export const addInvestmentPolicy = (reqData) => {
    const url = '/investmentPolicy';
    const data = reqData;
    return postData(url, data);
}
/*
    删除招商政策
    params:{}
*/
export const investmentPolicyDelete = (id) => {
    const url = `/investmentPolicy/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    修改招商政策
    params:{}
*/
export const investmentPolicyModify = (id, reqData) => {
    const url = `/investmentPolicy/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    查询招商政策
    params:{
    }
*/
export const getInvestmentPolicy = (reqData) => {
    const url = `/investmentPolicy/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    增加营商环境
    params:{
    }
*/
export const addBusinessEnvironment = (reqData) => {
    const url = '/businessEnvironment';
    const data = reqData;
    return postData(url, data);
}
/*
    删除营商环境
    params:{}
*/
export const businessEnvironmentDelete = (id) => {
    const url = `/businessEnvironment/${id}`;
    const data = '';
    return deleteData(url, data);
}
/*
    修改营商环境
    params:{}
*/
export const businessEnvironmentModify = (id, reqData) => {
    const url = `/businessEnvironment/${id}`;
    const data = reqData;
    return putData(url, data);
}
/*
    查询营商环境
    params:{
    }
*/
export const getBusinessEnvironment = (reqData) => {
    const url = `/businessEnvironment/page`;
    const data = reqData;
    return getData(url, data);
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
/*
    查询投资咨询
    params:{
    }
*/
export const getInvestmentConsulting = (reqData) => {
    const url = `/investmentConsulting/page`;
    const data = reqData;
    return getData(url, data);
}
/*
    删除投资咨询
    params:{}
*/
export const investmentConsultingDelete = (id) => {
    const url = `/investmentConsulting/${id}`;
    const data = '';
    return deleteData(url, data);
}