/*
 * @Description: 
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-18 10:25:24
 * @LastEditTime: 2021-08-18 10:33:36
 */
// const url = "192.000.1234";
import request from "../../index";

export function dcRepair(query) {
  return request.get("/dcRepair/dcRepair/create", query);
}
