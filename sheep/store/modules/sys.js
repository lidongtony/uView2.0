export default {
	state: () => ({
		sys_theme: 'light', // light dark
		sys_main: uni.getStorageSync('sys_main') || 'blue', // color
		sys_text: 1,
		sys_info: uni.getSystemInfoSync() || {},
		sys_statusBar: uni.getSystemInfoSync().statusBarHeight || '',

		isTheme: false, // 是否开启多主题（true:会读缓存，能设置对应的主题)
		themeAuto: false, // 跟随系统
		theme: 'light', // 设置默认主题
		main: 'blue', // 设置默认强调色
		text: 1, // 设置默认字号等级(0-4)
		homePath: '/pages/index/index', // 设置首页路径(一些组件会用到跳回主页，请每个项目设置好！)
	}),
	getters: {
		getCustomTheme: state => state.theme,
		getCustomMain: state => state.main,
		getCustomText: state => state.text,
		getNav: state => state.nav,
		getDomain: state => state.domain,
		getApiPath: state => state.apiPath,
		sys_homePath: state => state.homePath,
		sys_info: state => state.sys_info,
		sys_platform: state => state.sys_info.platform.toLowerCase(),
		sys_statusBar: state => state.sys_statusBar,
		sys_theme: state => state.sys_theme,
		sys_main: state => state.sys_main,
		sys_text: state => state.sys_text,
		sys_capsule:()=> {
			// #ifdef MP
			// #ifndef MP-ALIPAY
			let capsule = uni.getMenuButtonBoundingClientRect();
			if (!capsule) {
				console.log('getMenuButtonBoundingClientRect error');
				capsule = {
					bottom: 56,
					height: 32,
					left: 278,
					right: 365,
					top: 24,
					width: 87
				};
			}
			return capsule;
			// #endif
			// #endif

			// #ifndef MP
			return {
				bottom: 56,
				height: 32,
				left: 278,
				right: 365,
				top: 24,
				width: 87
			};
			// #endif
		},
		sys_navBar:()=>{
			// #ifndef MP
			return uni.getSystemInfoSync().statusBarHeight + 50;
			// #endif

			// #ifdef MP
			// #ifndef MP-ALIPAY
			let capsule = uni.getMenuButtonBoundingClientRect();
			if (!capsule) {
				console.log('getMenuButtonBoundingClientRect error');
				capsule = {
					bottom: 56,
					height: 32,
					left: 278,
					right: 365,
					top: 24,
					width: 87
				};
			}
			return capsule.bottom + capsule.top - uni.getSystemInfoSync().statusBarHeight;
			// #endif
			// #endif

			// #ifdef MP-ALIPAY
			return uni.getSystemInfoSync().statusBarHeight + uni.getSystemInfoSync().titleBarHeight;
			// #endif
		}
	},
	mutations: {
		//设置主题-搁置
		setTheme(state, data) {
			uni.setStorageSync('sys_theme', data);
			state.sys_theme = data;
			// #ifdef H5
			document.getElementsByTagName('html')[0].className =
				`theme-${state.sys_theme} main-${state.sys_main}`;
			// #endif

			if (data == 'auto') {
				// #ifdef MP
				this.commit('setStatusStyle', uni.getSystemInfoSync().theme == 'light' ? 'dark' : 'light');
				// #endif
			} else {
				this.commit('setStatusStyle', data == 'light' ? 'dark' : 'light');
			}
		},
		setText(state, data) {
			uni.setStorageSync('sys_text', data);
			state.sys_text = data;
		},
		setStatusStyle(state, status) {
			// console.log('theme=>',uni.getSystemInfoSync().theme,'status=>',status);
			// #ifdef H5
			return false
			// #endif 
			if (status == 'light') {
				// #ifndef MP-ALIPAY
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#000000',
					animation: {
						duration: 200,
						timingFunc: 'easeIn'
					}
				});
				// #endif

				// #ifdef APP-PLUS
				plus.navigator.setStatusBarStyle('light');
				// #endif

				// #ifdef MP-ALIPAY
				uni.setNavigationBarColor({
					frontColor: '#ffffff',
					backgroundColor: '#000000'
				});
				// #endif
			} else {
				// #ifndef MP-ALIPAY
				uni.setNavigationBarColor({
					frontColor: '#000000',
					backgroundColor: '#ffffff',
					animation: {
						duration: 200,
						timingFunc: 'easeIn'
					}
				});
				// #endif

				// #ifdef APP-PLUS
				plus.navigator.setStatusBarStyle('dark');
				// #endif

				// #ifdef MP-ALIPAY
				uni.setNavigationBarColor({
					frontColor: '#000000'
					backgroundColor: '#ffffff'
				});
				// #endif
			}
		},
		//设置主颜色
		setMain(state, data) {
			uni.setStorageSync('sys_main', data);
			state.sys_main = data;
			// #ifdef H5
			document.getElementsByTagName('html')[0].className =
				`theme-${state.sys_theme} main-${state.sys_main}`;
			// #endif
		},

		// 初始化theme
		initTheme() {
			/*分析主题*/
			// let theme = uni.getStorageSync("sys_theme");
			let main = uni.getStorageSync("sys_main");
			// let text = uni.getStorageSync("sys_text");
			// theme = !theme ? this.getters.getCustomTheme : theme;
			main = !main ? this.getters.getCustomMain : main;
			// text = !text ? this.getters.getCustomText : text;
			// this.commit('setTheme', theme);
			this.commit('setMain', main);
			// this.commit('setText', text);
		}

	},
	actions: {},
}
