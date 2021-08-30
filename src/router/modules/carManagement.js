/**
 * 模块名称      车辆管理
 * name         用来判断路由的权限
 * menuName     菜单名称
 * meta         自定义菜单信息
 * iconClass    图标类名
 * isMenu       是否是菜单
 * isOpen       是否展开
 */
export default [
  {
    path: "/carManagement",
    name: "carManagement",
    redirect: "/carType",
    meta: {
      menuName: "车辆管理",
      iconClass: "knowledgebase",
      isMenu: true,
    },
    component: () => import("@/views/carManagement"),
    children: [
      {
        path: "/carInfo",
        name: "carInfo",
        meta: {
          menuName: "车辆信息",
          isMenu: true, 
        },
        component: () => import("@/views/carManagement/carInfo/list"),
      },
      {
        path: "/carType",
        name: "carType",
        meta: {
          menuName: "车辆类型",
          isMenu: true, 
        },
        component: () => import("@/views/carManagement/carType/list"),
      },
      {
        path: "/carColor",
        name: "carColor",
        meta: {
          menuName: "车辆颜色",
          isMenu: true, 
        },
        component: () => import("@/views/carManagement/carColor/list"),
      },
      {
        path: "/carOrganization",
        name: "carOrganization",
        meta: {
          menuName: "车辆组织",
          isMenu: true, 
        },
        component: () => import("@/views/carManagement/carOrganization/list"),
      },
      {
        path: "/carOperationType",
        name: "carOperationType", 
        meta: {
          menuName: "车辆运营类型",
          isMenu: true, 
        },
        component: () => import("@/views/carManagement/carOperationType/list"),
      },
      { 
        path: "/carOperationStatus",
        name: "carOperationStatus",
        meta: {
          menuName: "车辆运维状态",
          isMenu: true, 
        },
        component: () => import("@/views/carManagement/carOperationStatus/list"),
      },
      { 
        path: "/carRelation",
        name: "carRelation",
        meta: {
          menuName: "车辆组织与管理组织关联",
          isMenu: true, 
        },
        component: () => import("@/views/carManagement/carRelation/list"),
      },
    ],
  },
];
