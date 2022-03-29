<template>
	<view class="groupon-join-list-wrap">
		<view class="header-box ss-flex ss-col-center ss-row-between">
			<view class="header-title">
				已有1150人参与活动
			</view>
			<button class="ss-reset-button"><text class="_icon-forward right-forwrad-icon"></text></button>
		</view>
		<view class="content-box">
			<view class="into-item ss-flex ss-row-between" v-for="(g, index) in 2" :key="index">
				<view class="ss-flex">
					<image class="into-img" src="/static/images/tabbar/category1.png" mode="aspectFill"></image>
					<text class="into-name">这是昵称</text>
				</view>
				<view class="ss-flex">
					<view class="">
						<view class="num">
							还差
							<text class="num-color">2人</text>
							成团
						</view>
						<view class="time">剩余时间 <ui-count-down :timestamp="86400" :autoplay="true" :fontSize="22"
								:separatorSize="22" color="#999" separator-color="#999" bgColor=""></ui-count-down>
						</view>
					</view>
					<button class="ss-reset-button  join-btn">去参团</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss" scoped>
	.groupon-join-list-wrap {
		background-color: $white;
		margin: 14rpx 20rpx;
		border-radius: 10rpx;

		.header-box {
			padding: 0 20rpx;
			height: 80rpx;

			.header-title,
			.right-forwrad-icon {
				font-size: 28rpx;
				font-weight: 500;
				color: $dark-9;
			}
		}

		.into-item {
			padding: 0 20rpx;
			height: 120rpx;
			width: 100%;
			border-bottom: 1rpx solid $gray-e;

			.into-img {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 23rpx;
				background-color: $gray-c;
			}

			.into-name {
				font-size: 28rpx;

				font-weight: 500;
				color: rgba(102, 102, 102, 1);
			}

			.num {
				font-size: 26rpx;
				color: $dark-6;

				.num-color {
					font-size: 24rpx;
					color: var(--ui-BG-Main);
				}
			}

			.time {
				font-size: 22rpx;
				margin-top: 10rpx;
				color: $dark-9;
			}

			.join-btn {
				width: 140rpx;
				line-height: 60rpx;
				background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
				box-shadow: var(--ui-Main-box-shadow);
				border-radius: 30rpx;
				padding: 0;
				font-size: 26rpx;

				font-weight: 500;
				color: $white;
				margin-left: 40rpx;
			}
		}

	}
</style>
