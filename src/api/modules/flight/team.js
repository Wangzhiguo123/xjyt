import * as request from "@/api/index";
const url ="/flight/v1"
const url2 = "/employee/v1"
//班组列表初始化
export function processTransactionPage(query){
  return request.get(`${url}/teams/page`,query)
  }
//班组列表(修改)
export function Updates(data){
  return request.put(`${url}/teams`,data)
}
// 班组列表(新增)
export function Create(data){
    return request.post(`${url}/teams`,data)
  }
  // 班组所有班组
export function Allteams(query){
    return request.get(`${url}/teams/page`,query)
  }
// 班组列表(删除)
export function Deletes(data){
    return request.deletefn(`${url}/teams/`+data)
  }
  // 班组列表(详情)
export function getDetails(data){
    return request.get(`${url}/teams/`+data)
  }
// 员工列表(班组管理初始化员工列表数据用于选择)
export function Workers(){
  return request.get(`${url2}/employess`)
}

