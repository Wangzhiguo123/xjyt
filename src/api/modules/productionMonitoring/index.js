/*
 * @Description: 生产监控接口
 */
import * as request from "@/api/index";

/********************************生产监控告警管理模块***********************************************/

const url = "/paramAlerts/v1/paramAlerts";
const v1Url = "/bese/v1";
const carUrl = "/carWarning/v1"; //车辆监控
const carAlertsUrl = "/carWarning/v1/carAlerts"; //车辆监控
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
  return request.get(`${carUrl}/carAlerts/handleResults`,query)
}
//基础信息 详情
export function basicsInfo(query){
  return request.get(`${url}/${query.id}`)
}
//关联摄像 列表
export function camerasPage(query){
  return request.get(`${v1Url}/cameras/page`,query)
}
//关联摄像 关联
export function unitsCameras(query){
  return request.post(`${v1Url}/units/cameras`,query)
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
//删除 
export function warningGradeDel(query){
  return request.deletefn(`${url}/levels/${query.id}`)
}
//告警处理
export function handleResults(query){
  return request.post(`${url}/handleResults`,query)
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
// 删除 
export function handlesTypesDel(query){
  return request.deletefn(`${carAlertsUrl}/handles/types/${query.id}`)
}
/********************************车辆监控处理方式******************************************/
//列表查询
export function carAlertsPage(query){
  return request.get(`${carAlertsUrl}/page`,query)
}
