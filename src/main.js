import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./plugins";
import BaiduMap from "vue-baidu-map";
Vue.config.productionTip = false;

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: "cjRhYaoV5wnviG0dumfGizphH0K1x62D",
}),
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
