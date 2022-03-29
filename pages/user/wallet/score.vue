<template>
	<ui-layout class="wallet-wrap" navTitle="钱包">
		<!-- 钱包卡片 -->
		<view class="header-box ss-flex ss-row-center ss-col-center ">
			<view class="card-box ui-BG-Main ui-Shadow-Main">
				<view class="card-head ss-flex ss-col-center">
					<view class="card-title ss-m-r-10">钱包余额（元）</view>
					<view @tap="state.showMoney = !state.showMoney" class="ss-eye-icon" :class="state.showMoney ? 'cicon-eye' : 'cicon-eye-off'"></view>
				</view>
				<view class="money-num ss-p-t-50">{{ state.showMoney ? '100' || '0.00' : '*****' }}</view>
				<button class="ss-reset-button topup-btn" @tap="sheep.$router.go('/pages/user/wallet/recharge')">充值</button>
			</view>
		</view>

		<ui-fixed bg="bg-white" sticky :index="100">
			<!-- 统计 -->
			<view class="filter-box ss-flex ss-col-center ss-row-between">
				<button class="ss-reset-button date-btn" @tap="uiDatetimePickerRef.showModal()">
					<text>{{ state.selDate }}</text>
					<text class="cicon-drop-down ss-seldate-icon"></text>
				</button>
				<view class="total-box">收入￥1200.00 支出￥50.00</view>
			</view>
			<!-- tab -->
			<view class="wallet-tab-card ss-flex ss-col-center border-bottom">
				<view class="tab-item ss-flex-1 ss-flex ss-row-center ss-col-center" v-for="item in state.tabList" :key="item.value" @tap="onTab(item)">
					<view class="tab-title" :class="[{ 'cur-tab-title': state.curTab === item.value }]">{{ item.label }}</view>
					<view v-show="state.curTab === item.value" class="tab-line"></view>
				</view>
			</view>
		</ui-fixed>

		<!-- 钱包记录 -->
		<view class="wallet-list ss-flex border-bottom" v-for="item in 10" :key="item">
			<image class="head-img ss-m-r-20" :src="sheep.$url.staticUrl('/static/images/tabbar/category2.png')" mode="aspectFit"></image>
			<view class="list-content">
				<view class="title-box ss-flex ss-row-between">
					<text class="title ss-line-1">充值-来自银行卡</text>
					<view class="money">
						<text v-if="item.wallet >= 0" class="add">+11</text>
						<text v-else class="minus">-11111</text>
					</view>
				</view>
				<text class="time">2020.04.22</text>
			</view>
		</view>
		<!-- 日期选择 -->
		<ui-datetime-picker ref="uiDatetimePickerRef" @confirm="onPickerConfirm" mode="year-month"></ui-datetime-picker>
	</ui-layout>
</template>

<script setup>
/**
 *
 */

import { computed, watch, ref, reactive, watchPostEffect, onBeforeMount, unref, onMounted, nextTick } from 'vue';

import useModal from '@/sheep/composables/modal.js';
const hooksModal = useModal();

import { sheep } from '@/sheep';

const uiDatetimePickerRef = ref(null);

// 数据
const state = reactive({
	showMoney: false,
	selDate: '',
	curTab: 'all',
	tabList: [
		{
			label: '全部',
			value: 'all'
		},
		{
			label: '收入',
			value: 'add'
		},
		{
			label: '支出',
			value: 'reduce'
		}
	]
});

onBeforeMount(() => {
	getToday();
});
//  今日
const getToday = () => {
	let now = new Date();
	let dateText = `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`;
	state.selDate = `${now.getFullYear()}.${now.getMonth() + 1}.${now.getDate()}`;
};

// 选中
const onPickerConfirm = e => {
	console.log(e, 111111111);
};
</script>

<style lang="scss" scoped>
// 钱包
.header-box {
	width: 750rpx;
	background-color: $white;
	padding: 30rpx 0;

	.card-box {
		width: 690rpx;
		min-height: 300rpx;
		padding: 40rpx;
		background-size: 100% 100%;
		border-radius: 30rpx;
		overflow: hidden;
		position: relative;
		z-index: 1;

		&::after {
			content: '';
			display: block;
			width: 100%;
			height: 100%;
			z-index: 2;
			position: absolute;
			top: 0;
			left: 0;
			background: v-bind("sheep.$url.cssUrl('/static/images/user/wallet_card_bg.png')") no-repeat;
			pointer-events: none;
		}

		.card-head {
			color: $white;
			font-size: 30rpx;
		}

		.ss-eye-icon {
			font-size: 40rpx;
			color: $white;
		}

		.money-num {
			font-size: 70rpx;
			line-height: 70rpx;
			font-weight: 500;
			color: $white;
		}

		.reduce-num {
			font-size: 26rpx;
			font-weight: 400;
			color: $white;
		}

		.topup-btn {
			width: 120rpx;
			height: 60rpx;
			line-height: 60rpx;
			border-radius: 30px;
			font-size: 24rpx;
			font-weight: 500;
			background-color: $white;
			color: var(--ui-BG-Main);
			position: absolute;
			right: 30rpx;
			top: 40rpx;
			z-index: 3;
		}
	}
}

// 筛选

.filter-box {
	height: 120rpx;
	padding: 0 30rpx;
	background-color: $bg-page;

	.total-box {
		font-size: 24rpx;
		font-weight: 500;
		color: $dark-9;
	}

	.date-btn {
		background-color: $white;
		line-height: 54rpx;
		border-radius: 27rpx;
		padding: 0 20rpx;
		font-size: 24rpx;
		font-weight: 500;
		color: $dark-6;

		.ss-seldate-icon {
			font-size: 50rpx;
			color: $dark-9;
		}
	}
}

// tab
.wallet-tab-card {
	.tab-item {
		height: 80rpx;
		position: relative;

		.tab-title {
			font-size: 30rpx;
		}

		.cur-tab-title {
			font-weight: $font-weight-bold;
		}

		.tab-line {
			width: 60rpx;
			height: 6rpx;
			border-radius: 6rpx;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
			bottom: 2rpx;
			background-color: var(--ui-BG-Main);
		}
	}
}

// 钱包记录
.wallet-list {
	width: 750rpx;
	padding: 30rpx;
	background-color: #ffff;

	.head-img {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		background: $gray-c;
	}

	.list-content {
		justify-content: space-between;
		align-items: flex-start;
		flex: 1;

		.title {
			font-size: 28rpx;
			color: $dark-3;
			width: 400rpx;
		}

		.time {
			color: $gray-c;
			font-size: 22rpx;
		}
	}

	.money {
		font-size: 28rpx;
		font-weight: bold;

		.add {
			color: var(--ui-BG-Main);
		}

		.minus {
			color: $dark-3;
		}
	}
}
</style>
