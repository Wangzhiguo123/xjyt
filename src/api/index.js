import axiosService from "./request";

/**
 * GET 请求
 * @param{String} urlKey 对应API 中的urlkey
 * @param{Object} params  发送ajax 传递的参数对象
 * @param{Object} headerConfig  请求头信息
 * @returns {promise} 返回promise对象
 */
export const get = (urlKey, params) => {
  let myConfig = {
    params: params || [],
    // headers: {}
  };
  // let myConfig = params;
  // console.log(myConfig)
  return new Promise((resolve, reject) => {
    axiosService
      .get(urlKey, myConfig)
      .then((res) => {
        // if (res.data.status === 200) {
        resolve(res);
        // } else {
        //   console.log(res.data.msg);
        // }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * post 请求
 * @param{String} urlKey 对应API 中的urlkey
 * @param{Object} params  发送ajax 传递的参数对象
 * @param{Object} headerConfig  请求头信息
 * @returns {promise} 返回promise对象
 */
export const post = (urlKey, params) => {
  let myConfig = params;
  return new Promise((resolve, reject) => {
    axiosService
      .post(urlKey, myConfig)
      .then((res) => {
        // console.log(res)
        resolve(res);
        // if (res.data.status === 200) {
        //   resolve(res.data);
        // } else {
        //   console.log(res.data.msg);
        // }
      })
      .catch((error) => {
        reject(error);
      });
  });
};
/**
 * put方法，对应put请求
 * @param{String} urlKey 对应API 中的urlkey
 * @param{Object} params  发送ajax 传递的参数对象
 * @param{Object} headerConfig  请求头信息
 * @returns {promise} 返回promise对象
 */
export function put(urlKey, params) {
  // let myConfig = {
  //   params: params || [],
  //   headers: {}
  // };
  let myConfig = params;
  return new Promise((resolve, reject) => {
    axiosService
      .put(urlKey, myConfig)
      .then((res) => {
        resolve(res);
        // if (res.data.status === 200) {
        //   resolve(res);
        // } else {
        //   console.log(res.data.msg);
        // }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

/**
 * delete
 * @param {String} urlKey [请求的urlKey地址]
 * @param {Object} params [请求时携带的参数]
 */
export function deletefn(urlKey, params) {
  // let myConfig = {
  //   params: params || [],
  //   headers: {},
  // };
  let myConfig = params;
  // console.log(myConfig)
  return new Promise((resolve, reject) => {
    axiosService
      .delete(urlKey, myConfig)
      .then((res) => {
        // console.log(res)
        resolve(res);
        // if (res.data.status === 200) {
        //   // resolve(res.data);
        // } else {
        //   console.log(res.data.msg);
        // }
      })
      .catch((error) => {
        reject(error);
      });
  });
}
