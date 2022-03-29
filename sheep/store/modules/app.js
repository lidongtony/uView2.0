import app from '@/sheep/apis/app';

export default {
	state: () => ({
		// 应用信息
		name: '', //商城名字
		logo: '', //logo
		version: '', //版本号
		cdnurl: '', //云存储域名
		filesystem: '', //云存储平台
		// 应用模板
		basicData: {},
		homeTemplate: {},
		userTemplate: {},
		payment: [],
	}),
	getters: {
		// 应用信息
		appInfo: state => state,
		cdnurl: state => state.cdnurl,
		filesystem: state => state.filesystem,
		logo: state => state.logo,
		name: state => state.name,
		version: state => state.version,
		// 支付方式
		payment: state => state.payment,
		// 应用模板
		basicData: state => state.basicData,
		homeTemplate: state => state.homeTemplate,
		homeTemplateStyle: state => state.homeTemplate.style,
		homeTemplateLists: state => state.homeTemplate.data,
		userTemplate: state => state.userTemplate,
		userTemplateStyle: state => state.userTemplate.style,
		userTemplateLists: state => state.userTemplate.data,
		// 基础模块数据
		tabbarData: state => state.basicData.tabbar,
		tabbarList: state => {
			let list = []
			let tabbarList = state.basicData.tabbar?.lists
			tabbarList?.length && tabbarList.forEach((item, index) => {
				list.push({
					title: item.text,
					icon: item.image,
					curIcon: item.selectedImage,
					url: item.path,
					type: 'tab',
					center: tabbarList.length % 2 > 0 && state.basicData.tabbar.mode == 2 ? Math
						.ceil(
							tabbarList.length / 2) === index + 1 : false
				})
			})
			return list
		}

		// floatMenu: state => {
		// 	if(!state.basicData.floatMenu) return false
		// 	let list = []
		// 	floatMenuList?.length && floatMenuList.forEach((item, index) => {
		// 		list.push({
		// 			iconPath: item.image,
		// 			selectedIconPath: item.image,
		// 			text: item.text,
		// 			active: false,
		// 			path: item.path
		// 		})
		// 	})
		// 	state.floatMenu.lists = list
		// 	return state.floatMenu ?? []
		// },
		// popupImage: state => state.popupImage,
		// getPopupLists: state => state.popupImage?.lists ?? [],
		// getSplashScreen: state => state.splashScreen,
		// getGuide: state => state.guidePage,

	},
	mutations: {
		// 数据
		setApp(state, payload) {
			// 1. 设置应用基本信息
			state.name = payload.name
			state.logo = payload.logo
			state.version = payload.version
			state.cdnurl = payload.cdnurl
			state.filesystem = payload.filesystem


			// 4. 设置主题色
			//
		},
		setTemplate(state, payload) {

			// 1. 设置应用基础样式（欢迎页、主题、底部导航、弹窗广告、悬浮按钮）
			state.basicData = payload.basic

			// 2.设置页面模板信息
			state.homeTemplate = payload.home;
			state.userTemplate = payload.user;

			// 4. 设置主题色
			//
		},
		setPayment(state, payload) {
			state.payment = payload
		},

		//// 关闭弹窗广告, 修改popup
		setPopup(state, index) {
			let popupList = state.popupImage.lists;
			popupList.splice(index, 1)
			state.popupImage.lists = popupList;
		}

	},

	actions: {
		// 数据
		async appInit({
			commit,
			dispatch,
			getters
		}, platform) {
			const {
				data
			} = await app.init(platform);
			commit('setApp', data.app)
			commit('setTemplate', data.template)
			commit('setPayment', data.payment)
			commit('setMain', data.template.basic.theme)
			return data
		}

	}
}
