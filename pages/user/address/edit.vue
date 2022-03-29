<template>
	<ui-layout class="view-wrap" :navTitle="state.model.id ? '编辑收货地址' : '新增收货地址'">
		<ui-form ref="addressFormRef" ui="" :model="state.model" :rules="state.rules" hasClear labelPosition="left" :labelStyle="{ fontWeight: 'bold' }">
			<ui-form-item ui="bg-white" prop="consignee" title="收货人"><ui-input v-model="state.model.consignee" placeholder="请填写收货人姓名" /></ui-form-item>
			<ui-form-item ui="bg-white" prop="mobile" title="手机号"><ui-input v-model="state.model.mobile" type="number" placeholder="请输入手机号"></ui-input></ui-form-item>
			<ui-form-item ui="bg-white" title="省市区" @tap="state.showRegion = true">
				<ui-input v-model="state.regionText" disabled type="text" placeholder="请选择省市区"></ui-input>
			</ui-form-item>
			<ui-form-item ui="bg-white" prop="address" title="详细地址" :formItemStyle="{ alignItems: 'flex-start' }" :labelStyle="{ lineHeight: '5em' }">
				<ui-input type="textarea" v-model="state.model.address" placeholder="请输入详细地址"></ui-input>
			</ui-form-item>
			<view class="ss-m-y-20">
				<ui-form-item ui="bg-white" labelWidth="100" prop="is_default" title="设为默认地址">
					<view class=" ss-flex ss-row-right ss-flex-1"><ui-switch v-model="state.model.is_default"></ui-switch></view>
				</ui-form-item>
			</view>
		</ui-form>
		<ui-fixed bottom :opacity="false" bg="" placeholder :noFixed="false" :index="200">
			<view class="footer-box ss-flex-col ss-row-between ss-p-20">
				<button class="ss-reset-button save-btn ss-m-b-20" @tap="onSave">保存</button>
				<button v-if="state.model.id" class="ss-reset-button cancel-btn" @tap="onDelete">删除</button>
			</view>
		</ui-fixed>
		<!-- 省市区 -->
		<ui-region-picker v-model="state.showRegion" @confirm="regionConfirm"></ui-region-picker>
	</ui-layout>
</template>

<script setup>
import { computed, watch, ref, reactive, watchPostEffect, onBeforeMount, unref, onMounted, nextTick } from "vue";
import { sheep } from "@/sheep";
import { onLoad, onPageScroll } from "@dcloudio/uni-app";
import _ from "lodash";
import { consignee, mobile, address } from "@/sheep/common/validate/form";
const addressFormRef = ref(null);
const state = reactive({
	showRegion: false,
	model: {
		consignee: "",
		mobile: "",
		address: "",
		is_default: false
	},
	rules: {
		consignee,
		mobile,
		address
	},
	regionText: computed(() => {
		if (!state.model.province_name) return "";
		return `${state.model.province_name}-${state.model.city_name}-${state.model.district_name}`;
	})
});

const regionConfirm = e => {
	state.model = {
		...state.model,
		...e
	};
};
const getAreaData = () => {
	if (_.isEmpty(uni.getStorageSync("areaData"))) {
		sheep.$apis.data.area().then(res => {
			if (res.error === 0) {
				uni.setStorageSync("areaData", state.areaData);
			}
		});
	}
};
const onSave = async () => {
	//TODO: 表单验证
	state.model.is_default = state.model.is_default ? 1 : 0;
	console.log("onSave: state.model", state.model);
	const validate = await unref(addressFormRef).validate();
	if (!validate) return;

	let res = null;
	if (state.model.id) {
		res = await sheep.$apis.user.address.update(state.model.id, state.model);
	} else {
		res = await sheep.$apis.user.address.create(state.model);
	}
	if (res.error === 0) {
		// sheep.$router.back();
	}
};
const onDelete = () => {
	// TODO: 确认弹框
	sheep.$apis.user.address.delete(state.model.id);
	sheep.$router.back();
};
onBeforeMount(async () => {
	const options = sheep.$router.getCurrentPage("options");
	getAreaData();
	if (options.id) {
		let res = await sheep.$apis.user.address.detail(options.id);
		if (res.error === 0) {
			state.model = res.data;
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
