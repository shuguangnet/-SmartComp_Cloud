const path = require('path'); // 导入 Node.js 中的 path 模块
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer'); // 导入 webpack-bundle-analyzer 插件
const resolve = dir => path.join(__dirname, '.', dir); // 定义一个函数用于解析路径

module.exports = {
	parallel:false,
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.delete('prefetch'); // 删除 webpack 配置中的 prefetch 插件，以便懒加载生效

    }
  }, // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/components': path.resolve(__dirname, 'src/components'), // 设置 @/components 别名
      },
    },
  },
  lintOnSave: false, // 关闭保存时的 eslint 检查

  devServer: {
    proxy: {
      '/api': { // 配置代理规则，将请求转发至 http://localhost:8880
        target: 'http://localhost:8887',
        changeOrigin: true, // 是否改变源地址
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': { // 配置全局样式资源加载器
      preProcessor: 'stylus', // 使用 stylus 预处理器
      patterns: [
        resolve('./src/style/mixins.styl'), // 导入全局混合文件
        resolve('./src/style/variables.styl'), // 导入全局变量文件
      ],
      injector: 'prepend', // 插入到文件的最前面
    },
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true, // 启用 Less 编译时的 JavaScript 支持
          modifyVars: { // 自定义 Less 变量
            '@primary-color': '#2f54eb', // 主题色
            '@success-color': '#36b777', // 成功状态颜色
            '@border-radius-base': '2px', // 边框圆角半径
          },
        },
      },
    },
  },
};
