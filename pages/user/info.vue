<template>
	<ui-layout navTitle="编辑资料" class="set-userinfo-wrap">
		<ui-form ref="setUserInfoRef" ui="" :model="state.model" :rules="state.rules" labelPosition="left"
			:labelStyle="{ fontWeight: '500', fontSize: '26rpx' }" placeholderStyle="color:#BBBBBB;fontSize:26rpx">
			<view class="header-box ss-flex ss-row-center ss-col-center ss-p-t-60 ss-p-b-0 bg-white">
				<ui-upload>
					<view class="avatar-wrap">
						<image class="avatar-img" :src="state.model.avatar" mode="aspectFit"></image>
						<view class="avatar-action">修改</view>
					</view>
				</ui-upload>
			</view>

			<ui-form-item prop="username" title="用户名" ui="bg-white" @tap="onSetUsername">
				<ui-input disabled placeholder="设置用户名" v-model="state.model.username"></ui-input>
				<template #action>
					<ui-radio v-if="state.verification?.username" disabled ui="check" :modelValue="true"></ui-radio>
					<button v-else class="ss-reset-button"><text class="_icon-forward"
							style="color: #BBBBBB;font-size: 26rpx;"></text></button>
				</template>
			</ui-form-item>

			<ui-form-item prop="nickname" title="昵称" ui="bg-white">
				<ui-input placeholder="设置昵称" v-model="state.model.nickname"></ui-input>
			</ui-form-item>

			<ui-form-item prop="sex" title="性别" ui="bg-white">
				<ui-radio v-for="(item, index) in state.sexRadioList" :key="index" ui="check" :label="item.name"
					:modelValue="state.model.sex === item.value"></ui-radio>
			</ui-form-item>

			<ui-form-item prop="mobile" title="手机号" ui="bg-white" @tap="onChangeMobile">
				<ui-input disabled placeholder="请绑定手机号" v-model="state.model.mobile"></ui-input>
				<template #action>
					<view class="ss-flex ss-col-center">
						<ui-radio v-if="state.verification?.mobile" disabled ui="check" :modelValue="true"></ui-radio>

						<button class="ss-reset-button ss-flex ss-col-center ss-row-center"><text class="_icon-forward"
								style="color: #BBBBBB;font-size: 26rpx;"></text></button>
					</view>
				</template>
			</ui-form-item>

			<ui-form-item prop="password" title="登录密码" ui="bg-white" @tap="onChangePassword">
				<ui-input disabled placeholder="设置登录密码" v-model="state.model.password"></ui-input>
				<template #action>
					<view class="ss-flex ss-col-center">
						<ui-radio v-if="state.verification?.password" disabled ui="check" :modelValue="true"></ui-radio>
						<button class="ss-reset-button ss-flex ss-col-center ss-row-center"><text class="_icon-forward"
								style="color: #BBBBBB;font-size: 26rpx;"></text></button>
					</view>
				</template>
			</ui-form-item>

			<view class="ss-m-t-14">
				<ui-form-item title="地址管理" ui="bg-white" :borderBottom="true" @tap="sheep.$router.go('/pages/user/address/list')">
					<template #action>
						<button class="ss-reset-button"><text class="_icon-forward"
								style="color: #BBBBBB;font-size: 26rpx;"></text></button>
					</template>
				</ui-form-item>
				<ui-form-item title="发票管理" ui="bg-white" :borderBottom="false" @tap="sheep.$router.go('/pages/user/invoice/list')">
					<template #action>
						<button class="ss-reset-button"><text class="_icon-forward"
								style="color: #BBBBBB;font-size: 26rpx;"></text></button>
					</template>
				</ui-form-item>
			</view>
		</ui-form>

		<ui-cell-item :hasBorderBottom="false" title="第三方账号绑定" hover-class="" bg=""
			:titleStyle="{ fontSize: '24rpx', color: '#666' }" :hasArrow="false"></ui-cell-item>

		<!-- #ifdef MP-WEIXIN  -->
		<view class="account-list ss-flex ss-row-between">
			<view class="ss-flex ss-col-center">
				<image class="list-img" src="/static/images/tabbar/category2.png" mode=""></image>
				<text class="list-name">微信小程序</text>
			</view>
			<view class="ss-flex ss-col-center">
				<view class="info ss-flex ss-col-center">
					<open-data class="avatar ss-m-r-20" type="userAvatarUrl"></open-data>
					<open-data class="name" type="userNickName"></open-data>
				</view>
				<view class="bind-box ss-m-l-20">
					<!-- 	<button class="ss-reset-button bind-btn" @tap="bindThirdOauth('wxMiniProgram', 'Wechat')">
						绑定
					</button> -->
					<button class="ss-reset-button relieve-btn">解绑</button>
				</view>
			</view>
		</view>
		<!-- #endif  -->

		<button class="ss-rest-button logout-btn" @tap="onLogout">退出登录</button>
	</ui-layout>
