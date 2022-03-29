<template>
	<ui-layout class="withdraw-wrap">
		<ui-navbar :back="true" backtext="提现" opacity status="light"></ui-navbar>
		<view class="page-bg"></view>
		<view class="wallet-num-box ss-flex ss-col-center ss-row-between">
			<view class="">
				<view class="num-title">可提现金额（元）</view>
				<view class="wallet-num">{{ userInfo.commission }}</view>
			</view>
			<button class="ss-reset-button log-btn" @tap="sheep.$router.go('/pages/user/wallet/withdraw-log')">提现记录</button>
		</view>
		<!-- 提现输入卡片-->
		<view class="draw-card">
			<view class="card-title">提现金额</view>
			<view class="input-box ss-flex ss-col-center border-bottom">
				<view calss="unit">￥</view>
				<ui-input class="ss-flex-1 ss-p-l-10" v-model="state.amount" type="number" placeholder="请输入提现金额" />
			</view>
			<view class="bank-box ss-flex ss-col-center ss-row-between ss-m-b-30">
				<view class="name">提现至</view>
				<view class="bank-list ss-flex" @tap="accountTypeSelectRef.showModal()">
					<view v-if="!state.accountInfo.type" class="empty-text">请选择提现方式</view>
					<view v-if="state.accountInfo.type === 'wechat'" class="empty-text">微信零钱</view>
					<view v-if="state.accountInfo.type === 'alipay'" class="empty-text">支付宝账户</view>
					<view v-if="state.accountInfo.type === 'bank'" class="empty-text">银行卡转账</view>

					<text class="cicon-forward"></text>
				</view>
			</view>
			<view class="bind-box ss-flex ss-col-center ss-row-between" v-if="state.accountInfo.type">
				<view class="placeholder-text" v-if="state.accountInfo.account_name">{{ state.accountInfo.account_header }}|{{ state.accountInfo.account_name }}</view>
				<view class="placeholder-text" v-else>暂无提现账户</view>
				<button class="add-btn ss-reset-button" @tap="onAccountInfo">{{ state.accountInfo.account_name ? '修改' : '添加' }}</button>
			</view>
			<button class="ss-reset-button save-btn ui-BG-Main-Gradient ui-Shadow-Main" @tap="onConfirm">确认提现</button>
		</view>

		<!-- 提现说明 -->
		<view class="draw-notice">
			<view class="title">提现说明</view>
			<view class="draw-list">1.单次最低提现 1 元，最高提现 1 元；</view>
			<view class="draw-list">2.每日最多可提现次数: 不限；每日最多提现金额(元):不限；</view>
			<view class="draw-list">3.每笔收取提现手续费 1%；</view>
			<view class="draw-list">4.提现结果请查收对应渠道服务通知；</view>
			<view class="draw-list">5.如有疑问请及时联系客服。</view>
		</view>

		<!-- 选择提现账户 -->
		<account-type-select ref="accountTypeSelectRef" v-model="state.accountInfo" />
		<!-- 编辑账户信息 -->
		<account-info-modal v-if="state.accountInfo.type" v-model="state.accountInfo" ref="accountInfoModalRef" />
	</ui-layout>
</template>

<script setup>
import { computed, watch, ref, reactive, watchPostEffect, onBeforeMount, unref, onMounted, nextTick } from 'vue';
import { sheep } from '@/sheep';
import store from '@/sheep/store';
import accountTypeSelect from './components/account-type-select.vue';
import accountInfoModal from './components/account-info-modal.vue';

const accountTypeSelectRef = ref(null);
const accountInfoModalRef = ref(null);
const userInfo = computed(() => store.getters.userInfo);
const state = reactive({
	amount: '',
	type: '',
	accountInfo: {}
});

const onAccountInfo = () => {
	unref(accountInfoModalRef).showModal();
};

const onConfirm = () => {
	let data = {
		amount: state.amount,
		type: state.type,
		...state.accountInfo
	};
	if (state.amount > userInfo.value.commission || state.amount <= 0) {
		sheep.$tools.toast('请输入正确的提现金额');
		return;
	}
	sheep.$apis.user.wallet.withdraw(data);
};
onBeforeMount(async () => {
	// getWalletAccountInfo();
});
</script>

<style lang="scss" scoped>
.page-bg {
	width: 150%;
	background-color: var(--ui-BG-Main);
	height: 390rpx;
	border-radius: 0 0 280rpx 280rpx;
	overflow: hidden;
	position: fixed;
	top: 0;
	left: 50%;
	transform: translateX(-50%);
	pointer-events: none;

	&::after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		z-index: 1;
		position: absolute;
		top: 0;
		left: 0;
		background: v-bind("sheep.$url.cssUrl('/static/images/user/withdraw_bg.png')") no-repeat;
		background-position: center;
		background-size: 750rpx 100%;
		pointer-events: none;
	}
}

.wallet-num-box {
	padding: 20rpx 40rpx 0;
	position: relative;
	z-index: 3;

	.num-title {
		font-size: 26rpx;
		font-weight: 500;
		color: $white;
		margin-bottom: 20rpx;
	}

	.wallet-num {
		font-size: 60rpx;
		font-weight: 500;
		color: $white;
	}

	.log-btn {
		width: 170rpx;
		height: 60rpx;
		line-height: 60rpx;
		border: 1rpx solid $white;
		border-radius: 30rpx;
		padding: 0;
		font-size: 26rpx;
		font-weight: 500;
		color: $white;
	}
}

// 提现输入卡片
.draw-card {
	background-color: $white;
	border-radius: 20rpx;
	width: 690rpx;
	min-height: 530rpx;
	margin: 30rpx auto 0;
	padding: 30rpx;
	position: relative;
	z-index: 4;

	.card-title {
		font-size: 30rpx;
		font-weight: 500;
		margin-bottom: 30rpx;
	}

	.bank-box {
		.name {
			font-size: 28rpx;
			font-weight: 500;
		}

		.bank-list {
			.empty-text {
				font-size: 28rpx;
				font-weight: 400;
				color: $dark-9;
			}

			.cicon-forward {
				color: $dark-9;
			}
		}
	}

	.bind-box {
		.placeholder-text {
			font-size: 26rpx;
			color: $dark-9;
		}

		.add-btn {
			width: 100rpx;
			height: 50rpx;
			border-radius: 25rpx;
			line-height: 50rpx;
			font-size: 22rpx;
			color: var(--ui-BG-Main);
			background-color: var(--ui-BG-Main-light);
		}
	}

	.input-box {
		width: 624rpx;
		height: 100rpx;
		margin-bottom: 40rpx;

		.unit {
			font-size: 48rpx;
			color: #333;
		}
	}

	.save-btn {
		width: 616rpx;
		height: 86rpx;
		line-height: 86rpx;
		border-radius: 40rpx;
		margin-top: 80rpx;
	}
}

// 提现说明
.draw-notice {
	width: 684rpx;
	min-height: 327rpx;
	background: $white;
	border-radius: 20rpx;
	padding: 30rpx 35rpx;
	margin: 20rpx auto;

	.title {
		font-size: 30rpx;
		font-weight: 500;
		color: $dark-3;
		margin-bottom: 30rpx;
	}
	.draw-list {
		font-size: 24rpx;
		font-weight: 400;
		color: $dark-9;
		margin-bottom: 10rpx;
	}
}
</style>
