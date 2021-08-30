/*
 * @Description: 生产监控接口
 */
import * as request from "@/api/index";



export function proMonitorAlertInfos(query){
  return request.get(`${url}/1/monitorAlertInfos`,query)
}

export function proQueryByAlertIds(query){
  return request.get(`${url}/monitorInfos/${215506126249492480}`,query)
}
//井信息详情 示例
export function proWells(query){
  return request.get(`${url}/${query.organizationId}/wells/${query.id}`)
}
//井信息详情 示例
export function companyInfosPage(query){
  return request.get(`${url}/companyInfos/page`,query)
}
/********************************生产监控告警管理模块***********************************************/

const producUrl = "v1/param";

/********************************参数警告***********************************************/
//列表
export function productionAlerts(query){
  return request.get(`${producUrl}/page`,query)
}

/********************************生产监控告警等级****************************************/
//新增
export function warningGradeAdd(query){
  return request.post(`${producUrl}/levels`,query)
}
//列表查询
export function warningGradePage(query){
  return request.get(`${producUrl}/levels/page`,query)
}
//修改
export function warningGradeEdit(query){
  return request.put(`${producUrl}/levels`,query)
}
//删除 
export function warningGradeDel(query){
  return request.deletefn(`${producUrl}/levels/${query.id}`)
}
//告警处理
export function handleResults(query){
  return request.post(`${producUrl}/handleResults`,query)
}

/********************************生产监控告警类型*****************************************/
//新增
export function warningTypeAdd(query){
  return request.post(`${producUrl}/types`,query)
}
//查询
export function warningTypePage(query){
  return request.get(`${producUrl}/types/page`,query)
}
//修改
export function warningTypeEdit(query){
  return request.put(`${producUrl}/types`,query)
}
//删除 
export function warningTypeDel(query){
  return request.deletefn(`${producUrl}/types/${query.id}`)
}

/********************************生产监控处理状态******************************************/
//新增
export function processingStatusAdd(query){
  return request.post(`${producUrl}/handles/types`,query)
}
//列表查询
export function processingStatusPage(query){
  return request.get(`${producUrl}/handles/types/page`,query)
}
// 修改
export function processingStatusEdit(query){
  return request.put(`${producUrl}/handles/types`,query)
}
// 删除 
export function processingStatusDel(query){
  return request.deletefn(`${producUrl}/handles/types/${query.id}`)
}
