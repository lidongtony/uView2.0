<template>
	<ui-layout>
		<!-- 标题栏 -->
		<detail-navbar></detail-navbar>

		<block v-if="state.status === 0">
			<!-- //TODO: 骨架屏 -->
			loading
		</block>

		<block v-if="state.status === -1">
			<detail-navbar></detail-navbar>
			<!-- //TODO: 商品不存在或已下架 -->
		</block>

		<block v-if="state.status === 1">
			<!-- 轮播 -->
			<ui-swiper id="detail-swiper-selector" class="ss-m-b-14" isPreview :list="state.goodsSwiper" dotStyle="tag" :height="360" dotCur="bg-mask-40"></ui-swiper>
			<!-- 价格+标题 -->
			<view class="title-card detail-card ss-p-20 bg-white">
				<view class="ss-flex ss-row-between ss-col-center ss-m-b-26">
					<view class="price-box ss-flex ss-col-bottom">
						<!-- TODO: 价格区间的设计 -->
						<view class="price-text ss-m-r-16">{{ state.selectedSkuPrice.price || state.goodsInfo.price }}</view>
						<view class="origin-price-text" v-if="state.goodsInfo.original_price">{{ state.selectedSkuPrice.original_price || state.goodsInfo.original_price }}</view>
					</view>
					<view class="sales-text">{{ transformSales(state.goodsInfo.sales_show_type, state.goodsInfo.sales) }}</view>
				</view>
				<!-- 优惠券 -->
				<detail-coupon></detail-coupon>
				<view class="title-text ss-line-2 ss-m-b-6">{{ state.goodsInfo.title }}</view>
				<view class="subtitle-text ss-line-1">{{ state.goodsInfo.subtitle }}</view>
			</view>

			<!-- 功能卡片 -->
			<!-- TODO: 此处三个cell都没有应该什么都不显示，现在有个卡片占位 -->
			<view class="detail-cell-card detail-card">
				<detail-cell-sku v-if="state.goodsInfo.is_sku" v-model="state.selectedSkuPrice.goods_sku_text" :skus="state.goodsInfo.skus"></detail-cell-sku>
				<detail-cell-service v-if="state.goodsInfo.service.length > 0"></detail-cell-service>
				<detail-cell-params v-if="state.goodsInfo.params.length > 0"></detail-cell-params>
			</view>
			<!-- 规格与数量弹框 -->
			<ss-sku v-model="state.goodsInfo" @addCart="onAddCart" @buy="onBuy" @change="skuChange"></ss-sku>
			<!-- 详情tab -->
			<detail-tab ref="detailTabRef"></detail-tab>

			<!-- 评价 -->
			<view class="detail-comment-card detail-card ss-p-20 bg-white" id="detail-comment-selector">
				<view class="card-header ss-flex ss-col-center ss-row-between">
					<view class="ss-flex">
						<view class="line"></view>
						<view class="title ss-m-l-20 ss-m-r-20">评价</view>
						<view class="des">(3万+)</view>
					</view>
					<button class="ss-reset-button more-btn">
						查看全部
						<text class="_icon-forward"></text>
					</button>
				</view>
				<view class="card-content">
					<ss-comment></ss-comment>
					<ss-comment></ss-comment>
					<ss-comment></ss-comment>
					<ss-comment></ss-comment>
				</view>
			</view>

			<!-- 详情 -->
			<view class="detail-content-card detail-card ss-p-20 bg-white" id="detail-content-selector">
				<view class="card-header ss-flex ss-col-center ss-row-between">
					<view class="ss-flex">
						<view class="line"></view>
						<view class="title ss-m-l-20 ss-m-r-20">详情</view>
					</view>
				</view>
				<view class="card-content"><ui-parse :html="state.goodsInfo.content"></ui-parse></view>
			</view>

			<!-- 活动跳转 -->
			<detail-activity-tip></detail-activity-tip>

			<!-- 详情tabbar -->
			<detail-tabbar v-model="state.goodsInfo">
				<!-- TODO: 缺货中 已售罄 判断 设计-->
				<view class="buy-box ss-flex ss-col-center" v-if="state.goodsInfo.stock > 0">
					<button class="ss-reset-button add-btn " @tap="hooksModal.showModal('ssSkuModal')">加入购物车</button>
					<button class="ss-reset-button buy-btn " @tap="hooksModal.showModal('ssSkuModal')">立即购买</button>
				</view>
			</detail-tabbar>
		</block>
	</ui-layout>
</template>

