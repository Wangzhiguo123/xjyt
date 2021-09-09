/*
 * @Description: 
 * @Date: 2021-08-17 17:14:03
 * @LastEditTime: 2021-08-27 09:44:23
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins";
import "@/assets/common.less";

import './icons'
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
