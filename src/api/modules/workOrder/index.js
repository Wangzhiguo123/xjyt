
// import request from "../../index";
import * as request from "@/api/index";
// const url ="http://192.168.6.107:18089"
const url ="v1"
// 维修单保存草稿
export function create(params){
  return request.post(`${url}/dcRepair/dcRepair/create`,params)
}
// 维修单提交信息
export function maintenanceSubmit(params){
  return request.put(`${url}/dcRepair/dcRepair/submit`,params)
}
// 我的工单详情初始化(维保单)
export function repairDetails(query){
  return request.get(`${url}/dcRepair/dcRepair/findById`,query)
}
// 我的工单详情处理意见提交(维保单)通过
export function repairSubmit(data){
  return request.put(`${url}/dcRepair/dcRepair/examine`,data)
}
// 我的工单详情处理意见提交(维保单)驳回
export function refuseSubmit(params){
  return request.put(`${url}/dcRepair/dcRepair/refuseExamine`,params)
}
// export default {
//   monitoralertinfo: `/v1/monitoralertinfo/list`,
//   create: `/v1/dcRepair/dcRepair/create`,
//   maintenanceSubmit: `/v1/dcRepair/dcRepair/submit`,
// };