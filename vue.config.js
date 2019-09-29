const CompressionPlugin = require("compression-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const publicPath = "/";
const proxyTarget = 'http://106.54.115.166:5000/'

module.exports = {
  publicPath, // 部署环境的url,环境改变需要修改
  lintOnSave: true,
  devServer: {
    proxy: {
      "/api": {
        target: proxyTarget
      }
    }
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      //  启用GZip压缩
      config
        .plugin("compression")
        .use(CompressionPlugin, {
          asset: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        })
        .tap(args => {});
    }

    // use cdn start
    const externals = {
      vue: "Vue",
      axios: "axios",
      "vue-router": "VueRouter",
      vuex: "Vuex",
      // dayjs: "dayjs",
      
    };

    config.externals(externals);
    const cdn = {
      css: [

      ],
      js: [
        // '//unpkg.com/dayjs@1.8.14/dayjs.min.js',
        '//unpkg.com/vue@2.6.6/dist/vue.min.js',
        '//unpkg.com/vue-router@3.0.2/dist/vue-router.min.js',
        '//unpkg.com/vuex@3.1.0/dist/vuex.min.js',
        '//unpkg.com/axios@0.18.0/dist/axios.min.js'
      ]
    };
    config.plugin("html").tap(args => {
      args[0].cdn = cdn;
      return args;
    });
    // use cdn end

    config.resolve.symlinks(true);
    config.when(process.env.NODE_ENV === "development", config =>
      config.devtool("cheap-source-map")
    );
  },
  configureWebpack: {
    plugins: process.env.NODE_ENV === "production" ? [
      new BundleAnalyzerPlugin()
    ] : []
  },
  productionSourceMap: process.env.NODE_ENV !== "production" // 打包时不生成.map文件
};