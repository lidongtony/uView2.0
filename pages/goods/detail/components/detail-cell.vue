<template>
	<view class="detail-cell-wrap ss-flex ss-col-center ss-row-between" @tap="onCell">
		<view class="label-text">{{ props.label }}</view>
		<view class="cell-content ss-line-1 ss-flex-1">{{ props.modelValue }}</view>
		<button class="ss-reset-button"><text class="_icon-forward right-forwrad-icon"></text></button>
	</view>
</template>

<script setup>
/**
 * 详情 cell
 *
 */

import { onBeforeMount, onMounted, ref, unref, reactive, computed, nextTick, getCurrentInstance } from 'vue';

const props = defineProps({
	label: {
		type: String,
		default: ''
	},
	modelValue: {
		type: String,
		default: ''
	}
});

const emits = defineEmits(['click']);

// 点击
const onCell = () => {
	emits('click');
};
</script>

<style lang="scss" scoped>
.detail-cell-wrap {
	min-height: 60rpx;

	.label-text {
		font-size: 28rpx;
		font-weight: 500;
		color: $dark-9;
		margin-right: 38rpx;
	}

	.cell-content {
		font-size: 28rpx;
		font-weight: 500;
		color: $dark-6;
	}

	.right-forwrad-icon {
		font-size: 28rpx;
		font-weight: 500;
		color: $dark-9;
	}
}
</style>
