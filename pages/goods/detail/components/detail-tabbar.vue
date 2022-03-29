<template>
	<ui-fixed
		bottom
		:opacity="false"
		@getHeight="tabbarheight"
		:topRadius="props.topRadius"
		:bgStyles="props.bgStyles"
		:bg="props.bg"
		placeholder
		:ui="props.ui"
		:noFixed="props.noFixed"
		:index="200"
	>
		<view class="ui-tabbar-box">
			<view class="ui-tabbar ss-flex ss-col-center ss-row-between">
				<view class="detail-tabbar-item ss-flex ss-flex-col ss-row-center ss-col-center" @tap="onFavorite">
					<block v-if="props.modelValue.favorite">
						<image class="item-icon" :src="sheep.$url.staticUrl('/static/images/goods/collect_1.png')" mode="aspectFit"></image>
						<view class="item-title">已收藏</view>
					</block>
					<block v-else>
						<image class="item-icon" :src="sheep.$url.staticUrl('/static/images/goods/collect_0.png')" mode="aspectFit"></image>
						<view class="item-title">收藏</view>
					</block>
				</view>
				<view class="detail-tabbar-item ss-flex ss-flex-col ss-row-center ss-col-center" @tap="onChat">
					<image class="item-icon" :src="sheep.$url.staticUrl('/static/images/goods/message.png')" mode="aspectFit"></image>
					<view class="item-title">客服</view>
				</view>
				<view class="detail-tabbar-item ss-flex ss-flex-col ss-row-center ss-col-center" @tap="onShare">
					<image class="item-icon" :src="sheep.$url.staticUrl('/static/images/goods/share.png')" mode="aspectFit"></image>
					<view class="item-title">分享</view>
				</view>
				<slot></slot>
			</view>
		</view>
	</ui-fixed>
	<!-- 分享工具栏 -->
	<ss-share-modal v-model="state.showShare"></ss-share-modal>
</template>

<script setup>
/**
 *
 * 底部导航
 *
 * @property {String} bg 			 			- 背景颜色Class
 * @property {String} ui 			 			- 自定义样式Class
 * @property {Boolean} noFixed 		 			- 是否定位
 * @property {Boolean} topRadius 		 		- 上圆角
 *
 *
 */

import { computed, inject, reactive, watch, onBeforeMount, onMounted, nextTick, watchEffect, onUnmounted, getCurrentInstance } from 'vue';
import { sheep } from '@/sheep';
import { useStore } from 'vuex';
const store = useStore();

// 数据
const state = reactive({
	showShare: false
});

// 接收参数
const props = defineProps({
	modelValue: {
		type: Object,
		default() {}
	},
	bg: {
		type: String,
		default: 'bg-white'
	},
	bgStyles: {
		type: Object,
		default() {}
	},
	ui: {
		type: String,
		default: ''
	},

	noFixed: {
		type: Boolean,
		default: false
	},
	topRadius: {
		type: Number,
		default: 0
	}
});
const elStyles = computed(() => {
	return {
		'border-top-left-radius': props.topRadius + 'rpx',
		'border-top-right-radius': props.topRadius + 'rpx',
		overflow: 'hidden'
	};
});

const tabbarheight = e => {
	uni.setStorageSync('tabbar', e);
};
const onFavorite = () => {
	if (props.modelValue.favorite) {
		props.modelValue.favorite = 0;
	} else {
		props.modelValue.favorite = 1;
	}
	sheep.$apis.user.favorite.add(props.modelValue.id);
};
const onShare = () => {
	state.showShare = true;
};
const onChat = () => {
	sheep.$router.go('/pages/chat/index', { id: props.modelValue.id });
};
props.modelValue.favorite = 1;
</script>

<style lang="scss" scoped>
.ui-tabbar-box {
	.ui-tabbar {
		padding: 0 20rpx 0 0;
		display: flex;
		height: 50px;

		.detail-tabbar-item {
			width: 120rpx;

			.item-icon {
				width: 40rpx;
				height: 40rpx;
			}

			.item-title {
				font-size: 20rpx;
				font-weight: 500;
				line-height: 20rpx;
				margin-top: 12rpx;
			}
		}
	}
}
</style>
