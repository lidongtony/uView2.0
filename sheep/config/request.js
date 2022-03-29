// 开发环境配置
const DEV = {
	BASE_URL: 'https://demo.sheepadmin.net',
	API_PATH: '/shop/api/'
}
// 生产环境
const PROD = {
	BASE_URL: '',
	API_PATH: '/shop/api/'
}
let config = null;
if (process.env.NODE_ENV === 'development') {
	config = DEV
} else {
	config = PROD
}
export default config;
