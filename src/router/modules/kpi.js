/*
 * @Description: kpi管理
 * @Date: 2021-08-30 16:28:27
 * @LastEditTime: 2021-09-06 10:32:30
 */
export default [
  {
    path: "/kpi-manage",
    name: "kpiManage",
    redirect: "/model-manage",
    meta: {
      menuName: "KPI管理",
      iconClass: "kpi",
      isMenu: true,
    },
    component: () => import("@/views/kpiManage"),
    children: [
      {
        path: "/model-manage",
        name: "modelManage",
        meta: {
          menuName: "评价模型管理",
          isMenu: true,
        },
        component: () => import("@/views/kpiManage/modelManage"),
      },
      {
        path: "/model-add",
        name: "modelAdd",
        meta: {
          menuName: "模型新增",
          isMenu: false,
          parentPath: '/model-manage'
        },
        component: () => import("@/views/kpiManage/modelManage/add"),
      },
      {
        path: "/model-edit/:id",
        name: "modelEdit",
        props: true,
        meta: {
          menuName: "模型编辑",
          isMenu: false,
          parentPath: '/model-manage'
        },
        component: () => import("@/views/kpiManage/modelManage/add"),
      },
      {
        path: "/model-detail/:id",
        name: "modelDetail",
        props: true,
        meta: {
          menuName: "详情",
          isMenu: false,
          parentPath: '/model-manage'
        },
        component: () => import("@/views/kpiManage/modelManage/detail"),
      },
      {
        path: "/express-manage",
        name: "expressManage",
        meta: {
          menuName: "指标库管理",
          isMenu: true,
        },
        component: () => import("@/views/kpiManage/expressManage"),
      },

      {
        path: "/express-config/:id/:type",
        name: "expressConfig",
        meta: {
          menuName: "指标公式配置",
          isMenu: false,
          parentPath: '/express-manage'
        },
        props: true,
        component: () => import("@/views/kpiManage/expressManage/expressconfig"),
      },
      {
        path: "/comment-manage",
        name: "commentManage",
        meta: {
          menuName: "评价管理",
          isMenu: true,
        },
        component: () => import("@/views/kpiManage/commentManage"),
      },
      {
        path: "/comment-add",
        name: "commentAdd",
        meta: {
          menuName: "评价新增",
          isMenu: false,
          parentPath: '/comment-manage'
        },
        component: () => import("@/views/kpiManage/commentManage/edit"),
      },
      {
        path: "/comment-edit/:id",
        name: "commentEdit",
        props: true,
        meta: {
          menuName: "评价编辑",
          isMenu: false,
          parentPath: '/comment-manage'
        },
        component: () => import("@/views/kpiManage/commentManage/edit"),
      },
      {
        path: "/comment-detail/:id",
        name: "commentDetail",
        props: true,
        meta: {
          menuName: "评价详情",
          isMenu: false,
          parentPath: '/comment-manage'
        },
        component: () => import("@/views/kpiManage/commentManage/detail"),
      },
      {
        path: "/comment-result-search",
        name: "commentResultSearch",
        meta: {
          menuName: "评价结果查询",
          isMenu: true,
        },
        component: () => import("@/views/kpiManage/commentResult"),
      },
      {
        path: "/dimension-manage",
        name: "dimensionManage",
        meta: {
          menuName: "维度维护",
          isMenu: true,
        },
        redirect: "/business",
        component: () => import("@/views/kpiManage/dimensionManage"),
        children: [
          {
            path: "/business",
            name: "business",
            meta: {
              menuName: "业务分类",
              isMenu: true,
            },
            component: () =>
              import("@/views/kpiManage/dimensionManage/business"),
          },
          {
            path: "/scene",
            name: "scene",
            meta: {
              menuName: "场景分类",
              isMenu: true,
            },
            component: () => import("@/views/kpiManage/dimensionManage/scene"),
          },
          {
            path: "/organization-dimension",
            name: "organizationDimension",
            meta: {
              menuName: "组织机构维度",
              isMenu: true,
            },
            component: () =>
              import("@/views/kpiManage/dimensionManage/organization"),
          },

          {
            path: "/geology-dimension",
            name: "geologyDimension",
            meta: {
              menuName: "地质关系维度",
              isMenu: true,
            },
            component: () =>
              import("@/views/kpiManage/dimensionManage/geology"),
          },

          {
            path: "/transportation-dimension",
            name: "transportationDimension",
            meta: {
              menuName: "集输关系维度",
              isMenu: true,
            },
            component: () =>
              import("@/views/kpiManage/dimensionManage/transportation"),
          },
          {
            path: "/organization-dimension-relative",
            name: "organizationDimensionRelative",
            meta: {
              menuName: "组织机构维度关联",
              isMenu: true,
            },
            component: () =>
              import("@/views/kpiManage/dimensionManage/organizationRelative"),
          },
          {
            path: "/geology-dimension-relative",
            name: "geologyDimensionRelative",
            meta: {
              menuName: "地质关系维度关联",
              isMenu: true,
            },
            component: () =>
              import("@/views/kpiManage/dimensionManage/geologyRelative"),
          },
          {
            path: "/transportation-dimension-relative",
            name: "transportationDimensionRelative",
            meta: {
              menuName: "集输关系维度关联",
              isMenu: true,
            },
            component: () =>
              import(
                "@/views/kpiManage/dimensionManage/transportationRelative"
              ),
          },
        ],
      },
    ],
  },
];
