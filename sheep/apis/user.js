import request from '@/sheep/request';


export default {
	profile: () => request({
		url: '/common/user/profile',
		method: 'GET',
		custom: {
			showLoading: false
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
	address: {
		default: () => request({
			url: 'user/address/default',
			method: 'GET',
			custom: {
				showErrorMessage: false
			}
		}),
		list: () => request({
			url: 'user/address',
			method: 'GET',
			custom: {}
		}),
		create: (data) => request({
			url: 'user/address',
			method: 'POST',
			data,
			custom: {
				showSuccessMessage: true
			}
		}),
		update: (id, data) => request({
			url: 'user/address/' + id,
			method: 'PUT',
			data,
			custom: {
				showSuccessMessage: true
			}
		}),
		detail: (id) => request({
			url: 'user/address/' + id,
			method: 'GET',
		}),
		delete: (id) => request({
			url: 'user/address/' + id,
			method: 'DELETE',
		}),
	},
	invoice: {
		list: () => request({
			url: 'user/invoice',
			method: 'GET',
			custom: {}
		}),
		create: (data) => request({
			url: 'user/invoice',
			method: 'POST',
			data,
			custom: {
				showSuccessMessage: true
			}
		}),
		update: (id, data) => request({
			url: 'user/invoice/' + id,
			method: 'PUT',
			data,
			custom: {
				showSuccessMessage: true
			}
		}),
		detail: (id) => request({
			url: 'user/invoice/' + id,
			method: 'GET',
		}),
		delete: (id) => request({
			url: 'user/invoice/' + id,
			method: 'DELETE',
		}),
	},
	favorite: {
		list: () => request({
			url: 'user/userGoodsLog/favorite',
			method: 'GET',
			custom: {}
		}),
		add: (id) => request({
			url: 'user/userGoodsLog/favorite',
			method: 'POST',
			data: {
				goods_id: id
			},
			custom: {
				showSuccessMessage: true
			}
		})
	},
	view: {
		list: () => request({
			url: 'user/userGoodsLog/views',
			method: 'GET',
			custom: {}
		}),
		delete: (data) => request({
			url: 'user/userGoodsLog/viewDel',
			method: 'DELETE',
			data,
			custom: {
				showSuccessMessage: true
			}
		})
	},
	wallet: {
		log: (params) => request({
			url: 'user/walletLog',
			method: 'GET',
			params,
			custom: {}
		}),
		account: {
			info: (params) => request({
				url: 'user/walletAccount',
				method: 'GET',
				params,
				custom: {
					showErrorMessage: false
				}
			}),
			save: (data) => request({
				url: 'user/walletAccount',
				method: 'POST',
				data,
				custom: {
					showSuccessMessage: true
				}
			}),
		}
	}
};
