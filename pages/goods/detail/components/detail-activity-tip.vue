<template>
	<ui-fixed bottom placeholder :val="50" :index="200" :noFixed="false" :noSafe="false">
		<view class="fixd-activity-box ss-flex ss-col-center ss-row-between">
			<view class="fixed-item ss-flex ss-col-center" :style="[bgStyles]">
				<image class="item-icon" :src="sheep.$url.staticUrl(props.icon)" mode="aspectFit"></image>
				<view class="item-title">{{ props.title }}</view>
			</view>
			<button class="ss-reset-button go-btn ss-flex ss-col-center">
				GO
				<text class="_icon-forward go-icon"></text>
			</button>
		</view>
	</ui-fixed>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, unref, reactive, computed, nextTick, getCurrentInstance } from 'vue';
import { sheep } from '@/sheep';
const props = defineProps({
	icon: {
		type: String,
		default: '/static/images/goods/seckill-icon.png' // '/static/images/goods/groupon-icon.png'
	},
	title: {
		type: String,
		default: '该商品正在参与拼团活动'
	},
	bgStyles: {
		type: Object,
		default() {}
	}
});
</script>

<style lang="scss" scoped>
// 活动跳转
.fixd-activity-box {
	background: v-bind("sheep.$url.cssUrl('/static/images/goods/seckill-tip-bg.png')") no-repeat;
	background-position: center;
	background-size: 100% 100%;
	.go-btn {
		padding: 0 16rpx;
		line-height: 36rpx;
		background: $white;
		border-radius: 16rpx;
		color: var(--ui-BG-Main);
		font-size: 20rpx;
		margin-right: 40rpx;
	}
	.fixed-item {
		height: 100rpx;
		padding: 0 40rpx;
		width: 100%;

		.item-icon {
			width: 40rpx;
			height: 40rpx;
			margin-right: 20rpx;
		}

		.item-title {
			font-size: 26rpx;
			font-weight: 500;
			color: $white;
		}
	}
}
</style>
