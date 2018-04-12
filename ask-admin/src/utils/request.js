import axios from 'axios';
import { Message } from 'element-ui';
import Cookies from 'js-cookie';

const service = axios.create({
    baseURL: 'http://ask-admin.tianchenyong.top/ask_youngon',
    headers: { 'Access-Control-Allow-Origin': '*' },
    timeout: 15000
});

service.interceptors.request.use(config => {
    if (Cookies.get('token')) {
        config.headers['token'] = Cookies.get('token');
    }
    return config;
}, error => {
    console.log(error);
    Promise.reject(error);
});

service.interceptors.response.use(
  response => {
      const res = response.data;
      if (res.code !== 20000) {
          Message({
              message: res.mes || 'error',
              type: 'error',
              duration: 5 * 1000
          });
          return Promise.reject('error');
      } else {
          return response;
      }
  },
  error => {
      console.log('err' + error);
      Message({
          message: error.message,
          type: 'error',
          duration: 5 * 1000
      });
      return Promise.reject(error);
  }
);

export default service;
