<template>
	<detail-cell class="ss-p-x-20 ss-p-y-10 ss-bg-white" label="保障" v-model="state.safeText" @tap="showModal"></detail-cell>
	<ui-modal name="detailCellSafe" mask="40" align="bottom" ui="ss-r-t-30" :showCancel="false" :option="false">
		<view class="cell-safe-modal ss-modal-box bg-white ss-flex-col">
			<view class="modal-header"><text class="cicon-close-round close-icon" @tap="hideModal"></text></view>
			<view class="modal-content ss-flex-1">
				<view class="sale-item" v-for="item in state.safeList" :key="item.title">
					<view class="item-title">{{ item.title }}</view>
					<view class="item-value">{{ item.value }}</view>
				</view>
			</view>
			<view class="modal-footer ss-flex ss-row-center ss-col-center"><button class="ss-reset-button save-btn" @tap="hideModal">确定</button></view>
		</view>
	</ui-modal>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, unref, reactive, computed, nextTick, getCurrentInstance } from 'vue';

import useModal from '@/sheep/composables/modal.js';
const hooksModal = useModal();

import detailCell from './detail-cell.vue';

const state = reactive({
	safeText: '正品保障 · 7天无理由退换 · 退运费险 ',
	safeList: [
		{
			title: '正品保障',
			value:
				'正品保障，假一赔四卖家投保退货运费险，负担一定金额退货运费卖家投保退货运费险，负担一定金额退货运费卖家投保退货运费险，负担一定金额退货运费卖家投保退货运费险，负担一定金额退货运费'
		},
		{
			title: '7天无理由退换',
			value: '满足相应条件（吊牌缺失,洗涤后不支持）时，消费者可 申请“7天无理由退换货”卖家投保退货运费险，负担一定金额退货运费'
		},
		{
			title: '退货运费险',
			value: '卖家投保退货运费险，负担一定金额退货运费卖家投保退货运费险，负担一定金额退货运费卖家投保退货运费险，负担一定金额退货运费'
		},
		{
			title: '极速退款',
			value: '卖家投保退货运费险，负担一定金额退货运费卖家投保退货运费险，负担一定金额退货运费卖家投保退货运费险，负担一定金额退货运费'
		}
	]
});

const showModal = () => {
	hooksModal.showModal('detailCellSafe');
};
const hideModal = () => {
	hooksModal.hideModal();
};
</script>

<style lang="scss" scoped>
.ss-modal-box {
	border-radius: 30rpx 30rpx 0 0;
	max-height: 1000rpx;

	.modal-header {
		position: relative;
		padding: 60rpx 20rpx 40rpx;

		.close-icon {
			position: absolute;
			top: 10rpx;
			right: 20rpx;
			font-size: 46rpx;
			opacity: 0.2;
		}
	}

	.modal-content {
		padding: 0 20rpx;
		overflow-y: auto;

		.sale-item {
			margin-bottom: 24rpx;

			.item-title {
				font-size: 28rpx;
				font-weight: 500;
				line-height: 28rpx;
				margin-bottom: 24rpx;
			}

			.item-value {
				font-size: 26rpx;
				font-weight: 400;
				color: $dark-9;
				line-height: 42rpx;
			}
		}
	}

	.modal-footer {
		height: 120rpx;

		.save-btn {
			width: 710rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
			color: $white;
		}
	}
}
</style>
