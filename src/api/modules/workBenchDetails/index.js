
// import request from "../../index";
import * as request from "@/api/index";
// const url ="http://192.168.6.107:18089"
const url ="v1"
// 工作台详情列表初始化
export function processTransactionPage(query){
  return request.get(`${url}/dcDoc/dcDoc/page`,query)
  }
// 工作台列表查询（ID）用于修改获取到的数据
export function processTransactionPageTc(query){
  return request.get(`${url}/dcDoc/dcDoc/findById`,query)
}
// 工作台列表(修改)
export function Updates(data){
  return request.put(`${url}/dcDoc/dcDoc/uodate`,data)
}
// 工作台列表(新增)
export function Create(data){
    return request.post(`${url}/dcDoc/dcDoc/create`,data)
  }
// 工作台列表(删除)
export function Deletes(data){
    return request.deletefn(`${url}/dcDoc/dcDoc/delete/`+data)
  }
  // 工作台图标界面
export function ListDoc(query){
  return request.get(`${url}/dcDoc/listDoc`,query)
}
