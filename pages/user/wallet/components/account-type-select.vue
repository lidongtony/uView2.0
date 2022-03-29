<template>
	<ui-modal class="ss-checkout-counter-wrap" name="accountType" mask="40" align="bottom" ui="ss-r-t-30" :showCancel="false" :option="false">
		<view class="ss-modal-box bg-white ss-flex-col">
			<view class="modal-header ss-flex-col ss-col-left">
				<text class="cicon-close-round close-icon" @tap="hideModal"></text>
				<text class="modal-title ss-m-b-20">选择提现方式</text>
			</view>
			<view class="modal-content ss-flex-1 ss-p-b-100">
				<!-- TODO: 此处没有渲染默认值 -->
				<ui-radio-group v-model="state.currentValue">
					<ui-radio
						v-for="(item, index) in state.typeList"
						:key="item.value"
						ui="check border-bottom"
						:modelValue="item.value"
						:customStyle="{ width: '100%', padding: '30rpx' }"
					>
						<template #leftLabel>
							<view class="label-box ss-flex-1">{{ item.title }}</view>
						</template>
					</ui-radio>
				</ui-radio-group>
			</view>
			<view class="modal-footer ss-flex ss-row-center ss-col-center"><button class="ss-reset-button save-btn" @tap="onConfirm">确定</button></view>
		</view>
	</ui-modal>
</template>

<script setup>
import { reactive, onBeforeMount, nextTick } from 'vue';
import { sheep } from '@/sheep';
import useModal from '@/sheep/composables/modal.js';
const hooksModal = useModal();
const props = defineProps({
	modelValue: {
		type: Object,
		default() {}
	}
});
const emits = defineEmits(['update:modelValue', 'change']);
const state = reactive({
	currentValue: '',
	typeList: [
		{
			icon: '',
			title: '微信零钱',
			value: 'wechat'
		},
		{
			icon: '',
			title: '支付宝账户',
			value: 'alipay'
		},
		{
			icon: '',
			title: '银行卡转账',
			value: 'bank'
		}
	]
});
const getWalletAccountInfo = async () => {
	return new Promise(async (resolve, reject) => {
		let res = await sheep.$apis.user.wallet.account.info({ type: state.currentValue });
		if (res.error === 0) {
			emits('update:modelValue', {
				type: res.data.type,
				account_header: res.data.account_header,
				account_name: res.data.account_name,
				account_no: res.data.account_no
			});
		} else {
			emits('update:modelValue', { type: state.currentValue });
		}
		resolve();
	});
};

const onConfirm = async () => {
	if (state.currentValue === '') {
		sheep.$tools.toast('请选择提现方式');
		return;
	}
	await getWalletAccountInfo();
	hideModal();
};

const showModal = () => {
	hooksModal.showModal('accountType');
};
const hideModal = () => {
	hooksModal.hideModal();
};

defineExpose({
	showModal
});
onBeforeMount(async () => {
	await getWalletAccountInfo();
});
</script>

<style lang="scss" scoped>
.ss-modal-box {
	border-radius: 30rpx 30rpx 0 0;
	max-height: 1000rpx;

	.modal-header {
		position: relative;
		padding: 60rpx 40rpx 40rpx;

		.modal-title {
			font-size: 32rpx;
			font-weight: bold;
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
