
// import request from "../../index";
import * as request from "@/api/index";
// const url ="http://192.168.6.107:18089"
// const url =""
const url ="/annuaPlan/v1"
// 年度计划列表初始化
export function processTransactionPage(query){
  return request.get(`${url}/annualSampling/annualSampling/page`,query)
  }
// 年度计划列表查询（ID）用于修改获取到的数据
export function processTransactionPageTc(query){
  return request.get(`${url}/annualSampling/annualSampling/findById`,query)
}
// 年度计划列表(修改)
export function Updates(data){
  return request.put(`${url}/annualSampling/annualSampling/update`,data)
}
// 年度计划列表(新增)
export function Create(data){
    return request.post(`${url}/annualSampling/annualSampling/create`,data)
  }
// 年度计划列表(删除)
export function Deletes(data){
    return request.deletefn(`${url}/annualSampling/annualSampling/`+data)
  }
