import request from '@/sheep/request';


export default {
	// 系统初始化
	pre: (data) => request({
		url: 'pay/pre',
		method: 'POST',
		data,
		custom: {
			loadingText: '支付中'
		}
	}),

};
