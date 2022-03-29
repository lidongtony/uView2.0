import user from '@/sheep/apis/user';
// import share from '@/sheep/platform/share';
export default {
	state: () => ({
		// 应用信息
		isLogin: uni.getStorageSync('token') ? true : false, // 登录状态
		authType: '', // 授权弹框 accountLogin|smsLogin|smsRegister|resetPassword|changeMobile|changePassword|setUsername
		userInfo: {}, // 用户信息
		shareInfo: {} // 用户分享信息
	}),
	getters: {
		isLogin: state => state.isLogin,
		authType: state => state.authType,
		userInfo: state => state.userInfo,
		shareInfo: state => state.shareInfo
	},
	mutations: {
		setAuthType(state, type) {
			state.authType = type;
		},
		setUserInfo(state, payload) {
			state.userInfo = payload;
		},
		setShareInfo(state, payload) {
			state.shareInfo = payload;
		},
		setToken(state, token = '') {
			if (token === '') {
				uni.removeStorageSync('token');
				state.isLogin = false;
			} else {
				state.isLogin = true;
				uni.setStorageSync('token', token);
			}
			// 登录/登出重置分享参数
			// share.setShareInfo();
		}
	},

	actions: {
		// 获取个人信息
		async getUserInfo({
			commit,
			getters
		}) {
			const {
				data
			} = await user.profile();
			commit('setUserInfo', data);
			console.log(getters.userInfo, 'userInfo');
		},

		// 打开用户授权弹框

		showAuthModal({
			commit
		}, type = 'accountLogin') {
			commit('setAuthType', type);
		},

		// 关闭登录弹窗
		closeAuthModal({
			commit
		}) {
			console.log('close');
			commit('setAuthType', '');
		},

		// 退出登录
		logout({
			commit
		}) {
			commit('setUserInfo', null);
			commit('setToken');
		}

	}
};
