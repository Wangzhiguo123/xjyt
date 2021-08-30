/*
 * @Description: 知识库管理页面
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-19 10:34:30
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 14:33:55
 */
/**
 * 模块名称      知识库
 * name         用来判断路由的权限
 * menuName     菜单名称
 * meta         自定义菜单信息
 * iconClass    图标类名
 * isMenu       是否是菜单
 * isOpen       是否展开
 */
export default [
  {
    path: "/knowledge-base",
    name: "knowledgeBase",
    redirect: "/search",
    meta: {
      menuName: "知识库",
      iconClass: "knowledgebase",
      isMenu: true,
    },
    component: () => import("@/views/knowledgeBase"),
    children: [
      {
        path: "/search",
        name: "search",
        meta: {
          menuName: "知识检索",
          isMenu: true,
        },
        component: () => import("@/views/knowledgeBase/search"),
      },
      {
        path: "/search-result",
        name: "searchResult",
        meta: {
          menuName: "知识检索结果",
          isMenu: false,
          parentPath: "/search",
        },
        component: () => import("@/views/knowledgeBase/search/searchResult"),
      },
      {
        path: "/handle-build",
        name: "handleBuild",
        meta: {
          menuName: "手动知识构建",
          isMenu: true,
        },
        component: () => import("@/views/knowledgeBase/handleBuild"),
      },
      {
        path: "/work-build",
        name: "workBuild",
        meta: {
          menuName: "工单知识构建",
          isMenu: true,
        },
        component: () => import("@/views/knowledgeBase/workBuild"),
      },
      {
        path: "/base-manage",
        name: "baseManage",
        redirect: "/knowledge-manage",
        meta: {
          menuName: "知识库管理",
          isMenu: true,
        },
        component: () => import("@/views/knowledgeBase/baseManage"),
        children: [
          {
            path: "/knowledge-manage",
            name: "knowledgeManage",
            meta: {
              menuName: "知识管理",
              isMenu: true,
            },
            component: () =>
              import("@/views/knowledgeBase/baseManage/knowledge"),
          },
          {
            path: "/knowledge-add",
            name: "knowledgeAdd",
            meta: {
              menuName: "知识新增",
              isMenu: false,
              parentPath: "/knowledge-manage",
            },
            component: () =>
              import("@/views/knowledgeBase/baseManage/knowledge/add"),
          },
          {
            path: "/knowledge-detail/:id",
            name: "knowledgeDetail",
            meta: {
              menuName: "详情",
              isMenu: false,
              parentPath: "/knowledge-manage",
            },
            props: true,
            component: () =>
              import("@/views/knowledgeBase/baseManage/knowledge/detail"),
          },
          {
            path: "/knowledge-update/:updateArticleId",
            name: "knowledgeUpdate",
            meta: {
              menuName: "知识编辑",
              isMenu: false,
              parentPath: "/knowledge-manage",
            },
            props: true,
            component: () =>
              import("@/views/knowledgeBase/baseManage/knowledge/add"),
          },
          {
            path: "/classify-manage",
            name: "classifyManage",
            meta: {
              menuName: "类别管理",
              isMenu: true,
            },
            component: () =>
              import("@/views/knowledgeBase/baseManage/classify"),
          },
          {
            path: "/labels-manage",
            name: "labelsManage",
            meta: {
              menuName: "标签管理",
              isMenu: true,
            },
            component: () => import("@/views/knowledgeBase/baseManage/labels"),
          },
        ],
      },
    ],
  },
];
