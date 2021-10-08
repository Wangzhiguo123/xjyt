/*
 * @Description: 微服务多接口配置
 * @Date: 2021-08-18 10:25:24
 *  key => 微服务模块名
 *  env => 当前项目运行环境
 *      development => 开发环境
 *      test  => 测试环境,
 *      devcater => 线上开发环境
 *      production => 生产环境
 *
 * @LastEditTime: 2021-09-06 09:41:59
 */
const apiList = [
  {
    key: "/api",
    env: {
      development: "/api",
      test: "http://pss-system-test.cddev.cddpi.com",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/passsystem", // 系统默认
    env: {
      development: "/passsystem",
      devcater: "http://192.168.6.150:18080/",
      test: "http://pss-system-test.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/passknowledge", // 知识库
    env: {
      development: "/passknowledge",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
      test: "http://pss-knowledge-test.cddev.cddpi.com/",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/passrepair", // 工单
    env: {
      development: "/passrepair",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
      test: "http://pss-system-test.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/paramAlerts",//生产告警
    env: {
      development: "/paramAlerts",
      test: "http://pss-system-test.cddev.cddpi.com",
      devcater: "http://pss-monitor-production.cddev.cddpi.com",
      production: "http://pss-monitor-production.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/bese",
    env: {
      development: "/bese",
      test: "",
      devcater: "http://pss-base.cddev.cddpi.com",
      production: "http://pss-base.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/passkpi",
    env: {
      development: "/passkpi",
      test: "http://pss-kpi-test.cddev.cddpi.com",
      devcater: "http://pss-kpi.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/flight",
    env: {
      development: "/flight",
      test: "",
      devcater: "http://192.168.16.94:18102",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/employee",
    env: {
      development: "/employee",
      test: "",
      devcater: "http://192.168.16.94:18100",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/annuaPlan",
    env: {
      development: "/annuaPlan",
      test: "",
      devcater: "http://192.168.6.107:18088",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/vehicle",//车辆管理
    env: {
      development: "/vehicle",
      test: "http://pss-system-test.cddev.cddpi.com",
      devcater: "http://pss-base.cddev.cddpi.com",
      production: "http://pss-base.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/carWarning",
    env: {
      development: "/carWarning",
      test: "http://pss-system-test.cddev.cddpi.com",
      devcater: "http://pss-monitor-car.cddev.cddpi.com",
      production: "http://pss-monitor-car.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/video",
    env: {
      development: "/video",
      test: "http://pss-system-test.cddev.cddpi.com",
      devcater: "http://pss-monitor-video.cddev.cddpi.com",
      production: "http://pss-monitor-video.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/workManage",
    env: {
      development: "/workManage",
      test: "",
      devcater: "http://192.168.6.107:18100",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
];
export default apiList;
