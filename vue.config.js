const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

module.exports = {
  configureWebpack: (config) => {
    config.plugins.push(
      ...[
        AutoImport({
          resolvers: [ElementPlusResolver()],
        }),
        Components({
          resolvers: [ElementPlusResolver()],
        }),
      ]
    );
  },
  chainWebpack: (config) => {
    config.resolve.alias.set("vue-i18n", "vue-i18n/dist/vue-i18n.cjs.js");
  },
  css: {
    loaderOptions: {
      sass: {
        // 8版本用prependData:
        prependData: `
          @import "@/styles/variables.scss";  // scss文件地址
          @import "@/styles/mixin.scss";     // scss文件地址
        `,
      },
    },
  },
  // devServer: { //跨域代码
  //   https:false,
  //   hotOnly:false,
  //   proxy: {
  //       '/api': {     //这里最好有一个 /
  //           target: 'http://lianghj.top:8888/api/private/v1/',  // 后台接口域名
  //           ws: false,        //如果要代理 websockets，配置这个参数
  //           secure: false,  // 如果是https接口，需要配置这个参数
  //           changeOrigin: true,  //是否跨域
  //           pathRewrite:{
  //               '^/api':''
  //           }
  //       }
  //   }
  // }
};
