import request from '@/sheep/request';


export default {
	area: () => request({
		url: 'data/area',
		method: 'GET',
	})


};
