/*
 * @Author: your name
 * @Date: 2021-03-11 13:47:31
 * @LastEditTime: 2021-03-11 14:01:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/router.js
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({  
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/views/portal/index'),
    }
  ]
});

export default router;
