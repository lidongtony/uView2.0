<template>
	<view class="detail-coupon-wrap ss-flex ss-row-between ss-col-center ss-m-b-10" @tap="showModal">
		<view class="activity-box ss-flex ss-col-center">
			<ui-tag ui="sm">123</ui-tag>
			<ui-tag ui="sm">123</ui-tag>
		</view>
		<view class="coupon-box ss-flex ss-col-center">
			<button class="ss-reset-button coupon-box">领券<text class="_icon-forward ss-m-l-8"></text></button>
		</view>
	</view>
	<!-- 优惠券弹窗 -->
	<ui-modal name="detailCouponModal" mask="40" align="bottom" ui="ss-r-t-30" :showCancel="false" :option="false">
		<view class="ss-modal-box bg-white">
			<view class="modal-header ss-flex ss-col-center ss-row-center">
				<view class="header-title">
					优惠
				</view>
				<text class="cicon-close-round close-icon" @tap="hideModal"></text>
			</view>
			<view class="modal-content">
				<scroll-view scroll-y="true" class="modal-content-scroll">
					<view class="coupon-cell ss-flex ss-col-center ss-row-between">
						<view class="left ss-flex ss-col-center">
							<ui-tag>满减</ui-tag>
							<view class="cell-title ss-m-l-20">
								每满80元，可减30元现金
							</view>
						</view>
						<text class="_icon-forward cell-icon"></text>
					</view>
					<view class="coupon-cell ss-flex ss-col-center ss-row-between">
						<view class="left ss-flex ss-col-center">
							<ui-tag>包邮</ui-tag>
							<view class="cell-title ss-m-l-20">
								满10元包邮
							</view>
						</view>
						<text class="_icon-forward cell-icon"></text>
					</view>
					<view class="coupon-cell ss-flex ss-col-center ss-row-between">
						<view class="left ss-flex ss-col-center">
							<ui-tag>积分</ui-tag>
							<view class="cell-title ss-m-l-20">
								购买可得10积分
							</view>
						</view>
						<text class="_icon-forward cell-icon"></text>
					</view>
					<view class="coupon-cell ss-flex ss-col-center ss-row-between">
						<view class="left ss-flex ss-col-center">
							<ui-tag>换购</ui-tag>
							<view class="cell-title ss-m-l-20">
								该商品正在参加积分换购活动
							</view>
						</view>
						<text class="_icon-forward cell-icon"></text>
					</view>
					<ui-title class="ss-p-l-30" title="可领取的优惠券"></ui-title>
					<view class="ss-flex-col ss-row-center ss-col-center">
						<ui-coupon class="ss-m-b-18" size="lg"></ui-coupon>
						<ui-coupon class="ss-m-b-18" size="lg"></ui-coupon>
						<ui-coupon class="ss-m-b-18" size="lg"></ui-coupon>
						<ui-coupon class="ss-m-b-18" size="lg"></ui-coupon>
						<ui-coupon class="ss-m-b-18" size="lg"></ui-coupon>

					</view>
				</scroll-view>
			</view>
		</view>
	</ui-modal>
</template>

<script setup>
	import useModal from "@/sheep/composables/modal.js";
	const hooksModal = useModal();

	const showModal = () => {
		hooksModal.showModal("detailCouponModal");
	}
	const hideModal = () => {
		hooksModal.hideModal();
	}
</script>

<style lang="scss" scoped>
	.coupon-box {
		font-size: 24rpx;
		font-weight: 500;
		color: var(--ui-BG-Main);
	}

	.ss-modal-box {
		border-radius: 30rpx 30rpx 0 0;

		.modal-header {
			height: 100rpx;
			position: relative;

			.header-title {
				font-size: 32rpx;
				font-weight: 500;
				color: $dark-3;
			}

			.close-icon {
				position: absolute;
				top: 20rpx;
				right: 30rpx;
				font-size: 46rpx;
				opacity: 0.2;
			}
		}

		.modal-content {
			.modal-content-scroll {
				height: 800rpx;

				.coupon-cell {
					height: 80rpx;
					padding: 0 20rpx;

					.cell-title {
						font-size: 28rpx;
						font-weight: 500;
						color: $dark-6;
					}

					.cell-icon {
						color: $dark-9;
					}
				}
			}
		}
	}
</style>
