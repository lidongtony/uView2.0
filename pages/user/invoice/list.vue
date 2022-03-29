<template>
	<ui-layout class="address-list-wrap" bgColor="#fff" navTitle="发票管理">
		<ss-address-item v-for="item in state.list" :key="item.id" :item="item" :isDefault="item.is_default" @tap="onSelect(item)"></ss-address-item>
		<ui-fixed bottom :opacity="false" bg="bg-white" placeholder :noFixed="false" :index="200">
			<view class="footer-box border-top ss-flex ss-row-between">
				<!-- 微信小程序和微信H5 -->
				<button
					@tap="onImportInvoice"
					v-show="['WechatMiniProgram', 'WechatOfficialAccount'].includes(sheep.$platform.name)"
					class="ss-reset-button border sync-wxaddress ss-m-20 ss-flex ss-row-center ss-col-center"
				>
					<text class="cicon-weixin ss-p-r-10" style="color:#09bb07;font-size: 40rpx;"></text>
					导入微信发票
				</button>
				<button class="ss-reset-button add-btn ss-m-20" @tap="sheep.$router.go('/pages/user/invoice/edit')">新增发票</button>
			</view>
		</ui-fixed>
	</ui-layout>
</template>

<script setup>
import { computed, watch, ref, reactive, watchPostEffect, onBeforeMount, unref, onMounted, nextTick } from "vue";
import { onShow } from "@dcloudio/uni-app";
import { sheep } from "@/sheep";
import store from "@/sheep/store";
import _ from "lodash";
const state = reactive({
	list: [],
	model: {}
});
const onSelect = invoiceInfo => {
	// const pages = sheep.$router.getCur();
	// const lastPage = pages[pages.length - 2];
	// if (!_.isEmpty(lastPage) && lastPage.route === "pages/order/confirm") {
	// sheep.$router.back();
	// uni.navigateBack();
	uni.$emit("SELECT_INVOICE", { invoiceInfo });
	sheep.$router.back();
	// }
};
const onImportInvoice = () => {
	wx.chooseInvoice({
		success: res => {
			state.model = JSON.stringify(res);
			console.log(res, "res");
			// this.jump('/pages/user/address/edit', { addressData: res });
		},
		fail: err => {
			console.log(err);
		}
	});
};
onShow(async () => {
	state.list = (await sheep.$apis.user.invoice.list()).data;
});
</script>

<style lang="scss" scoped>
.footer-box {
	.add-btn {
		flex: 1;
		background: linear-gradient(90deg, var(--ui-BG-Main), var(--ui-BG-Main-gradient));
		border-radius: 80rpx;
		font-size: 30rpx;
		font-weight: 500;
		line-height: 80rpx;
		color: $white;
		position: relative;
		z-index: 1;
	}

	.sync-wxaddress {
		flex: 1;
		line-height: 80rpx;
		background: $white;
		border-radius: 80rpx;
		font-size: 30rpx;
		font-weight: 500;
		color: $dark-6;
	}
}
</style>
