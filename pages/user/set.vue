<template>
	<ui-layout class="set-wrap" navTitle="编辑资料" bg="bg-white">
		<view class="header-box ss-flex-col ss-row-center ss-col-center">
			<image class="logo-img ss-m-b-40" src="/static/images/tabbar/find2.png" mode="aspectFit"></image>
			<view class="name ss-m-b-24">SHEEP商城</view>
			<view class="version">V1.3.0</view>
		</view>

		<ui-cell>
			<ui-cell-item title="清除缓存" subtitle="2M"
				:titleStyle="{ fontSize: '28rpx', color: '#333', fontWeight: 'bold' }"
				:subtitleStyle="{ fontSize: '28rpx', color: '#BBBBBB' }"></ui-cell-item>
			<ui-cell-item title="当前版本" subtitle=" V1.3.1"
				:titleStyle="{ fontSize: '28rpx', color: '#333', fontWeight: 'bold' }"
				:subtitleStyle="{ fontSize: '28rpx', color: '#BBBBBB' }"></ui-cell-item>
			<ui-cell-item title="意见反馈" :titleStyle="{ fontSize: '28rpx', color: '#333', fontWeight: 'bold' }">
			</ui-cell-item>
			<ui-cell-item title="关于我们" :titleStyle="{ fontSize: '28rpx', color: '#333', fontWeight: 'bold' }">
			</ui-cell-item>
		</ui-cell>

		<view class="set-footer ss-flex-col ss-row-center ss-col-center">
			<view class=" agreement-box ss-flex ss-col-center ss-m-b-30">
				<view class=" ss-flex ss-col-center">
					<view class="tcp-text">《用户协议》</view>
					<view class="agreement-text">与</view>
					<view class="tcp-text">《隐私协议》</view>
				</view>
			</view>
			<view class="copyright-text">******版权所有</view>
			<view class="copyright-text">Copyright© 2018-2022</view>
		</view>
	</ui-layout>
</template>

<script setup></script>

<style lang="scss" scoped>
	.set-title {
		margin: 0 30rpx;
	}

	.header-box {
		padding: 100rpx 0;

		.logo-img {
			width: 160rpx;
			height: 160rpx;
		}

		.name {
			font-size: 42rpx;
			line-height: 42rpx;
			font-weight: bold;
			color: $dark-3;
		}

		.version {
			font-size: 32rpx;
			font-weight: 500;
			line-height: 32rpx;
			color: $gray-b;
		}
	}

	.set-footer {
		margin: 200rpx 0;

		.copyright-text {
			font-size: 22rpx;
			font-weight: 500;
			color: $gray-c;
			line-height: 30rpx;
		}

		.agreement-box {
			margin: 80rpx auto 0;

			.tcp-text {
				color: var(--ui-BG-Main);
			}

			.agreement-text {
				font-size: 26rpx;
				font-weight: 500;
				color: $dark-9;
			}
		}
	}
</style>
