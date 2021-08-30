
// import request from "../../index";
import * as request from "@/api/index";
// const url ="http://192.168.6.107:18089"
const url ="v1"
// 维修单保存草稿
export function create(params){
  return request.post(`${url}/dcRepair/dcRepair/create`,params)
}
// 我的工单列表
export function processTransactionPage(query){
  return request.get(`${url}/processTransaction/processTransaction/page`,query)
}
// 我的工单事务服务(修改)
export function Updates(data){
  return request.put(`${url}/processTransaction/processTransaction/uodate`,data)
}
// 我的工单事务服务(新增)
export function Create(data){
    return request.post(`${url}/processTransaction/processTransaction/create`,data)
  }
// 我的工单事务服务(删除)
export function Deletes(data){
    return request.deletefn(`${url}/processTransaction/processTransaction/delete`,data)
  }