/*
 * @Description: 生产监控接口
 */
import * as request from "@/api/index";

/********************************生产监控告警管理模块***********************************************/

const url = "/paramAlerts/v1/paramAlerts";
const v1Url = "/bese/v1";//生产
const carUrl = "/carWarning/v1"; //车辆监控
const carAlertsUrl = "/carWarning/v1/carAlerts"; //车辆监控
const videoUrl = "/video/v1"; //视频
const passsystem = "/passsystem/v1"; //
/********************************地图告警***********************************************/
//参数监控列表参数告警
export function mapList(query){
  return request.get(`${url}/map`,query)
}
//车辆监控车辆告警
export function mapCarAlerts(query){
  return request.get(`${carUrl}/carAlerts/map`,query)
}  
//车辆监控车辆详情 
export function mapCarDetails(query){
  return request.get(`${carUrl}/carAlerts/${query.id}`,query)
}
//车辆监控车辆告警处理
export function carHandleResults(query){
  return request.post(`${carUrl}/carAlerts/handleResults`,query)
}
//基础信息 详情
export function basicsInfo(query){
  return request.get(`${url}/${query.id}`)
}
//参数告警-指派人员-根据父级Id查询所有子级人员 （树）
export function findTreeByParentUnitId(query){
  return request.get(`${passsystem}/employees/findTreeByParentUnitId`,query)
}
//参数告警-指派人员
export function handleUser(query){
  return request.post(`${url}/handleUser`,query)
}
//关联摄像 列表
export function camerasPage(query){
  return request.get(`${v1Url}/cameras/page`,query)
}
//关联摄像 关联
export function unitsCameras(query){
  return request.post(`${v1Url}/units/cameras`,query)
}
/********************************车辆监控告警管理***********************************************/
//分页
export function carAlertsPage(query){
  return request.get(`${carUrl}/carAlerts/page`,query)
}
//详情
export function carAlertsDetails(query){
  return request.get(`${carUrl}/carAlerts/${query.id}`)
}
/********************************摄像头***********************************************/
//新增
export function camerasAdd(query){
  return request.post(`${v1Url}/cameras`,query)
}
//修改
export function camerasEdit(query){
  return request.put(`${v1Url}/cameras`,query)
}
// 详情
export function camerasDetails(query){
  return request.get(`${url}/cameras/${query.id}`)
}
//删除 
export function camerasDel(query){
  return request.deletefn(`${v1Url}/cameras/${query.id}`)
}
/********************************自动派单配置***********************************************/
//新增 /v1/
export function dispatchAdd(query){
  return request.post(`${v1Url}/units/autoDispatchConfigs`,query)
}
//关联摄像 列表
export function dispatchPage(query){
  return request.get(`${v1Url}/units/autoDispatchConfigs/page`,query)
}
//修改
export function dispatchEdit(query){
  return request.put(`${v1Url}/units/autoDispatchConfigs`,query)
}
// 详情
export function dispatchDetails(query){
  return request.get(`${v1Url}/units/autoDispatchConfigs/${query.id}`)
}
//删除 
export function dispatchDel(query){
  return request.deletefn(`${v1Url}/units/autoDispatchConfigs/${query.id}`)
}
/********************************参数警告***********************************************/
//列表
export function productionAlerts(query){
  return request.get(`${url}/page`,query)
}


/********************************生产监控告警等级****************************************/
//新增
export function warningGradeAdd(query){
  return request.post(`${url}/levels`,query)
}
//列表查询
export function warningGradePage(query){
  return request.get(`${url}/levels/page`,query)
}
//修改
export function warningGradeEdit(query){
  return request.put(`${url}/levels`,query)
}
// 详情
export function warningGradeeDetails(query){
  return request.get(`${url}/levels/${query.id}`)
}
//删除 
export function warningGradeDel(query){
  return request.deletefn(`${url}/levels/${query.id}`)
}
//参数告警处理
export function handleResults(query){
  return request.post(`${url}/handleResults`,query)
}
//参数告警处理-获取处理信息
export function handleInfo(query){
  return request.get(`${url}/handleInfo/${query.alertId}`)
}

/********************************生产监控告警类型*****************************************/
//新增
export function warningTypeAdd(query){
  return request.post(`${url}/types`,query)
}
//查询
export function warningTypePage(query){
  return request.get(`${url}/types/page`,query)
}
//修改
export function warningTypeEdit(query){
  return request.put(`${url}/types`,query)
}
// 详情
export function warningTypeDetails(query){
  return request.get(`${url}/types/${query.id}`)
}
//删除 
export function warningTypeDel(query){
  return request.deletefn(`${url}/types/${query.id}`)
}

