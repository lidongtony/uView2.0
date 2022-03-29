<template>
	<ui-modal class="add-bank-wrap" name="accountInfoModal" mask="40" align="bottom" ui="ss-r-t-30" :showCancel="false" :option="false">
		<view class="ss-modal-box bg-white ss-flex-col">
			<view class="modal-header ss-flex-col ss-col-left">
				<text class="cicon-close-round close-icon" @tap="hideModal"></text>
				<text v-if="props.modelValue.type === 'bank'" class="modal-title ss-m-b-20">绑定银行卡</text>
				<text v-if="props.modelValue.type === 'wechat'" class="modal-title ss-m-b-20">绑定微信</text>
				<text v-if="props.modelValue.type === 'alipay'" class="modal-title ss-m-b-20">绑定支付宝</text>
			</view>
			<view class="modal-content ss-flex-1 ss-p-b-100">
				<block v-if="props.modelValue.type === 'bank'">
					<ui-form ref="form" :model="state.bank.model" :rules="state.bank.rules" hasClear labelPosition="left" :labelStyle="{ fontWeight: 'bold' }">
						<ui-form-item prop="account_name" title="持卡人"><ui-input placeholder="请输入持卡人" v-model="state.bank.model.account_name"></ui-input></ui-form-item>
						<ui-form-item prop="account_header" title="开户行"><ui-input placeholder="请输入开户行" v-model="state.bank.model.account_header"></ui-input></ui-form-item>
						<ui-form-item prop="account_no" title="银行卡号"><ui-input placeholder="请输入银行卡号" v-model="state.bank.model.account_no"></ui-input></ui-form-item>
					</ui-form>
				</block>

				<block v-if="props.modelValue.type === 'wechat'">
					<ui-form ref="form" :model="state.wechat.model" :rules="state.wechat.rules" hasClear labelPosition="left" :labelStyle="{ fontWeight: 'bold' }">
						<ui-form-item prop="account_name" title="真实姓名">
							<ui-input placeholder="请输入您的真实姓名" v-model="state.wechat.model.account_name"></ui-input>
						</ui-form-item>
					</ui-form>
				</block>

				<block v-if="props.modelValue.type === 'alipay'">
					<ui-form ref="form" :model="state.alipay.model" :rules="state.alipay.rules" hasClear labelPosition="left" :labelStyle="{ fontWeight: 'bold' }">
						<ui-form-item prop="account_name" title="真实姓名">
							<ui-input placeholder="请输入您的真实姓名" v-model="state.alipay.model.account_name"></ui-input>
						</ui-form-item>
						<ui-form-item prop="account_no" title="支付宝">
							<ui-input placeholder="请输入支付宝 邮箱/手机号" v-model="state.alipay.model.account_no"></ui-input>
						</ui-form-item>
					</ui-form>
				</block>
			</view>
			<view class="modal-footer ss-flex ss-row-center ss-col-center"><button class="ss-reset-button save-btn" @tap="onSave">保存</button></view>
		</view>
	</ui-modal>
</template>

<script setup>
import { ref, reactive, unref, watchPostEffect, watch } from "vue";
import { sheep } from "@/sheep";
import useModal from "@/sheep/composables/modal.js";
import { realName, bankName, bankCode, alipayAccount } from "@/sheep/common/validate/form";

const hooksModal = useModal();
const form = ref(null);
const props = defineProps({
	modelValue: {
		type: Object,
		default() {}
	}
});
watch(
	() => props.modelValue,
	(newValue, oldValue) => {
		setModelValue(newValue);
	}
);

function setModelValue(modelValue) {
	Object.keys(state[modelValue.type].model).forEach(key => {
		state[modelValue.type].model[key] = modelValue[key];
	});
}

const emits = defineEmits(["update:modelValue"]);
// 数据
const state = reactive({
	bank: {
		model: {
			account_name: "",
			account_header: "",
			account_no: ""
		},
		rules: {
			account_name: realName,
			account_header: bankName,
			account_no: bankCode
		}
	},
	alipay: {
		model: {
			account_name: "",
			account_no: ""
		},
		rules: {
			account_name: realName,
			account_no: alipayAccount
		}
	},
	wechat: {
		model: {
			account_name: ""
		},
		rules: {
			account_name: realName
		}
	}
});
setModelValue(props.modelValue);
const showModal = () => {
	hooksModal.showModal("accountInfoModal");
};
const hideModal = () => {
	hooksModal.hideModal();
};
const onSave = async () => {
	const validateResult = await unref(form).validate();
	console.log(validateResult, "rr");
	if (validateResult) {
		let data = {
			type: props.modelValue.type,
			account_header: state[props.modelValue.type].model.account_header,
			account_name: state[props.modelValue.type].model.account_name,
			account_no: state[props.modelValue.type].model.account_no
		};
		let res = await sheep.$apis.user.wallet.account.save(data);
		if (res.error === 0) {
			emits("update:modelValue", res.data);
			hideModal();
		}
	}
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
