<template>
	<ui-layout class="widthdraw-log-wrap" navTitle="提现记录">
		<!-- 记录卡片 -->
		<view class="wallet-log-box ss-p-b-30">
			<view class="log-list" v-for="item in 6" :key="item">
				<view class="head ss-flex ss-col-center ss-row-between">
					<view class="title">提现至银行卡</view>
					<view class="num">+1.00 元</view>
				</view>
				<view class="status-box item  ss-flex ss-col-center ss-row-between">
					<view class="item-title">申请状态</view>
					<view class="status-text">审核中</view>
				</view>
				<view class="time-box item  ss-flex ss-col-center ss-row-between">
					<text class="item-title">账户信息</text>
					<view class="time ss-ellipsis-1">交通银行[6216******4963]</view>
				</view>
				<view class="time-box item  ss-flex ss-col-center ss-row-between">
					<text class="item-title">提现单号</text>
					<view class="time"> 25689687459 </view>
				</view>
				<view class="time-box item  ss-flex ss-col-center ss-row-between">
					<text class="item-title">手续费</text>
					<view class="time">1 元</view>
				</view>
				<view class="time-box item  ss-flex ss-col-center ss-row-between">
					<text class="item-title">申请时间</text>
					<view class="time"> 2020.04.2</view>
				</view>
			</view>
		</view>
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
		sheep
	} from "@/sheep";
</script>

<style lang="scss" scoped>
	// 记录卡片
	.log-list {
		min-height: 213rpx;
		background: $white;
		margin-bottom: 10rpx;
		padding-bottom: 10rpx;

		.head {
			padding: 0 35rpx;
			height: 80rpx;
			border-bottom: 1rpx solid $gray-e;
			margin-bottom: 20rpx;

			.title {
				font-size: 28rpx;
				font-weight: 500;
				color: $dark-3;
			}

			.num {
				font-size: 28rpx;
				font-weight: 500;
				color: var(--ui-BG-Main);
			}
		}

		.item {
			padding: 0 30rpx 10rpx;

			.item-icon {
				color: $gray-d;
				font-size: 36rpx;
				margin-right: 8rpx;
			}

			.item-title {
				width: 180rpx;
				font-size: 24rpx;
				font-weight: 400;
				color: $gray-d;
			}

			.status-text {
				font-size: 24rpx;
				font-weight: 500;
				color: $green;
			}

			.time {
				font-size: 24rpx;
				font-weight: 400;
				color: $gray-d;
			}
		}
	}
</style>
