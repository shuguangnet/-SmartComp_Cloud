import { message } from 'ant-design-vue';
import axios from 'axios';
import store from '@/store';

// 创建axios实例
const http = axios.create({
  baseURL: 'http://127.0.0.1:8887',
	// 设置基础URL
});

// 请求拦截器
http.interceptors.request.use(config => {
  // 如果请求头中未携带authorization字段且store中存在token，则添加authorization字段
      //获取本地存储中的token,若有token则加到请求中去，token一般存储到本地或者vuex
			let token = localStorage.getItem("token");
			token && (config.headers.Authorization = token);
			// 同样添加'userToken'字段到请求头中
  		let userToken = localStorage.getItem('token');
  		userToken && (config.headers['userToken'] = userToken);
  return config;
});
//设置post请求的 Content-Type，需不需要写看后台规范
http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
// http.defaults.headers.post["Content-Type"] = window.localStorage.getItem("token");
// 响应拦截器
http.interceptors.response.use(
  // 响应成功时的处理
  ({ data }) => {
    const { code } = data;
    if (code == 200) return data;
    console.error(data);
    throw data;
  },
  // 响应错误时的处理
  error => {
    // 如果网络未连接，则显示网络未连接的消息
    if (!navigator.onLine) {
      message.error('网络未连接');
    }
    throw error; // 抛出错误
  }
);

export default http; // 导出axios实例
