import request from '@/sheep/request';


export default {
	calc: (data) => request({
		url: 'order/order/calc',
		method: 'POST',
		data
	}),
	create: (data) => request({
		url: 'order/order/create',
		method: 'POST',
		data
	}),
	list: (params) => request({
		url: 'order/order',
		method: 'GET',
		params
	}),
};
