import request from '@/sheep/request';


export default {
	// 系统初始化
	send: (mobile, event) => request({
		url: '/common/sms/send',
		method: 'POST',
		data: {
			mobile,
			event
		}
	}),

};
