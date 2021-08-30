/*
 * @Description: 路由引入
 * @Autor: hh
 * @Date: 2021-08-17 17:14:03
 * @LastEditTime: 2021-08-24 09:30:10
 */

/**
 *  meta: {
          menuName: "", // 路由显示名称
          isMenu: false, // 是否需要显示在sidebar的路由
          parentPath: '' // 高亮sidebar的父级路由path
        },
 * 
 */
import Vue from "vue";
import VueRouter from "vue-router";
import knowledgeBase from "./modules/knowledgeBase";
import operationAnalysis from "./modules/operationAnalysis";
import productionMonitoring from "./modules/productionMonitoring";
import carManagement  from "./modules/carManagement";
import flightManagement from "./modules/flightManagement"
Vue.use(VueRouter);

// const modules = require.context("./", true, /\.js$/);
// modules.keys().forEach((element) => {
//   const ele = modules(element).default;
//   console.log(ele);
// });
const routes = [
  ...knowledgeBase,
  ...operationAnalysis,
  ...productionMonitoring,
  ...carManagement,
  ...flightManagement
];

const router = new VueRouter({
  mode: "hash",
  base: "/",
  routes,
});

export default router;
