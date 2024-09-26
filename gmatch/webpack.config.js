const { createWebpackConfigAsync } = require('expo-yarn-workspaces/webpack');
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = async function(env, argv) {
  const config = await createWebpackConfigAsync(env, argv);

  // 添加代理设置
  config.devServer = {
    ...config.devServer,
    proxy: {
      '/api': {
        target: 'https://gmreguserfa.azurewebsites.net', // 后端 API 的基础 URL
        changeOrigin: true, // 更改请求头中的 origin
        pathRewrite: { '^/api': '' }, // 将/api前缀重写为根
      },
    },
  };

  return config;
};
