<template>
	<ui-navbar alway :placeholder="false" back opacity :bgStyles="{ background: '#fff' }">
		<view class="detail-tab-card" :style="[{ opacity: state.tabOpacityVal }]">
			<view class="tab-box ss-flex ss-col-center">
				<view class="tab-item ss-flex-1 ss-flex ss-row-center ss-col-center" v-for="item in state.tabList" :key="item.value" @tap="onTab(item)">
					<view class="tab-title" :class="[{ 'cur-tab-title': state.curTab === item.value }]">{{ item.label }}</view>
					<view v-show="state.curTab === item.value" class="tab-line"></view>
				</view>
			</view>
		</view>
		<template #right>
			<ui-popover>
				<button class="ss-reset-button navbar-more-box  ss-flex ss-row-center ss-col-center ss-m-r-30">
					<view class="round-dot" v-for="item in 3" :key="item"></view>
				</button>
				<template #content>
					<view class="navbar-menu-box">
						<view class="menu-item ss-flex ss-col-center" @tap="sheep.$router.go('/pages/index/index')">
							<image class="menu-icon" src="/static/images/tabbar/home.gif" mode="aspectFit"></image>
							<view class="menu-title">首页</view>
						</view>
						<view class="menu-item ss-flex ss-col-center" @tap="sheep.$router.go('/pages/index/cart')">
							<image class="menu-icon" src="/static/images/tabbar/home.gif" mode="aspectFit"></image>
							<view class="menu-title">购物车</view>
						</view>
						<view class="menu-item ss-flex ss-col-center" @tap="sheep.$router.go('/pages/index/user')">
							<image class="menu-icon" src="/static/images/tabbar/home.gif" mode="aspectFit"></image>
							<view class="menu-title">我的</view>
						</view>
					</view>
				</template>
			</ui-popover>
		</template>
	</ui-navbar>
</template>

<script setup>
import { onMounted, ref, unref, reactive, computed, getCurrentInstance, watchPostEffect, nextTick } from 'vue';
import { onLoad, onPageScroll } from '@dcloudio/uni-app';
const vm = getCurrentInstance();
import { sheep } from '@/sheep';
import useSys from '@/sheep/composables/sys.js';
const hooksSys = useSys();
import store from '@/sheep/store';
const state = reactive({
	tabOpacityVal: 0,
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
uni.$on('detail-tab-emit', e => {
	state.tabOpacityVal = e ? 1 : 0;
});
onPageScroll(e => {
	let top = e.scrollTop;
	if (top < 380) {
		state.curTab = 'goods';
	} else if (top > 380 && top < 1300) {
		state.curTab = 'comment';
	} else {
		state.curTab = 'detail';
	}
});
</script>

<style lang="scss" scoped>
.detail-tab-card {
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
			bottom: 10rpx;
			background-color: var(--ui-BG-Main);
		}
	}
}

// 标题栏
.navbar-more-box {
	width: 62rpx;
	height: 62rpx;
	background: rgba($black, 0.3);
	border: 1px solid $white;
	border-radius: 30px;

	.round-dot {
		width: 8rpx;
		height: 8rpx;
		background: $white;
		border-radius: 50%;
		margin: 0 3rpx;
	}
}

// 菜单
.navbar-menu-box {
	padding: 20rpx;

	.menu-item {
		margin-bottom: 20rpx;

		&:last-child {
			margin-bottom: 0;
		}

		.menu-icon {
			width: 40rpx;
			height: 40rpx;
		}

		.menu-title {
			font-size: 26rpx;
			font-weight: 500;
			color: $dark-3;
			padding-left: 20rpx;
		}
	}
}
</style>
