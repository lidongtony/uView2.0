<!-- 发票 -->
<template>
	<ui-modal class="apply-invoice-modal-wrap" name="chooseInvoiceMoal" mask="40" align="bottom" ui="ss-r-t-30" :showCancel="false" :option="false">
		<view class="ss-modal-box bg-white ss-flex-col">
			<view class="modal-header ss-flex-col ss-col-center ss-row-center">
				<text class="cicon-close-round close-icon" @tap="hideModal"></text>
				<text class="modal-title ss-m-b-30">发票</text>
			</view>
			<view class="modal-content ss-flex-1">
				<ui-form ref="applyInvoiceRef" :model="state.model" :rules="state.rules" hasClear labelPosition="left" :labelStyle="{ fontWeight: 'bold' }">
					<ui-form-item prop="type" title="发票类型">
						<ui-radio-group v-model="state.invoiceType">
							<ui-radio
								v-for="(item, index) in state.invoiceList"
								:key="index"
								:label="item.name"
								v-model="item.value"
								:checked="item.checked"
								:disabled="item.disabled"
								ui="check"
							></ui-radio>
						</ui-radio-group>
					</ui-form-item>
					<ui-form-item prop="name" title="发票抬头"><ui-input hasClear placeholder="请填写开具发票的姓名"></ui-input></ui-form-item>
					<ui-form-item v-if="state.invoiceType === 2" prop="no" title="税号"><ui-input hasClear placeholder="请输入税号"></ui-input></ui-form-item>
				</ui-form>
			</view>
			<view class="modal-footer ss-flex-col ss-row-center ss-col-center bg-white">
				<button class="ss-reset-button save-btn ss-m-b-20">提交申请</button>
				<button class="ss-reset-button cancel-btn">不开发票</button>
			</view>
		</view>
	</ui-modal>
</template>

<script setup>
import { computed, watch, ref, reactive, watchPostEffect, onBeforeMount, unref, onMounted, nextTick } from 'vue';
import useModal from '@/sheep/composables/modal.js';
const hooksModal = useModal();
const applyInvoiceRef = ref(null);
const state = reactive({
	model: {
		type: '',
		name: '',
		no: ''
	},
	rules:{},
	invoiceType: 1,
	invoiceList: [
		{
			name: '个人',
			value: 1
		},
		{
			name: '企业',
			value: 2
		}
	]
});

const emits = defineEmits(['click']);
const showModal = () => {
	hooksModal.showModal('chooseInvoiceMoal');
};
const hideModal = () => {
	hooksModal.hideModal();
};
const onAddress = () => {
	emits('click');
};
defineExpose({
	showModal
});
</script>

<style lang="scss" scoped>
.ss-modal-box {
	border-radius: 30rpx 30rpx 0 0;
	max-height: 1000rpx;

	.modal-header {
		position: relative;
		padding: 60rpx 20rpx 40rpx;

		.modal-title {
			font-size: 32rpx;
			font-weight: 500;
		}

		.close-icon {
			position: absolute;
			top: 10rpx;
			right: 20rpx;
			font-size: 46rpx;
			opacity: 0.2;
		}
	}

	.modal-content {
		overflow-y: auto;
	}

	.modal-footer {
		min-height: 120rpx;
		padding-bottom: 20rpx;

		.save-btn {
			width: 710rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
			color: $white;
		}
		.cancel-btn {
			width: 710rpx;
			height: 80rpx;
			border-radius: 40rpx;
			background: $gray-e;
		}
	}
}
</style>
