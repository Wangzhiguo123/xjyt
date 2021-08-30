/*
 * @Description: 
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-17 17:14:03
 * @LastEditors: lhl
 * @LastEditTime: 2021-08-18 10:54:51
 */
import Vue from "vue";
import ElementUI from "element-ui";
//eslint-disable-next-line
import 'element-ui/lib/theme-chalk/index.css';
// import { get, post } from "@/api/index";
import BaiduMap from "vue-baidu-map";
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "cjRhYaoV5wnviG0dumfGizphH0K1x62D",
}),
  // (Vue.prototype.$http = { get, post });
Vue.use(ElementUI);
