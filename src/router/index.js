import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const modules = require.context("./", true, /\.js$/);
modules.keys().forEach((element) => {
  const ele = modules(element).default;
  console.log(ele);
});
/**
 * name         用来判断路由的权限
 * menuName     菜单名称
 * meta         自定义菜单信息
 * iconClass    图标类名
 * isMenu       是否是菜单
 * isOpen       是否展开
 */
const routes = [
  {
    path: "/operationAnalysis",
    name: "operationAnalysis",
    meta: {
      menuName: "运行分析",
      iconClass: "el-icon-location",
      isMenu: true,
    },
    redirect: "/operationAnalysis/test",
    component: () =>
      import(
        /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/index"
      ),
    children: [
      {
        path: "/test",
        name: "test",
        meta: {
          menuName: "测试",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/test"
          ),
      },
      {
        path: "/testA",
        name: "testA",
        meta: {
          menuName: "测试2",
          isMenu: false,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/testA"
          ),
      },
      {
        path: "/test3",
        name: "test3",
        meta: {
          menuName: "日历",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/test3"
          ),
      },
      {
        path: "/maintenance",
        name: "maintenance",
        meta: {
          menuName: "维修单",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/maintenance"
          ),
      },
      {
        path: "/work_order",
        name: "work_order",
        meta: {
          menuName: "我的工单详情",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/work_order"
          ),
      },
      {
        path: "/myOrder",
        name: "myOrder",
        meta: {
          menuName: "我的工单",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/myOrder"
          ),
      },
      {
        path: "/repairOrder",
        name: "repairOrder",
        meta: {
          menuName: "待办工单",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/repairOrder"
          ),
      },
      {
        path: "/transferredOrder",
        name: "transferredOrder",
        meta: {
          menuName: "办结工单",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/operationAnalysis/transferredOrder"
          ),
      },
    ],
  },
  {
    path: "/monitor",
    name: "monitor",
    meta: {
      menuName: "生产监控",
      iconClass: "el-icon-location",
      isMenu: true,
    },
    component: () =>
      import(/* webpackChunkName: "operationAnalysis" */ "../views/monitor"),
    children: [
      {
        path: "/alarmMap",
        name: "alarmMap",
        meta: {
          menuName: "地图告警",
          isMenu: true,
        },
        component: () =>
          import(
            /* webpackChunkName: "operationAnalysis" */ "../views/monitor/alarmMap"
          ),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "hash",
  base: "/",
  routes,
});

export default router;
