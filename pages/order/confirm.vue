<template>
	<ui-layout class="order-confirm-wrap" navTitle="确认订单">
		<view class="address-box bg-white ss-m-b-14 ss-r-b-20" @tap="onSelectAddress">
			<ss-address-item :item="state.addressInfo" :hasBorderBottom="false" @tap="sheep.$router.go('/pages/user/address/list')">
				<view class="ss-rest-button"><text class="_icon-forward"></text></view>
			</ss-address-item>
		</view>
		<view class="order-card-box ss-r-20 bg-white ss-p-20 ss-m-b-14">
			<template v-for="item in state.orderInfo.goods_list" :key="item.goods.id">
				<ss-order-card
					:img="item.goods.image"
					:title="item.goods.title"
					:skuText="getSkuText(item.current_sku_price?.goods_sku_text)"
					:price="item.current_sku_price.price"
					:num="item.goods_num"
				></ss-order-card>
			</template>
			<view class="order-item ss-flex ss-col-center ss-row-between">
				<view class="item-title">配送方式</view>
				<view class="ss-flex ss-col-center">
					<text class="item-value">物流快递</text>
					<text class="_icon-forward item-icon"></text>
				</view>
			</view>
			<view class="order-item ss-flex ss-col-center ss-row-between">
				<view class="item-title">订单备注</view>
				<view class="ss-flex ss-col-center">
					<ui-input
						class="ss-flex-1 remark-input"
						type="text"
						placeholderStyle="color: #999;fontSize: 26rpx"
						placeholder-class="item-placeholder"
						v-model="state.orderPayload.remark"
						placeholder="建议留言前先与商家沟通"
					/>
				</view>
			</view>
		</view>
		<!-- 合计 -->
		<view class="total-card-box ss-p-20 ss-r-20 bg-white ss-m-b-14">
			<view class="total-box-content border-bottom">
				<view class="order-item ss-flex ss-col-center ss-row-between">
					<view class="item-title">商品金额</view>
					<view class="ss-flex ss-col-center">
						<text class="item-value">￥{{ state.orderInfo.goods_amount }}</text>
					</view>
				</view>
				<view class="order-item ss-flex ss-col-center ss-row-between">
					<view class="item-title">运费</view>
					<view class="ss-flex ss-col-center">
						<text class="item-value">+￥{{ state.orderInfo.dispatch_amount }}</text>
					</view>
				</view>
				<view class="order-item ss-flex ss-col-center ss-row-between">
					<!-- <view v-if="state.orderInfo.coupon_discount_fee > 0" class="order-item ss-flex ss-col-center ss-row-between"> -->
					<view class="item-title">优惠券</view>
					<view class="ss-flex ss-col-center">
						<text class="item-value text-red">-￥{{ state.orderInfo.coupon_discount_fee }}</text>
						<text class="_icon-forward item-icon"></text>
					</view>
				</view>
				<view class="order-item ss-flex ss-col-center ss-row-between">
					<!-- <view v-if="state.orderInfo.promo_discount_fee > 0" class="order-item ss-flex ss-col-center ss-row-between"> -->
					<view class="item-title">满额折扣</view>
					<view class="ss-flex ss-col-center">
						<text class="item-value text-red">-￥{{ state.orderInfo.promo_discount_fee }}</text>
						<text class="_icon-forward item-icon"></text>
					</view>
				</view>
			</view>
			<view class="total-box-footer ss-flex ss-row-right">
				<view class="total-text-box ss-flex">
					<view class="title ss-font-28">合计：</view>
					<view class="total-num ss-font-28 text-red">￥{{ state.orderInfo.goods_amount }}</view>
				</view>
			</view>
		</view>
		<!-- 发票 -->
		<view class="invoce ss-p-20 ss-r-20 bg-white ss-m-b-14">
			<view class="order-item ss-flex ss-col-center ss-row-between">
				<view class="item-title">发票申请</view>
				<view class="ss-flex ss-col-center" @tap="sheep.$router.go('/pages/user/invoice/list')">
					<text class="item-value">不开具发票</text>
					<text class="_icon-forward item-icon"></text>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<ui-fixed bottom :opacity="false" bg="bg-white" placeholder :noFixed="false" :index="200">
			<view class="footer-box border-top ss-flex ss-row-between ss-p-x-20">
				<view class="total-box ss-flex">
					<view class="total-num ss-font-26 ss-m-r-20">共{{ state.totalNumber }}件</view>
					<view class="total-text-box ss-flex">
						<view class="title ss-font-30">需支付：</view>
						<view class="total-num ss-font-30 text-red">{{ state.orderInfo.pay_fee }}</view>
					</view>
				</view>
				<!-- TODO 提交订单时防抖loading -->
				<button class="ss-reset-button ui-BG-Main-Gradient ss-r-40 submit-btn" @tap="onConfirm">提交订单</button>
				<!-- 倒计按钮 -->
				<button v-if="state.status === 'pay'" class="ss-reset-button ui-BG-Main-Gradient ss-r-40 submit-btn ss-flex-col ss-row-center ss-col-center" @tap="onPay">
					<text class="goto-pay-text">继续支付</text>
					<ui-count-down :timestamp="86400" :autoplay="true" font-size="20" color="#fff" bg-color="" separator-color="#fff"></ui-count-down>
				</button>
				<!-- 交易取消 -->
				<button v-if="state.status === 'cancel'" class="ss-reset-button ss-r-40 cancel-btn" @tap="onSubmit">交易已取消</button>
			</view>
		</ui-fixed>
		<!-- 发票 -->
		<apply-invoice-modal ref="applyInvoiceModalRef"></apply-invoice-modal>
	</ui-layout>
