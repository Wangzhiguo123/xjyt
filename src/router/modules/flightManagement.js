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
      path: "/flightManagement",
      name: "flightManagement",
      redirect: "/flightManagement",
      meta: {
        menuName: "班次管理",
        iconClass: "knowledgebase",
        isMenu: true,
      },
      component: () => import("@/views/flightManagement"),
      children: [
        {
          path: "/flightManagements",
          name: "flightManagement",
          meta: {
            menuName: "班次管理",
            isMenu: true, 
          },
          component: () => import("@/views/flightManagement/flightManagement"),
        },
        {
          path: "/teamManagement",
          name: "teamManagement",
          meta: {
            menuName: "班组管理",
            isMenu: true, 
          },
          component: () => import("@/views/flightManagement/teamManagement/index"),
        },
      ],
    },
  ];
  