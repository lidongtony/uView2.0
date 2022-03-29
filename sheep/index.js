import request from '@/sheep/request';
import apis from '@/sheep/apis';
import store, {
	setupStore
} from '@/sheep/store';
const sheep = {
	$request: request,
	$apis: apis,
	$store: store
}
// 加载sheep-shop底层依赖
export async function setupSheep(app) {
	// 使用自定义底部导航
	uni.hideTabBar();
	// if (process.env.NODE_ENV === 'development') {
	// 	sheepDebug();
	// }
	// // 设置平台与设备信息
	// sheep.$platform.load();
	// // 加载vuex
	setupStore(app);
	// // 加载路由
	// setupRouter(app);
	// setupMixins(app);
	// // 加载主题 TODO: 此处是否应该由后端初始化接口返回后才开始设置
	// store.commit('initTheme');
	// // 应用初始化
	store.dispatch('appInit');
	// // 已登陆获取用户信息
	// if (store.getters.isLogin) {
	// 	await store.dispatch('getUserInfo');
	// }
	// // 设置全局分享参数
	// sheep.$platform.share.setShareInfo();
}
export default sheep;
