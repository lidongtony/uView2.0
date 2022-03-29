<!-- 页面 -->
<template>
	<ui-layout class="order-list-wrap" navTitle="我的订单">
		<ui-fixed :opacity="false" placeholder :index="200"><ui-tab tpl="long" align="flex-bar" :tab="state.tabList" @change="chageTab"></ui-tab></ui-fixed>

		<view class="order-list-card-box bg-white ss-r-10 ss-m-t-14 ss-m-20" v-for="order in state.orderList" :key="order.id">
			<view class="order-card-header ss-flex ss-col-center ss-row-between ss-p-x-20">
				<view class="order-no">订单号：{{ order.order_sn }}</view>
				<view class="order-state ss-font-26">{{ order.status_desc }}</view>
			</view>
			<block v-for="item in order.items" :key="item.id">
				<ss-order-card :img="item.goods_image" :title="item.goods_title" :skuText="item.goods_sku_text" :price="item.goods_price" :num="item.goods_num"></ss-order-card>
			</block>
			<!-- TODO: 缺少支付信息 -->
			<view class="order-card-footer ss-flex ss-col-center ss-row-between ss-p-x-20">
				<ui-popover>
					<button class="more-btn ss-reset-button">更多</button>
					<template #content>
						<view class="more-item-box">
							<view class="more-item ss-flex ss-col-center ss-reset-button"><view class="item-title">删除订单</view></view>
							<view class="more-item ss-flex ss-col-center ss-reset-button"><view class="item-title">查看发票</view></view>
							<view class="more-item ss-flex ss-col-center ss-reset-button"><view class="item-title">评价晒单</view></view>
						</view>
					</template>
				</ui-popover>
				<view class="ss-flex ss-col-center">
					<button v-if="order.btns.includes('cancel')" class="tool-btn  ss-reset-button">取消订单</button>
					<button v-if="order.btns.includes('pay')" class="tool-btn  ss-reset-button ui-BG-Main-Gradient">继续支付</button>
				</view>
			</view>
		</view>
	</ui-layout>
</template>

<script setup>
import { computed, reactive, watch, onMounted, watchEffect, onUnmounted, getCurrentInstance, nextTick } from "vue";
import { onLoad, onPageScroll, onShow } from "@dcloudio/uni-app";
import { sheep } from "@/sheep";
import _ from "lodash";

// 数据
const state = reactive({
	curTab: 0,
	type: "all",
	orderList: [],
	tabList: [
		{
			name: "全部",
			value: 1
		},
		{
			name: "待付款",
			value: 2
		},
		{
			name: "待发货",
			value: 3
		},
		{
			name: "待收货",
			value: 4
		},
		{
			name: "待评价",
			value: 5
		}
	]
});

const chageTab = e => {
	state.curTab = e.index;
};
const getOrderList = async (page = 1) => {
	let res = await sheep.$apis.order.list({ type: state.type });
	if (res.error === 0) {
		state.orderList = _.concat(state.orderList, res.data.data);
	}
	console.log(state.orderList, "list");
};
onLoad(async options => {
	getOrderList();
	// state.orderList.push();
});
</script>

<style lang="scss" scoped>
.swiper-box {
	flex: 1;
	.swiper-item {
		height: 100%;
		width: 100%;
	}
}
.order-list-card-box {
	.order-card-header {
		height: 80rpx;
		.order-no {
			font-size: 26rpx;
			font-weight: 500;
		}
		.order-state {
			color: var(--ui-BG-Main);
		}
	}
	.order-card-footer {
		height: 100rpx;
		.more-item-box {
			padding: 20rpx;
			.more-item {
				height: 60rpx;
				.title {
					font-size: 26rpx;
				}
			}
		}
		.more-btn {
			color: $dark-9;
			font-size: 24rpx;
		}
		.tool-btn {
			width: 160rpx;
			height: 60rpx;
			background: #f6f6f6;
			font-size: 26rpx;
			border-radius: 30rpx;
			margin-right: 10rpx;
			&:last-of-type {
				margin-right: 0;
			}
		}
	}
}
</style>
