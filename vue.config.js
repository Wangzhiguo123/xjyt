const path = require("path");
const debug = process.env.NODE_ENV === "development";

module.exports = {
  publicPath: process.env.VUE_APP_PUBLICPATH,
  productionSourceMap: false,
  outputDir: "dist",

  chainWebpack: (config) => {
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
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
          "@": path.resolve(__dirname, "./src"),
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
        target: "http://192.168.6.107:18089",
        // target: "http://192.168.7.5:18080",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
