/*
 * @Author: your name
 * @Date: 2021-03-11 13:36:48
 * @LastEditTime: 2021-03-17 10:29:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/main.js
 */
import Vue from 'vue';
import router from './router';
import App from './App';
import Http from '@/util/http';
import '@/util/scalePage';
import '@/assets/styles/index.less';
import '@/assets/iconfont/iconfont.js';


Vue.use(Http);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');