<!-- 拼团详情 -->
<template>
	<ui-layout>
		<!-- 标题栏 -->
		<detail-navbar></detail-navbar>
		<!-- 轮播 -->
		<ui-swiper id="detail-swiper-selector" class="ss-m-b-14" :list="state.swiperList" dotStyle="tag" :height="360" dotCur="bg-mask-40"></ui-swiper>
		<!-- 价格+标题 -->
		<view class="title-card">
			<view class="ss-flex ss-row-between ss-col-center title-head">
				<view class="price-box">
					<view class="ss-m-b-20 ss-flex"><view class="price-text ss-m-r-16">398.00</view></view>

					<view class="ss-flex">
						<view class="origin-price-box ss-flex ss-col-center">
							<view class="origin-price-title">原价：</view>
							<view class="origin-price-text">98.6</view>
						</view>
						<view class="line ss-m-l-20 ss-m-r-20">|</view>
						<view class="stock-text">仅剩400+</view>
					</view>
				</view>
				<view class="timer-box ss-flex-col ss-row-center ss-col-center">
					<view class="timer-text ss-m-b-20">距结束仅剩</view>
					<ui-count-down :timestamp="86400" :autoplay="true" color="#fff" separator-color="#fff" bgColor="rgba(51,51,51,0.1)"></ui-count-down>
				</view>
			</view>
			<view class="head-bottom">
				<view class="title-text ss-line-2 ss-m-b-6">
					SK-II神仙水230ml护肤精华露礼盒套装（Art-X艺术限量礼盒版）SK2精华液 SK-II神仙水230ml护肤精华露礼盒套装（Art-X艺术限量礼盒版）SK2精华液
					SK-II神仙水230ml护肤精华露礼盒套装（Art-X艺术限量礼盒版）SK2精华液
				</view>
				<view class="subtitle-text ss-line-1">嫩滑提亮 均匀肤色 嫩滑提亮 均匀肤色 嫩滑提亮 均匀肤色 嫩滑提亮 均匀肤色 嫩滑提亮 均匀肤色 嫩滑提亮 均匀肤色</view>
			</view>
		</view>

		<!-- 功能卡片 -->
		<view class="detail-cell-card detail-card">
			<detail-cell-sku></detail-cell-sku>
			<detail-cell-service></detail-cell-service>
			<detail-cell-params></detail-cell-params>
		</view>

		<!-- 详情tab -->
		<detail-tab></detail-tab>

		<!-- 评价 -->
		<view class="detail-comment-card detail-card" id="detail-comment-selector">
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
		<view class="detail-content-card detail-card" id="detail-content-selector">
			<view class="card-header ss-flex ss-col-center ss-row-between">
				<view class="ss-flex">
					<view class="line"></view>
					<view class="title ss-m-l-20 ss-m-r-20">详情</view>
				</view>
			</view>
			<view class="card-content"><ui-parse :html="state.richText"></ui-parse></view>
		</view>

		<!-- 活动跳转 -->
		<detail-activity-tip></detail-activity-tip>

		<!-- 详情tabbar -->
		<detail-tabbar>
			<view class="buy-box ss-flex ss-col-center"><button class="ss-reset-button add-btn ss-flex-col ss-row-center ss-col-center ">立即购买</button></view>
		</detail-tabbar>
	</ui-layout>
</template>

<script setup>
import { onBeforeMount, ref, unref, reactive, computed, getCurrentInstance, watchPostEffect } from 'vue';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
import { useStore } from 'vuex';
import { sheep } from '@/sheep';
const store = useStore();
const vm = getCurrentInstance();
import detailNavbar from './components/detail-navbar.vue';
import detailCellSku from './components/detail-cell-sku.vue';
import detailCellService from './components/detail-cell-service.vue';
import detailCellParams from './components/detail-cell-params.vue';
import detailTabbar from './components/detail-tabbar.vue';
import detailActivityTip from './components/detail-activity-tip.vue';
import detailTab from './components/detail-tab.vue';

const state = reactive({
	swiperList: [
		{
			path: '',
			src: '/storage/default/20220217/406a3b431d1fe65e6114193b60683a63.png',
			type: 'image'
		},
		{
			path: '',
			src: '/storage/default/20220217/406a3b431d1fe65e6114193b60683a63.png',
			type: 'image'
		}
	],
	richText:
		'这是富文本这是富文本这是富文本这是富文本这是富文本这是这是富文本这是富文本这是富文本这是富文本这是富文本这是富文本这是富文本这是富文本这是富文本富文本这是富文本这是富文本这是富文本这是富文本这是富文本这是富文本'
});
</script>

<style lang="scss" scoped>
.detail-card {
	padding: 40rpx 20rpx;
	background-color: $white;
	margin: 14rpx 20rpx;
	border-radius: 10rpx;
}

// 价格标题卡片
.title-card {
	margin: 14rpx 20rpx;
	background-color: $white;
	border-radius: 10rpx;

	.title-head {
		padding: 40rpx 20rpx;
		border-radius: 10rpx 10rpx 0 0;
		background: linear-gradient(0deg, #ff5854 0%, #ff2621 100%);
	}

	.head-bottom {
		padding: 20rpx 20rpx 40rpx;
	}

	.price-box {
		.tag-box {
			background-color: #fc6e6f;

			.tag-icon-box {
				background-color: $white;
				border-radius: 6rpx 0 0 6rpx;
				color: #fc6e6f;
				height: 40rpx;
				padding: 0 6rpx;
			}

			.tag-text-box {
				color: $white;
				height: 40rpx;
				border: 1px solid $white;
				border-radius: 0 6rpx 6rpx 0;
				font-size: 12px;
				padding: 0 8rpx;
				line-height: 40rpx;
			}
		}

		.price-text {
			font-size: 42rpx;
			font-weight: 500;
			color: $white;
			line-height: 30rpx;

			&::before {
				content: '￥';
				font-size: 30rpx;
			}
		}

		.origin-price-text,
		.origin-price-title {
			font-size: 26rpx;
			font-weight: 400;
			color: $white;
			text-decoration: line-through;
		}

		.stock-text,
		.line {
			font-size: 26rpx;
			font-weight: 400;
			color: $white;
		}

		.origin-price-text::before {
			content: '￥';
		}
	}

	.timer-box {
		font-size: 26rpx;
		color: $white;
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
		width: 400rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
		color: $white;
		font-size: 28rpx;
	}
}

// 评价
.detail-comment-card,
.detail-content-card {
	.card-header {
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
