
// import request from "../../index";
import * as request from "@/api/index";
// const url ="http://192.168.6.107:18089"
const url ="/flight/v1"
// 班次列表初始化
export function processTransactionPage(query){
  return request.get(`${url}/shifts`,query)
  }
// 班次列表(修改)
export function Updates(data){
  return request.put(`${url}/shifts`,data)
}
// 班次列表(新增)
export function Create(data){
    return request.post(`${url}/shifts`,data)
  }
// 班次列表(删除)
export function Deletes(data){
    return request.deletefn(`${url}/shifts/`+data)
  }
