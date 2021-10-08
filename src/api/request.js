import axios from "axios";

import { Message } from "element-ui";

import apiList from "./apiList";
// 创建一个axios实例
const axiosService = axios.create({
  timeout: 15000, // 设置超时时间为5s
});
// request拦截器 ==> 对请求参数进行处理
axiosService.interceptors.request.use(
  (config) => {
    let apiTarget = apiList.find((it) => config.url.indexOf(it.key) > -1);
    // 移除代理字符串
    let reg = new RegExp(apiTarget.key);
    config.url = config.url.replace(reg, "");

    config.baseURL = apiTarget.env;

    // 可以在发送请求之前做些事情
    // 比如请求参数的处理、在headers中携带token等等
    if (config.data && config.data.hasOwnProperty("headers")) {
      config.headers = config.data.headers;
    }
    const token = sessionStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    } else {
      //如果没有登录跳转登录页
      //  let path = window.location.href.split('#')[1];
      //  console.log('/login',path)
      //  if (path !== '/login') {
      //      this.$router.push({path:"/login"});
      //  }
    }
    return config;
  },
  (error) => {
    // 处理请求错误
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器 ==> 对响应做处理
axiosService.interceptors.response.use(
  (response) => {
    const res = response;
    // 如果自定义的返回码不等于200, 就返回一个错误
    if (res.status === 200 || res.status === 204) {
      if (res.data.code) {
        Message.closeAll();
        Message({
          showClose: true,
          message: res.data.message,
          type: "error",
        });
        return res;
      }
      return res;
    } else {
      return Promise.reject(new Error(res.message || "Error"));
    }
  },
  (error) => {
    // 判断error的status代码，并将对应的信息告知用户
    let text = "";
    let err = JSON.parse(JSON.stringify(error));
    if (err.response && err.response.status) {
      switch (error.response.status) {
        case 400:
          text = "请求错误(400)，请重新申请";
          break;
        case 401:
          text = "登录错误(401)，请重新登录";
          return this.$router.replace("/login");
        case 403:
          text = "拒绝访问(403)";
          break;
        case 404:
          text = "请求出错(404)";
          break;
        case 408:
          text = "请求超时(408)";
          break;
        case 500:
          text = "服务器错误(500)，请重启软件或切换功能页！";
          break;
        case 501:
          text = "服务未实现(501)";
          break;
        case 502:
          text = "网络错误(502)";
          break;
        case 503:
          text = "服务不可用(503)";
          break;
        case 504:
          text = "网络超时(504)";
          break;
        case 505:
          text = "HTTP版本不受支持(505)";
          break;
        default:
          text = "网络连接出错";
      }
    } else {
      text = "连接服务器失败,请退出重试!";
    }

    Message.closeAll();
    Message({
      showClose: true,
      message: text,
      type: "error",
    });
    return Promise.reject(error);
  }
);

// 将写好的axios实例暴露出去
export default axiosService;
