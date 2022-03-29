<template>
	<view class="detail-tab-wrap" :class="[{ 'hide-tab': state.sticky }]">
		<!-- tab -->
		<ui-fixed bg="bg-white" sticky :index="100" @fixed="changeFixed">
			<view class="detail-tab-card">
				<view class="tab-box ss-flex ss-col-center">
					<view class="tab-item ss-flex-1 ss-flex ss-row-center ss-col-center" v-for="item in state.tabList" :key="item.value" @tap="onTab(item)">
						<view class="tab-title" :class="[{ 'cur-tab-title': state.curTab === item.value }]">{{ item.label }}</view>
						<view v-show="state.curTab === item.value" class="tab-line"></view>
					</view>
				</view>
			</view>
		</ui-fixed>
	</view>
</template>

<script setup>
import { computed, reactive, watch, onMounted, watchEffect, onUnmounted, nextTick } from 'vue';
import { sheep } from '@/sheep';

const state = reactive({
	sticky: false,
	curTab: 'goods',
	tabList: [
		{
			label: '商品',
			value: 'goods',
			to: 'detail-swiper-selector'
		},
		{
			label: '评价',
			value: 'comment',
			to: 'detail-comment-selector'
		},
		{
			label: '详情',
			value: 'detail',
			to: 'detail-content-selector'
		}
	]
});

const onTab = item => {
	state.curTab = item.value;
	uni.pageScrollTo({
		selector: '#' + item.to,
		duration: 300
	});
};

const changeFixed = e => {
	state.sticky = e;
	uni.$emit('detail-tab-emit', e);
};
</script>

<style lang="scss" scoped>
.hide-tab {
	opacity: 0;
	pointer-events: none;
	height: 0;
	transition: all linear 0.2s;
	transform: scaleY(0);
}
.detail-tab-card {
	transition: all linear 0.2s;
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
</style>
