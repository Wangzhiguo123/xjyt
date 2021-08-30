
// import request from "../../index";
import * as request from "@/api/index";
// const url ="http://192.168.6.107:18089"
const url ="v1"
// 字典类型列表初始化
export function processTransactionPage(query){
  return request.get(`${url}/sysdictionary/dicByTypeId`,query)
  }
// 字典类型列表查询（ID）用于修改获取到的数据
export function processTransactionPageTc(query){
  return request.get(`${url}/sysdictionary/findById`,query)
}
// 字典类型(修改)
export function Updates(data){
  return request.put(`${url}/sysdictionary/update`,data)
}
// 字典类型(新增)
export function Create(data){
    return request.post(`${url}/sysdictionary/create`,data)
  }
// 字典类型(删除)
export function Deletes(data){
    return request.deletefn(`${url}/sysdictionary/delete/`+data)
  }
