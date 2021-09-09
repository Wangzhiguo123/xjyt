/*
 * @Description:
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-18 10:25:24
 * @LastEditTime: 2021-09-07 14:46:47
 */
import * as request from "@/api/index";
const base1 = "/passsystem";

// 获取字典数据
export function getDicList(query) {
  return request.get(`${base1}/v1/sysdictionary/dicByTypeCode`, query);
}
// 文件上传
export function uploadFile(param) {
  return request.post(`${base1}/v1/file/uploadFile`, param);
}
