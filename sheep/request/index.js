/**
 * sheep-shop-request
 * @description api独立管理，loading配置，请求拦截，错误处理
 */

import Request from '@/uni_modules/sheep/libs/luch-request/core/Request';
import config from '@/sheep/config/request';
import store from "@/sheep/store";

// 设置请求基础配置
const BASE_URL = config.BASE_URL;

const API_PATH = config.API_PATH;

const options = {
	// 显示操作成功消息 默认不显示
	showSuccessMessage: false,
	// 显示失败消息 默认显示
	showErrorMessage: true,
	// 显示请求Loading状态 默认不显示
	showLoading: true,
	loadingText: '加载中'
	// ...
};

// Loading全局实例
let LoadingInstance = {
	target: null,
	count: 0
};

/**
 * 关闭loading
 */
function closeLoading() {
	if (LoadingInstance.count > 0) LoadingInstance.count--
	if (LoadingInstance.count === 0) uni.hideLoading()
}

/**
 * @description 请求基础配置 可直接使用访问自定义请求
 */
const http = new Request({
	baseURL: BASE_URL,
	timeout: 8000,
	method: "GET",
	header: {
		"Accept": "text/json",
		"Content-Type": "application/json;charset=UTF-8",
	},
	// #ifdef APP-PLUS
	sslVerify: false,
	// #endif
	// #ifdef H5
	// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
	withCredentials: false,
	// #endif
	custom: options,
});

/**
 * @description 请求拦截器
 */
http.interceptors.request.use(
	(config) => {
		if (config.custom.showLoading) {
			LoadingInstance.count++;
			LoadingInstance.count === 1 && uni.showLoading({
				title: config.custom.loadingText,
				mask: true,
				fail: () => {
					uni.hideLoading()
				}
			})
		}
		const token = uni.getStorageSync('token');
		if (token) config.header["Authorization"] = token;
		return config;
	},
	(error) => {
		console.log(error, 'error')
		return Promise.reject(error);
	}
);

/**
 * @description 响应拦截器
 */
http.interceptors.response.use(
	(response) => {
		// 自动刷新令牌
		if (response.header.authorization) {
			store.commit('setToken', response.header.authorization)
		}
		if (response.header.Authorization) {
			store.commit('setToken', response.header.Authorization)
		}
		response.config.custom.showLoading && closeLoading();
		console.log(response, 'interceptors.response');
		if (response.data.error !== 0) {
			if (response.config.custom.showErrorMessage)
				uni.showToast({
					title: response.data.msg || '服务器开小差啦～,请稍后再试',
					icon: 'none',
					mask: true
				});
			return Promise.resolve(response.data);
		}
		if (response.data.error === 0 && response.data.msg !== '' && response.config.custom.showSuccessMessage) {
			uni.showToast({
				title: response.data.msg,
				icon: 'none'
			});
		}
		return Promise.resolve(response.data);
	}, (error) => {
		const isLogin = store.getters.isLogin;
		let errorMessage = "未知错误";
		if (error !== undefined) {
			switch (error.statusCode) {
				case 400:
					errorMessage = "请求错误";
					break;
				case 401:
					if (isLogin) {
						errorMessage = "您的登陆已过期";
						uni.removeStorageSync('token');
					} else {
						errorMessage = "请先登录";
					}
					store.dispatch('showAuthModal');
					break;
				case 403:
					errorMessage = "拒绝访问";
					break;
				case 404:
					errorMessage = "请求出错";
					break;
				case 408:
					errorMessage = "请求超时";
					break;
				case 429:
					errorMessage = "请求频繁, 请稍后再访问";
					break;
				case 500:
					errorMessage = "服务器开小差了,请稍后再试~";
					break;
				case 501:
					errorMessage = "服务未实现";
					break;
				case 502:
					errorMessage = "网络错误";
					break;
				case 503:
					errorMessage = "服务不可用";
					break;
				case 504:
					errorMessage = "网络超时";
					break;
				case 505:
					errorMessage = "HTTP版本不受支持";
					break;
			}
			if (error.errMsg.includes('timeout')) errorMessage = '请求超时';
			// #ifdef H5
			if (error.errMsg.includes('Network')) errorMessage = window.navigator.onLine ? '服务器异常' : '请检查您的网络连接';
			// #endif
		}
		if (error.config.custom.showErrorMessage) {
			uni.showToast({
				title: error.data.msg || errorMessage,
				icon: 'none',
				mask: true
			});
		}
		error.config.custom.showLoading && closeLoading();
		return false;
	}
);

const request = (config) => {
	if (config.url[0] !== '/') {
		config.url = API_PATH + config.url;
	}
	return http.middleware(config);
}

export default request;
