/**
 * 模块名称      生产监控
 * name         用来判断路由的权限
 * menuName     菜单名称
 * meta         自定义菜单信息
 * iconClass    图标类名
 * isMenu       是否是菜单
 * isOpen       是否展开
 */
export default [
  {
    path: "/monitor",
    name: "monitor",
    meta: {
      menuName: "生产监控",
      iconClass: "monitor",
      isMenu: true,
    },
    component: () => import("@/views/monitor"),
    redirect: "/alarmMap",
    children: [
      {
        path: "/alarmMap",
        name: "alarmMap",
        meta: {
          menuName: "地图告警",
          isMenu: true,
        },
        component: () => import("@/views/monitor/alarmMap"),
      },
      {
        path: "/productionWarning",
        name: "productionWarning",
        meta: {
          menuName: "生产监控告警管理",
          isMenu: true,
        },
        redirect: "/parameterAlarm",
        component: () => import("@/views/monitor/productionWarning"),
        children: [
          {
            path: "/parameterAlarm",
            name: "parameterAlarm",
            meta: {
              menuName: "参数告警",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/productionWarning/parameterAlarm/list"),  
          },
          {
            path: "/productionWarning/parameterAlarm/details",
            name: "parameterDetails",
            meta: {
              menuName: "参数告警详情",
              isMenu: false,
            },
            component: () =>
              import("@/views/monitor/productionWarning/parameterAlarm/details"),
          },
          {
            path: "/faultAlarm",
            name: "faultAlarm",
            meta: {
              menuName: "故障告警",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/productionWarning/faultAlarm/list"),
          },
          {
            path: "/productionWarning/faultAlarm/details",
            name: "parameterDetails",
            meta: {
              menuName: "故障告警详情",
              isMenu: false,
            },
            component: () =>
              import("@/views/monitor/productionWarning/faultAlarm/details"),
          },
          {
            path: "/productionWarning/warningType",
            name: "warningType",
            meta: {
              menuName: "告警类型",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/productionWarning/warningType"),
          },
          {
            path: "/productionWarning/warningGrade",
            name: "warningGrade",
            meta: {
              menuName: "告警等级",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/productionWarning/warningGrade"),
          },
          {
            path: "/productionWarning/processingStatus",
            name: "processingStatus",
            meta: {
              menuName: "处理方式",
              isMenu: true,
            },
            component: () => import("@/views/monitor/productionWarning/processingStatus"),
          },
        ],
      },
      {
        path: "/videoSurveillance",
        name: "videoSurveillance",
        meta: {
          menuName: "视频监控告警管理",
          isMenu: true,
        },
        component: () => import("@/views/monitor/videoSurveillance"),
        redirect: "/videoSurveillance/basicsInfo",
        children:[
          {
            path: "/videoSurveillance/basicsInfo",
            name: "basicsInfo",
            meta: {  
              menuName: "视频监控告警管理",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/videoSurveillance/basicsInfo/list"),
          },
          {
            path: "/videoSurveillance/basicsInfo/details",
            name: "basicsDetails",
            meta: {  
              menuName: "视频监控告警管理详情",
              isMenu: false,
            },
            component: () =>
              import("@/views/monitor/videoSurveillance/basicsInfo/details"),
          },
          {
            path: "/videoSurveillance/paramInfo",
            name: "paramInfo",
            meta: {  
              menuName: "视频监控参数管理",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/videoSurveillance/paramInfo/list"),
          },
        ]
      },
      {
        path: "/runningVehicle",
        name: "runningVehicle",
        meta: {
          menuName: "运行车辆警告管理",
          isMenu: true,
        },
        component: () => import("@/views/monitor/runningVehicle"),
        redirect: "/runningVehicle/alarInfo",
        children:[
          {
            path: "/runningVehicle/alarInfo",
            name: "alarInfo",
            meta: {  
              menuName: "车辆监控告警管理",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/runningVehicle/alarInfo/list"),
          },
          {
            path: "/runningVehicle/alarInfo/details",
            name: "carAlarInfoDetails",
            meta: {  
              menuName: "车辆监控告警管理详情",
              isMenu: false,
            },
            component: () =>
              import("@/views/monitor/runningVehicle/alarInfo/details"),
          },
          {
            path: "/runningVehicle/typeManagement",
            name: "typeManagement",
            meta: {  
              menuName: "车辆报警类型管理",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/runningVehicle/typeManagement/list"),
          },
          {
            path: "/runningVehicle/basicsInfo",
            name: "basicsInfo",
            meta: {  
              menuName: "车辆基础信息管理",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/runningVehicle/basicsInfo/list"),
          },
          {
            path: "/runningVehicle/processingType",
            name: "processingType",
            meta: {  
              menuName: "处理方式",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/runningVehicle/processingType/list"),
          },
        ]
      },
      {
        path: "/monitoringUnit",
        name: "monitoringUnit",
        meta: {
          menuName: "监控单元信息查询",
          isMenu: true,
        },
        component: () => import("@/views/monitor/monitoringUnit"),
      },
      {
        path: "/alarmStatistics",
        name: "alarmStatistics",
        meta: {
          menuName: "告警统计",
          isMenu: true,
        },
        component: () => import("@/views/monitor/alarmStatistics"),
      },
      {
        path: "/alarmHistory",
        name: "alarmHistory",
        meta: {
          menuName: "告警历史",
          isMenu: true,
        },
        component: () => import("@/views/monitor/alarmHistory"),
      },
      {
        path: "/device",
        name: "device",
        meta: {
          menuName: "设备管理",
          isMenu: true,
        },
        component: () => import("@/views/monitor/device"),
        children:[
          {
            path: "/device/camera",
            name: "camera",
            meta: {  
              menuName: "摄像头",
              isMenu: true,
            },
            component: () =>
              import("@/views/monitor/device/camera/list"),
          },
        ]
      },
      {
        path: "/dispatch",
        name: "dispatch",
        meta: {
          menuName: "自动派单配置",
          isMenu: true,
        },
        component: () => import("@/views/monitor/dispatch/list"),
      },
    ],
  },
];
