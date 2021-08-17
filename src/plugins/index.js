import Vue from "vue";
import ElementUI from "element-ui";
//eslint-disable-next-line
import 'element-ui/lib/theme-chalk/index.css';
import { get, post } from "@/api/index";
Vue.prototype.$http = { get, post };
Vue.use(ElementUI);