</template>

<script setup>
	import {
		computed,
		watch,
		ref,
		reactive,
		watchPostEffect,
		onBeforeMount,
		unref,
		onMounted,
		nextTick
	} from "vue";
	import {
		mobile,
		password,
		username
	} from "@/sheep/common/validate/form";
	import {
		sheep
	} from "@/sheep";

	import {
		useStore
	} from "vuex";
	const store = useStore();

	const setUserInfoRef = ref(null);

	const state = reactive({
		verification: {},
		sexRadioList: [{
				name: "男",
				value: 1
			},
			{
				name: "女",
				value: 0
			},
			{
				name: "未知",
				value: 2,
				checked: true
			}
		],
		model: {
			avatar: "",
			mobile: "", // 手机号
			password: "", // 密码
			username: "", //用户名
			nickname: "", //昵称
			sex: 2
		},
		rules: {}
	});

	// 修改用户名
	const onSetUsername = () => {
		!state.verification?.username && store.dispatch("showAuthModal", "setUsername");
	};

	// 修改手机号
	const onChangeMobile = () => {
		store.dispatch("showAuthModal", "changeMobile");
	};

	// 修改密码
	const onChangePassword = () => {
		store.dispatch("showAuthModal", "resetPassword");
	};

	const onLogout = () => {
		store.dispatch("logout");
		console.log(sheep.$router);
		sheep.$router.back();
	};

	const getUserInfo = async () => {
		const {
			data
		} = await sheep.$apis.user.profile();
		state.verification = data.verification;
		state.model.sex = data.sex;
		state.model.avatar = data.avatar;
		state.model.mobile = data.mobile;
		state.model.nickname = data.nickname;
		state.model.username = data.username;
	};

	onBeforeMount(async () => {
		await getUserInfo();
	});
</script>

<style lang="scss" scoped>
	:deep(.disabled) {
		opacity: 1;
	}

	.logout-btn {
		margin: 60rpx auto 60rpx;
		width: 710rpx;
		height: 80rpx;
		background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
		border-radius: 40rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: $white;
	}

	.radio-dark {
		filter: grayscale(100%);
		filter: gray;
		opacity: 0.4;
	}

	.relieve-btn {
		border-radius: 20rpx;
		padding: 0 20rpx;
		line-height: 60rpx;
		background: rgba(var(--ui-BG-Main), 0.05);
		color: var(--ui-BG-Main);
	}

	// 头像
	.avatar-wrap {
		width: 160rpx;
		height: 160rpx;
		background: $gray-d;
		border: 1px solid $gray-f;
		border-radius: 50%;
		position: relative;
		overflow: hidden;

		// TODO
		:deep(.disabled) {
			opacity: 1;
		}

		.avatar-img {
			width: 100%;
			height: 100%;
		}

		.avatar-action {
			position: absolute;
			bottom: 0;
			left: 0;
			height: 46rpx;
			width: 100%;
			background: rgba($black, 0.3);
			color: $white;
			text-align: center;
			line-height: 46rpx;
			font-size: 11px;
		}
	}

	// 绑定项
	.account-list {
		background-color: $white;
		height: 100rpx;
		padding: 0 20rpx;

		.list-img {
			width: 40rpx;
			height: 40rpx;
			margin-right: 10rpx;
		}

		.list-name {
			font-size: 28rpx;
		}

		.info {
			.avatar {
				width: 38rpx;
				height: 38rpx;
				border-radius: 50%;
				overflow: hidden;
			}

			.name {
				font-size: 28rpx;
				font-weight: 400;
				color: $dark-9;
			}
		}

		.bind-box {
			.bind-btn {
				padding: 0 20rpx;
				line-height: 60rpx;
				background: $gray-f;
				border-radius: 20rpx;
				color: $dark-9;
			}
		}
	}
</style>