/********************************生产监控处理状态******************************************/
//新增
export function processingStatusAdd(query){
  return request.post(`${url}/handles/types`,query)
}
//列表查询
export function processingStatusPage(query){
  return request.get(`${url}/handles/types/page`,query)
}
// 修改
export function processingStatusEdit(query){
  return request.put(`${url}/handles/types`,query)
}
// 详情
export function processingStatusDetails(query){
  return request.get(`${url}/handles/types/${query.id}`)
}
// 删除 
export function processingStatusDel(query){
  return request.deletefn(`${url}/handles/types/${query.id}`)
}
/********************************车辆监控告警类型******************************************/
//新增/
export function carAlertsTypeAdd(query){
  return request.post(`${carAlertsUrl}/types/insert`,query)
}
//列表查询
export function carAlertsTypePage(query){
  return request.get(`${carAlertsUrl}/types/page`,query)
}
// 修改
export function carAlertsTypeEdit(query){
  return request.post(`${carAlertsUrl}/types/update`,query)
}
// 详情
export function carAlertsTypeDetails(query){
  return request.get(`${carAlertsUrl}/types/update/${query.id}`)
}
// 删除 
export function carAlertsTypeDel(query){
  return request.deletefn(`${carAlertsUrl}/types/${query.id}`)
}
/********************************车辆监控处理方式******************************************/
export function handlesTypesAdd(query){
  return request.post(`${carAlertsUrl}/handles/types`,query)
}
//列表查询
export function handlesTypesPage(query){
  return request.get(`${carAlertsUrl}/handles/types`,query)
}
// 修改
export function handlesTypesEdit(query){
  return request.put(`${carAlertsUrl}/handles/types`,query)
}
// 详情
export function handlesTypesDetails(query){
  return request.get(`${videoUrl}/handles/types/${query.id}`)
}
// 删除 
export function handlesTypesDel(query){
  return request.deletefn(`${carAlertsUrl}/handles/types/${query.id}`)
}
/********************************工单******************************************/
//列表查询 // 工作台详情列表初始化
export function processTransactionPage(query){
  return request.get(`${url}/dcDoc/dcDoc/page`,query)
  }
/********************************视频报警处理配置管理******************************************/
//新增
export function handleConfigsAdd(query){
  return request.post(`${videoUrl}/alertHandleTypes`,query)
}
//列表查询
export function handleConfigs(query){
  return request.get(`${videoUrl}/alertHandleTypes`,query)
}
//列表查询
export function handleConfigsPage(query){
  return request.get(`${videoUrl}/alertHandleTypes/page`,query)
}
// 修改
export function handleConfigsEdit(query){
  return request.put(`${videoUrl}/alertHandleTypes`,query)
}
// 详情
export function handleConfigsDetails(query){
  return request.get(`${videoUrl}/alertHandleTypes/${query.id}`)
}
// 删除 
export function handleConfigsDel(query){
  return request.deletefn(`${videoUrl}/alertHandleTypes/${query.id}`)
}
// 视频处理告警
export function handleConfigsHandle(query){
  return request.post(`${videoUrl}/alertHandleResults/handle`,query)
}
// 视频处理告警 编码查询
export function handleConfigsCode(query){
  return request.get(`${videoUrl}/alertHandleTypes`,query)
}
/********************************视频告警信息******************************************/
//列表 
export function alerts(query){
  return request.get(`${videoUrl}/alerts`,query)
}
//新增
export function alertsAdd(query){
  return request.post(`${videoUrl}/alerts`,query)
}
//分页查询 
export function alertsPage(query){
  return request.get(`${videoUrl}/alerts/page`,query)
}
// 修改
export function alertsEdit(query){
  return request.put(`${videoUrl}/alerts`,query)
}
// 详情
export function alertsDetails(query){
  return request.get(`${videoUrl}/alerts/${query.id}`)
}
// 删除 
export function alertsDel(query){
  return request.deletefn(`${videoUrl}/alerts/${query.id}`)
}
/********************************视频告警详情******************************************/
//新增
export function alertInfosAdd(query){
  return request.post(`${videoUrl}/alertInfos`,query)
}
//列表查询
export function alertInfosPage(query){
  return request.get(`${videoUrl}/alertInfos/page`,query)
}
// 修改
export function alertInfosEdit(query){
  return request.put(`${videoUrl}/alertInfos`,query)
}
// 详情
export function alertInfosDetails(query){
  return request.get(`${videoUrl}/alertInfos/${query.id}`)
}
// 删除 
export function alertInfosDel(query){
  return request.deletefn(`${videoUrl}/alertInfos/${query.id}`)
}
/********************************视频监控反馈******************************************/
//新增 
export function alertErrorBackInfosAdd(query){
  return request.post(`${videoUrl}/alertErrorBackInfos`,query)
}


