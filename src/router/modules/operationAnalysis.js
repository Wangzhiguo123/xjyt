
/**
 * 模块名称      运行分析
 * name         用来判断路由的权限
 * menuName     菜单名称
 * meta         自定义菜单信息
 * iconClass    图标类名
 * isMenu       是否是菜单
 * isOpen       是否展开
 */
export default [
  {
    path: "/operationAnalysis",
    name: "operationAnalysis",
    meta: {
      menuName: "运行分析",
      iconClass: "analysis",
      isMenu: true,
    },
    redirect: "/operationAnalysis/test",
    component: () => import("@/views/operationAnalysis/index"),
    children: [
      {
        path: "/test3",
        name: "test3",
        meta: {
          menuName: "日历",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/test3"),
      },
      {
        path: "/maintenance",
        name: "maintenance",
        meta: {
          menuName: "维修单",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/maintenance"),
      },
      {
        path: "/work_order",
        name: "work_order",
        meta: {
          menuName: "我的工单详情",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/work_order"),
      },
      {
        path: "/myOrder",
        name: "myOrder",
        meta: {
          menuName: "我的工单",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/myOrder"),
      },
      {
        path: "/myOrderDetails",
        name: "myOrderDetails",
        meta: {
          menuName: "我的工单",
          isMenu: false,
        },
        component: () => import("@/views/operationAnalysis/myOrder/details"),
      },
      {
        path: "/repairOrder",
        name: "repairOrder",
        meta: {
          menuName: "工单管理",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/repairOrder"),
      },
      {
        path: "/transferredOrder",
        name: "transferredOrder",
        meta: {
          menuName: "字典管理",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/transferredOrder"),
      },
      {
        path: "/transferredOrder/details",
        name: "dict_transferredOrder",
        meta: {
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/transferredOrder/details"),
      },
      {
        path: "/workbenchManage",
        name: "workbench",
        meta: {
          menuName: "工作台管理",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/workbench"),
      },
      {
        path: "/workbenchDetails",
        name: "workbench",
        meta: {
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/workbench/details"),
      },
      {
        path: "/workBench",
        name: "workBenchs",
        meta: {
          menuName: "工作台",
          isMenu: true,
        },
        component: () => import("@/views/monitor/workBench"),
      },
      {
        path: "/Plan",
        name: "Plan",
        meta: {
          menuName: "年度计划",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/annuaPlan"),
      },
      {
        path: "/details",
        meta: {
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/transferredOrder/details"),
      },
      {
        path: "/applyCar",
        name: "applyCar",
        meta: {
          menuName: "申请特车单",
          isMenu: true,
        },
        component: () => import("@/views/operationAnalysis/applyCar"),
      },
    ],
  },
];
