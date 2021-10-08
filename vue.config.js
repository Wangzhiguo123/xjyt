/*
 * @Description:
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-18 10:25:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-09-07 15:14:06
 */
const path = require("path");
const debug = process.env.NODE_ENV === "development";
function resolve(dir) {
  return path.join(__dirname, dir);
}
require('events').EventEmitter.defaultMaxListeners = 0

module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  productionSourceMap: false,
  outputDir: "dist",

  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");

    // svg
    config.module.rule("svg").exclude.add(resolve("src/icons")).end();
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      })
      .end();
  },

  configureWebpack: (config) => {
    // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) {
      // 开发环境配置
      config.devtool = "cheap-module-eval-source-map";
    } else {
      // 生产环境配置
    }
    Object.assign(config, {
      // 关闭 webpack 的性能提示
      performance: {
        hints: false,
      },
      // 开发生产共同配置，配置别名
      resolve: {
        extensions: [".js", ".json", ".vue"],
        alias: {
          "@": resolve("src"),
          vue$: "vue/dist/vue.esm.js",
        },
      },
    });
  },

  devServer: {
    open: false,
    https: false,
    port: 8000,
    proxy: {
      "/api": {
        target: "http://pss-knowledge.cddev.cddpi.com",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
      "/passsystem": {
        // target: "http://pss-system-test.cddev.cddpi.com",
        target: "http://192.168.16.75:18100",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/passsystem": "",
        },
      },
      "/passknowledge": {
        target: "http://192.168.6.156:18098",
        // target: "http://pss-knowledge-test.cddev.cddpi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/passknowledge": "",
        },
      },
      "/passrepair": {
        target: "http://192.168.6.150:18086",
        changeOrigin: true,
        pathRewrite: {
          "^/passrepair": "",
        },
      },
      //ceshi
      "/paramAlerts": {
        target: "http://192.168.16.75:18103",
        // target: "http://192.168.16.108:18103",
        // target: "http://pss-monitor-production.cddev.cddpi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/paramAlerts": "",
        },
      },
      //监控
      "/bese": {
        // target: "http://192.168.16.35:18080",
        target: "http://pss-base.cddev.cddpi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/bese": "",
        },
      },
      "/flight": {
        target: "http://192.168.16.94:18102",
        changeOrigin: true,
        pathRewrite: {
          "^/flight": "",
        },
      },
      "/passkpi": {
        // target: "http://pss.zonglie.work",
        // target: "http://pss-kpi.cddev.cddpi.com",
        target: "http://192.168.16.68:18090",
        // target: "http://192.168.7.162:18090",
        changeOrigin: true,
        pathRewrite: {
          "^/passkpi": "",
        },
      },
      "/employee": {
        target: "http://192.168.16.94:18100",
        changeOrigin: true,
        pathRewrite: {
          "^/employee": "",
        },
      },
      // 车辆管理
      "/vehicle": {
        // target: "http://192.168.16.75:18080/",
        target: "http://pss-base.cddev.cddpi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/vehicle": "",
        },
      },
      //车辆监控报警模块
      "/carWarning": { 
        target: "http://192.168.16.75:18094",
        // target: "http://192.168.16.108:18094",
        // target: "http://pss-monitor-car.cddev.cddpi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/carWarning": "",
        },
      },
      //视频告警模块
      "/video": {  
        target: "http://192.168.16.75:18201",
        // target: "http://192.168.16.108:18201",
        // target: "http://pss-monitor-car.cddev.cddpi.com",
        changeOrigin: true,
        pathRewrite: {
          "^/video": "",
        },
      },
      "/annuaPlan": {
        target: "http://192.168.6.107:18088",
        changeOrigin: true,
        pathRewrite: {
          "^/annuaPlan": "",
        },
      },
      "/workManage": {
        target: "http://192.168.6.107:18100",
        changeOrigin: true,
        pathRewrite: {
          "^/workManage": "",
        },
      },
    },
  },
  lintOnSave: false,
};
