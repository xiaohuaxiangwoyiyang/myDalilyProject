/*
 * @Author: your name
 * @Date: 2020-10-15 16:00:59
 * @LastEditTime: 2021-03-11 15:25:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-governance/vue.config.js
 */
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  productionSourceMap: false,
  publicPath: '/',
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, '/src'),
        'Views': path.join(__dirname, '/src/views/'),
        'Public': path.join(__dirname, '/public')
      }
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            compress: {
              pure_funcs: ['console.log'] //忽略console.log语句
            }
          }
        })
      ],
    },
  },
  chainWebpack: (config) => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'AiGuard数据安全解决方案';
        return args;
      });
  },
  css: {
    extract: process.env.NODE_ENV === 'production',
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true
        }
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    historyApiFallback: true,
  }
};
