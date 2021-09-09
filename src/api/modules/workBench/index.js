
// import request from "../../index";
import * as request from "@/api/index";
// const url ="http://192.168.6.107:18089"
const url ="/workManage/v1"
// 工作台列表初始化
export function processTransactionPage(query){
  return request.get(`${url}/dcDoc/dcDocType/page`,query)
  }
// 工作台列表查询（ID）用于修改获取到的数据
export function processTransactionPageTc(query){
  return request.get(`${url}/dcDoc/dcDocType/findById`,query)
}
// 工作台列表(修改)
export function Updates(data){
  return request.put(`${url}/dcDoc/dcDocType/uodate`,data)
}
// 工作台列表(新增)
export function Create(data){
    return request.post(`${url}/dcDoc/dcDocType/create`,data)
  }
// 工作台列表(删除)
export function Deletes(data){
    return request.deletefn(`${url}/dcDoc/dcDocType/delete/`+data)
  }
  // 工作流列表数据
export function listTemplate(query){
  return request.get(`${url}/dcDoc/listTemplate`,query)
  }
  // 文件上传
export function uploadFiles(data){
  return request.post(`${url}/file/uploadFile`,data)
}