<script setup>
import { onBeforeMount, onMounted, nextTick, ref, unref, reactive, computed, getCurrentInstance, watchPostEffect } from 'vue';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
import store from '@/sheep/store';
import { sheep } from '@/sheep';
import _ from 'lodash';
import useModal from '@/sheep/composables/modal.js';
import detailNavbar from './components/detail-navbar.vue';
import detailCellSku from './components/detail-cell-sku.vue';
import detailCellService from './components/detail-cell-service.vue';
import detailCellParams from './components/detail-cell-params.vue';
import detailTabbar from './components/detail-tabbar.vue';
import detailActivityTip from './components/detail-activity-tip.vue';
import detailTab from './components/detail-tab.vue';
import detailCoupon from './components/detail-coupon.vue';
const hooksModal = useModal();

// 转换销量格式 TODO: 写成计算属性
const transformSales = (type, num) => {
	num = num + '';
	if (type === 'exact') {
		return '已售 ' + num;
	} else {
		if (num < 10) {
			return '小于 10件';
		} else {
			let a = Math.pow(10, num.length - 1);
			return '已售 ' + parseInt(num / a) * a + '+';
		}
	}
};
const state = reactive({
	status: 0,
	goodsInfo: {},
	goodsSwiper: [],
	selectedSkuPrice: {}
});
// 规格变更
const skuChange = e => {
	state.selectedSkuPrice = e;
};
// 添加购物车
const onAddCart = e => {
	sheep.$apis.cart.append({
		goods_id: e.goods_id,
		goods_num: e.goods_num,
		goods_sku_price_id: e.id
	});
};
// 立即购买
const onBuy = e => {
	// TODO: 预检查库存再跳转
	sheep.$router.go('/pages/order/confirm', {
		data: JSON.stringify({
			order_type: 'goods',
			goods_list: [
				{
					goods_id: e.goods_id,
					goods_num: e.goods_num,
					goods_sku_price_id: e.id
				}
			]
		})
	});
};
// 转换轮播图格式 TODO: 写成计算属性
const transformImages = list => {
	list.forEach((item, key) => {
		if (item.indexOf('.avi') !== -1 || item.indexOf('.mp4') !== -1) {
			state.goodsSwiper.push({
				src: item,
				type: 'video'
			});
		} else {
			state.goodsSwiper.push({
				src: item,
				type: 'image'
			});
		}
	});
};
onLoad(options => {
	// 非法参数
	if (!options.id) {
		state.status = -1;
		return;
	}
	// 加载商品信息
	sheep.$apis.goods.detail(options.id).then(res => {
		if (res.error === 0) {
			state.status = 1;
			state.goodsInfo = res.data;
			transformImages(state.goodsInfo.images);
		} else {
			// 未找到商品
			state.status = -1;
		}
	});
});
</script>

<style lang="scss" scoped>
.detail-card {
	background-color: $white;
	margin: 14rpx 20rpx;
	border-radius: 10rpx;
	overflow: hidden;
}

// 价格标题卡片
.title-card {
	.price-box {
		.price-text {
			font-size: 42rpx;
			font-weight: 500;
			color: #ff3000;
			line-height: 30rpx;

			&::before {
				content: '￥';
				font-size: 30rpx;
			}
		}

		.origin-price-text {
			font-size: 26rpx;
			font-weight: 400;
			text-decoration: line-through;
			color: $gray-c;

			&::before {
				content: '￥';
			}
		}
	}

	.sales-text {
		font-size: 26rpx;
		font-weight: 500;
		color: $gray-c;
	}

	.coupon-box {
		font-size: 24rpx;
		font-weight: 500;
		color: var(--ui-BG-Main);
	}

	.title-text {
		font-size: 30rpx;
		font-weight: bold;
		line-height: 42rpx;
	}

	.subtitle-text {
		font-size: 26rpx;
		font-weight: 400;
		color: $dark-9;
		line-height: 42rpx;
	}
}

// 购买
.buy-box {
	.add-btn {
		width: 214rpx;
		height: 80rpx;
		border-radius: 40rpx 0 0 40rpx;
		background-color: var(--ui-BG-Main-light);
		color: var(--ui-BG-Main);
	}

	.buy-btn {
		width: 214rpx;
		height: 80rpx;
		border-radius: 0 40rpx 40rpx 0;
		background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
		color: $white;
	}
}

// 评价
.detail-comment-card,
.detail-content-card {
	.card-header {
		height: 80rpx;

		.line {
			width: 6rpx;
			height: 30rpx;
			background: linear-gradient(180deg, var(--ui-BG-Main) 0%, var(--ui-BG-Main-gradient) 100%);
			border-radius: 3rpx;
		}

		.title {
			font-size: 30rpx;
			font-weight: bold;
		}

		.des {
			font-size: 24rpx;
			color: $dark-9;
		}

		.more-btn {
			font-size: 24rpx;
			color: var(--ui-BG-Main);
		}
	}
}
</style>
