/*
 * @Description: 车辆管理
 */
import * as request from "@/api/index";
const carUrl = "/vehicle/v1"; 
/********************************车辆信息******************************************/
//列表
export function carInfoPage(query){
    return request.post(`${carUrl}/cars/page?current=${query.current}&size=${query.size}`,query)
  }
//新增
export function carInfoAdd(query){
    return request.post(`${carUrl}/${query.organizationId}/cars/insert`,query)
  }
//修改
export function carInfoEdit(query){ 
    return request.put(`${carUrl}/${query.organizationId}/cars/update`,query)
  }
// 详情 待测试
export function carInfoDetails(query){
  return request.get(`${carUrl}/${query.organizationId}/cars/update/${query.id}`)
}  
//删除
export function carInfoDel(query){
    return request.deletefn(`${carUrl}/${query.organizationId}/cars/${query.id}`)
  }
//导入
export function carsImport(query){
    return request.get(`${carUrl}/cars/import`)
  }
/********************************车辆类型******************************************/
//列表
export function carTypesPage(query){
    return request.get(`${carUrl}/carTypes/page`,query)
  }
//新增
export function carTypesAdd(query){
    return request.post(`${carUrl}/carTypes`,query)
  }
//修改
export function carTypesEdit(query){
    return request.put(`${carUrl}/carTypes`,query)
  }
//删除
export function carTypesDel(query){
    return request.deletefn(`${carUrl}/carTypes/${query.id}`)
  }
/********************************车辆颜色******************************************/
//列表
export function carColorPage(query){
    return request.get(`${carUrl}/carLicensePlateColors/page`,query)
  }
//新增
export function carColorAdd(query){
    return request.post(`${carUrl}/carLicensePlateColors`,query)
  }
//修改
export function carColorEdit(query){
    return request.put(`${carUrl}/carLicensePlateColors`,query)
  }
//删除
export function carColorDel(query){
    return request.deletefn(`${carUrl}/carLicensePlateColors/${query.id}`)
  }
/********************************车辆组织******************************************/
//列表
export function carOrganizesPage(query){
    return request.get(`${carUrl}/carOrganizes/page`,query)
  }
//新增
export function carOrganizesAdd(query){
    return request.post(`${carUrl}/carOrganizes`,query)
  }
//修改
export function carOrganizesEdit(query){
    return request.put(`${carUrl}/carOrganizes`,query)
  }
//删除
export function carOrganizesDel(query){
    return request.deletefn(`${carUrl}/carOrganizes/${query.id}`)
  }
/********************************车辆运营类型******************************************/
//列表
export function carOperationTypesPage(query){
    return request.get(`${carUrl}/carOperationTypes/page`,query)
  }
//新增
export function carOperationTypesAdd(query){
    return request.post(`${carUrl}/carOperationTypes`,query)
  }
//修改
export function carOperationTypesEdit(query){
    return request.put(`${carUrl}/carOperationTypes`,query)
  }
//删除
export function carOperationTypesDel(query){
    return request.deletefn(`${carUrl}/carOperationTypes/${query.id}`)
  }
/********************************车辆运维类型******************************************/
//列表 
export function carOperationStatussPage(query){
    return request.get(`${carUrl}/carOperationStatuss/page`,query)
  }
//新增
export function carOperationStatussAdd(query){
    return request.post(`${carUrl}/carOperationStatuss`,query)
  }
//修改
export function carOperationStatussEdit(query){
    return request.put(`${carUrl}/carOperationStatuss`,query)
  }
//删除
export function carOperationStatussDel(query){
    return request.deletefn(`${carUrl}/carOperationStatuss/${query.id}`)
  }
/********************************驾驶员信息******************************************/
//列表  
export function carDriversPage(query){
    return request.get(`${carUrl}/carDrivers/page`,query)
  }
//新增
export function carDriversAdd(query){
    return request.post(`${carUrl}/carDrivers`,query)
  }
//修改
export function carDriversEdit(query){
    return request.put(`${carUrl}/carDrivers`,query)
  }
//删除
export function carDriversDel(query){
    return request.deletefn(`${carUrl}/carDrivers/${query.id}`)
  }
/********************************车辆组织与管理组织关联******************************************/
//列表
export function carOrganizeCompanysPage(query){
    return request.get(`${carUrl}/carOrganizeCompanys/page`,query)
  }
//新增
export function carOrganizeCompanysAdd(query){
    return request.post(`${carUrl}/carOrganizeCompanys`,query)
  }
//修改
export function carOrganizeCompanysEdit(query){
    return request.put(`${carUrl}/carOrganizeCompanys`,query)
  }
//删除
export function carOrganizeCompanysDel(query){
    return request.deletefn(`${carUrl}/carOrganizeCompanys/${query.id}`)
  }