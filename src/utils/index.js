/*
 * @Description: 工具类
 * @Date: 2021-08-25 15:42:02
 * @LastEditTime: 2021-08-27 15:10:25
 */
export function formatSizeUnits(bytes) {
  if (bytes === 0) return "0 B";

  let k = 1024;

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  let i = Math.floor(Math.log(bytes) / Math.log(k));

  var num = bytes / Math.pow(k, i);
  return num.toPrecision(3) + " " + sizes[i];
}
/**
 * @description: 封装入参
 * @param {*} obj 参数对象
 * @param {*} target formdata 对象
 */
export function handleParam(obj, target) {
  for (let [key, val] of Object.entries(obj)) {
    if (val instanceof Array) {
      for (let v of val) {
        // if (v instanceof Object) return;
        target.append(key, v);
      }
    } else {
      target.append(key, val);
    }
  }
}

/**
 * @description: 截取路由参数
 * @param {*} name
 */
export function getQueryString() {
  let href = decodeURIComponent(window.location.href);
  let query = href.substring(href.indexOf("?") + 1);
  let vars = query.split("&");
  let obj = {};
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split("=");
    obj[pair[0]] = pair[1];
  }
  return obj;
}
