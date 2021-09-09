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
      test: "",
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
    key: "/paramAlerts",
    env: {
      development: "/paramAlerts",
      test: "",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/bese",
    env: {
      development: "/bese",
      test: "",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/passkpi",
    env: {
      development: "/passkpi",
      test: "",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
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
    key: "/vehicle",
    env: {
      development: "/vehicle",
      test: "",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
    }[process.env.NODE_ENV],
  },
  {
    key: "/carWarning",
    env: {
      development: "/carWarning",
      test: "",
      devcater: "http://pss-knowledge.cddev.cddpi.com",
      production: "http://pss-knowledge.cddev.cddpi.com",
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
