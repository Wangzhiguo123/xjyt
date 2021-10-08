/*
 * @Description: 文件上传接口
 */
import * as request from "@/api/index";
 const carUrl = "/vehicle/v1"
 export default {
     // 车辆基础信息导入
     carsImport : `${carUrl}/cars/import`,
     // 司机信息导入
     carDriversImport : `${carUrl}/carDrivers/import`,
 };