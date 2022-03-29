import request from '@/sheep/request';


export default {
	append: (data) => request({
		url: 'cart',
		method: 'POST',
		custom: {
			showSuccessMessage: true
		},
		data: {
			...data,
			type: 'inc',
		}
	}),
	reduce: (data) => request({
		url: 'cart',
		method: 'POST',
		custom: {
			showSuccessMessage: true
		},
		data: {
			...data,
			type: 'dec',
		}
	}),
	update: (data) => request({
		url: 'cart',
		method: 'POST',
		custom: {
			showSuccessMessage: true
		},
		data: {
			...data,
			type: 'cover',
		}
	}),


};
