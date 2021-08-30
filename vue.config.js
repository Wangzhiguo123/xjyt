/*
 * @Description:
 * @Version: 2.0
 * @Autor: hh
 * @Date: 2021-08-18 10:25:24
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-27 10:05:47
 */
const path = require("path");
const debug = process.env.NODE_ENV === "development";
function resolve(dir) {
  return path.join(__dirname, dir);
}
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
        // target: "http://pss-knowledge.cddev.cddpi.com",
        // target: "http://192.168.16.35:8088",
        // target: "http://192.168.6.107:18092",
        target:"http://192.168.6.107:18100/",
        // target: "http://192.168.16.72:18092",
        // target: "http://192.168.7.5:18080",
        // target: "http://192.168.16.56:18080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
  lintOnSave: false,
};
