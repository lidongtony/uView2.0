import request from '@/sheep/request';


export default {
	// 系统初始化
	init: (platform) => request({
		url: 'init',
		params: {
			platform
		}
	}),

	pageSync: (pages) => request({
		url: 'pageSync',
		method: 'POST',
		data: {
			pages
		},
		custom: {
			showErrorMessage: false,
			showLoading: false
		}

	})

};
