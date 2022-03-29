<template>
	<ui-layout class="view-wrap" :navTitle="state.model.id ? '编辑发票' : '添加发票'">
		<ui-form ref="invoiceFormRef" ui="" :model="state.model" :rules="state.rules" hasClear labelPosition="left" :labelStyle="{ fontWeight: 'bold' }">
			<ui-form-item prop="type" title="发票类型" ui="bg-white">
				<ui-radio-group v-model="state.model.type">
					<ui-radio v-for="(item, index) in state.invoiceList" :key="index" :label="item.name" v-model="item.value" :checked="item.checked" ui="check" />
				</ui-radio-group>
			</ui-form-item>
			<block v-if="state.model.type === 1">
				<ui-form-item ui="bg-white" prop="consignee" title="名称"><ui-input v-model="state.model.consignee" placeholder="姓名 (必填)"></ui-input></ui-form-item>
				<ui-form-item ui="bg-white" prop="mobile" title="手机号">
					<ui-input v-model="state.model.mobile" type="number" placeholder="请输入手机号 (必填)"></ui-input>
				</ui-form-item>
			</block>
			<block v-else>
				<ui-form-item ui="bg-white" prop="consignee" title="单位名称"><ui-input v-model="state.model.consignee" placeholder="单位名称 (必填)"></ui-input></ui-form-item>
				<ui-form-item ui="bg-white" prop="mobile" title="手机号">
					<ui-input v-model="state.model.mobile" type="number" placeholder="请输入手机号 (必填)"></ui-input>
				</ui-form-item>
				<ui-form-item ui="bg-white" prop="tax" title="税号">
					<ui-input v-model="state.model.mobile" type="number" placeholder="纳税人识别号 (必填)"></ui-input>
				</ui-form-item>
				<ui-form-item ui="bg-white" prop="tax" title="单位地址"><ui-input v-model="state.model.mobile" type="number" placeholder="单位地址信息"></ui-input></ui-form-item>
				<ui-form-item ui="bg-white" prop="tax" title="开户银行"><ui-input v-model="state.model.mobile" type="number" placeholder="开户银行名称"></ui-input></ui-form-item>
				<ui-form-item ui="bg-white" prop="tax" title="银行账户"><ui-input v-model="state.model.mobile" type="number" placeholder="银行账户号码"></ui-input></ui-form-item>
			</block>
		</ui-form>
		<ui-fixed bottom :opacity="false" bg="" placeholder :noFixed="false" :index="200">
			<view class="footer-box ss-flex-col ss-row-between ss-p-20">
				<button class="ss-reset-button save-btn ss-m-b-20" @tap="onSave">保存</button>
				<button v-if="state.model.id" class="ss-reset-button cancel-btn" @tap="onDelete">删除</button>
			</view>
		</ui-fixed>
	</ui-layout>
</template>

<script setup>
import { computed, watch, ref, reactive, watchPostEffect, onBeforeMount, unref, onMounted, nextTick } from "vue";
import { sheep } from "@/sheep";
import { consignee, mobile, address } from "@/sheep/common/validate/form";
const invoiceFormRef = ref(null);
const state = reactive({
	model: {
		type: 1,
		consignee: "",
		mobile: "",
		area_text: "",
		address: "",
		is_default: false
	},
	rules: {
		consignee,
		mobile,
		address
	},
	invoiceList: [
		{
			name: "个人",
			value: 1
		},
		{
			name: "企/事业单位",
			value: 2
		}
	]
});

const onSave = async () => {
	//TODO: 表单验证
	const validate = unref(invoiceFormRef).validate();
	console.log("validate", validate);

	state.model.province_name = "河南省";
	state.model.province_id = 1;
	state.model.city_name = "郑州市";
	state.model.city_id = 2;
	state.model.district_name = "金水区";
	state.model.district_id = 3;
	state.model.is_default = state.model.is_default ? 1 : 0;
	let res = null;
	if (state.model.id) {
		res = await sheep.$apis.user.invoice.update(state.model.id, state.model);
	} else {
		res = await sheep.$apis.user.invoice.create(state.model);
	}
	if (res.error === 0) {
		sheep.$router.back();
	}
};
const onDelete = () => {
	// TODO: 确认弹框
	sheep.$apis.user.invoice.delete(state.model.id);
	sheep.$router.back();
};
onBeforeMount(async () => {
	const options = sheep.$router.getCurrentPage("options");
	if (options.id) {
		let data = await sheep.$apis.user.invoice.detail(options.id);
		if (data.error === 0) {
			state.model = data.data;
		}
	}
});
</script>

<style lang="scss" scoped>
.footer-box {
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
</style>
