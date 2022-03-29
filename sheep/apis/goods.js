import request from '@/sheep/request';


export default {
	// 商品详情
	detail: (id) => request({
		url: 'goods/goods/' + id,
		method: 'GET',
		custom: {
			// TODO: 自定义返回成功消息内容
			showLoading: true,
			showSuccessText: '添加成功'
		}
	}),
	// 账号登录
	accountLogin: (data) => request({
		url: '/common/user/accountLogin',
		method: 'POST',
		data,
		custom: {
			showSuccessMessage: true,
			loadingText: '登录中'
		}
	}),
	// 短信登录
	smsLogin: (data) => request({
		url: '/common/user/smsLogin',
		method: 'POST',
		data,
		custom: {
			showSuccessMessage: true,
			loadingText: '登录中'
		}
	}),
	// 短信注册
	smsRegister: (data) => request({
		url: '/common/user/smsRegister',
		method: 'POST',
		data,
		custom: {
			showSuccessMessage: true,
			loadingText: '正在注册'
		}
	}),
	// 重置密码
	resetPassword: (data) => request({
		url: '/common/user/resetPassword',
		method: 'POST',
		data,
		custom: {
			showSuccessMessage: true,
			loadingText: '验证中'
		}
	}),

	// 修改密码
	changePassword: (data) => request({
		url: '/common/user/changePassword',
		method: 'POST',
		data,
		custom: {
			showSuccessMessage: true,
			loadingText: '验证中'
		}
	}),

	// 绑定、更换手机号
	changeMobile: (data) => request({
		url: '/common/user/changeMobile',
		method: 'POST',
		data,
		custom: {
			showSuccessMessage: true,
			loadingText: '验证中'
		}
	}),

	// 修改用户名
	setUsername: (data) => request({
		url: '/common/user/changeUsername',
		method: 'POST',
		data,
		custom: {
			showSuccessMessage: true,
			loadingText: '验证中'
		}
	}),
};