</template>

<script setup>
import { computed, watch, ref, reactive, watchPostEffect, onBeforeMount, unref, onMounted, nextTick } from 'vue';
import { onLoad, onPageScroll, onShow } from '@dcloudio/uni-app';
import applyInvoiceModal from './components/apply-invoice-modal.vue';
import { sheep } from '@/sheep';
import store from '@/sheep/store';
import _ from 'lodash';

const state = reactive({
	status: '',
	orderPayload: {},
	orderInfo: {},
	addressInfo: {},
	totalNumber: 0
});

const getSkuText = e => {
	e ? e.join(',') : '';
};
// 点击确定
const applyInvoiceModalRef = ref(null);
const onSubmit = () => {
	unref(payModal).showModal();
};
// 发票
const onApplyInvoice = () => {
	unref(applyInvoiceModalRef).showModal();
};
// 选择地址 TODO: 此处返回需要触发两次 不知道啥原因
const onSelectAddress = () => {
	sheep.$router.go('/pages/user/address/list');
};
const onConfirm = async () => {
	const data = {
		...state.orderPayload,
		address_id: state.addressInfo.id
	};
	// 前置检查
	// if()
	const createResult = await sheep.$apis.order.create(data);
	if (createResult.error === 0) {
		sheep.$router.redirect('/pages/pay/index', { orderSN: createResult.data.order_sn });
	}
};

uni.$on('SELECT_ADDRESS', e => {
	state.addressInfo = e.addressInfo;
	state.orderPayload.address_id = state.addressInfo.id;
	getOrderInfo();
});

const onPayConfirm = e => {
	console.log(e, 'pay');
};

// 检查库存\计算订单价格\渲染页面
const getOrderInfo = async () => {
	let calcResult = await sheep.$apis.order.calc(state.orderPayload);
	state.orderInfo = calcResult.data;
	console.log(state.orderInfo, 3333333);
	state.orderInfo.goods_list.forEach(item => {
		state.totalNumber += item.goods_num;
	});
};
onLoad(async options => {
	// const options = sheep.$router.getCurrentPage('options');
	console.log(options, 11111111111);
	if (options.data) {
		state.status = 'confirm'; // 确认订单模式
		// TODO: 确认订单时能实时删除商品 改变数量 更换规格（情况可能很多，还要考虑活动 太难了）
		state.orderPayload = JSON.parse(options.data);
		// 1.获取用户默认地址（考虑在用户详情处返回）
		state.addressInfo = (await sheep.$apis.user.address.default()).data;
		if (state.addressInfo?.id) {
			state.orderPayload.address_id = state.addressInfo.id;
		}

		getOrderInfo();
		// 3.更换地址
		// 5.创建订单成功后
		// 5.1 替换页面参数为orderId
		// 6.渲染付款方式
		// 7.拉起预支付
		// 8.检查模版消息
	}
});
</script>

<style lang="scss" scoped>
.order-item {
	height: 80rpx;

	.item-title,
	.item-value {
		font-size: 28rpx;
		font-weight: 500;
	}

	.item-icon {
		color: $dark-9;
	}
	.remark-input {
		text-align: right;
	}
	.item-placeholder {
		color: $dark-9;
		font-size: 26rpx;
		text-align: right;
	}
}

.total-text-box {
	height: 90rpx;
}

.footer-box {
	height: 100rpx;

	.total-num {
		color: $dark-9;
	}

	.submit-btn {
		width: 240rpx;
		height: 80rpx;
		font-size: 26rpx;
		.goto-pay-text {
			line-height: 28rpx;
		}
	}
	.cancel-btn {
		width: 240rpx;
		height: 80rpx;
		font-size: 26rpx;
		background-color: #e5e5e5;
		color: $dark-9;
	}
}
</style>
