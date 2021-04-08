/*
 * @Author: your name
 * @Date: 2021-03-12 10:25:08
 * @LastEditTime: 2021-03-12 11:10:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /data-security-portal/src/util/http.js
 */
import axios from 'axios';

const instance = axios.create({
  headers: {'Content-type': 'multipart/form-data'}
});

export default {
  install: (Vue) => {
    Vue.prototype.$http = instance;
  }
};

