<template>
	<ui-layout class="recharge-wrap" :bgColor="state.bgColor">
		<ui-navbar :back="true" backtext="充值" opacity status="light"></ui-navbar>
		<view class="recharge-card-box">
			<view class="input-label ss-m-b-50">
				充值金额
			</view>
			<view class="input-box ss-flex border-bottom ss-p-b-20">
				<text class="unit ss-m-r-26">￥</text>
				<ui-input v-model="state.rechargeMoney" type="number" placeholder="请输入充值金额"></ui-input>
			</view>
			<view class="face-value-box ss-flex ss-flex-wrap">
				<button class="ss-reset-button face-value-btn" v-for="item in state.faceValueList" :key="item.title"
					:class="[{'btn-active':state.curFaceValue === item.title}]" @tap="onCard(item.title)">
					<text class="face-value-title">{{item.title}}</text>
					<view v-show="item.tip" class="face-value-tag">
						{{item.tip}}
					</view>
				</button>
			</view>
			<button class="ss-reset-button save-btn ui-BG-Main-Gradient ss-m-t-60" @tap="onSave">确认充值</button>
		</view>
	</ui-layout>
</template>

<script setup>
	import {
		computed,
		watch,
		ref,
		reactive,
		watchPostEffect,
		onBeforeMount,
		unref,
		onMounted,
		nextTick
	} from "vue";
	import {
		sheep
	} from "@/sheep";

	import useModal from "@/sheep/composables/modal.js";
	const hooksModal = useModal();

	const state = reactive({
		showCheckoutCounter: false,
		bgColor: `linear-gradient(to bottom, var(--ui-BG-Main) 0%, #F6F6F6 30%)`,
		rechargeMoney: '',
		curFaceValue: 10,
		faceValueList: [{
				title: 10,
				value: 10,
				tip: ''
			},
			{
				title: 20,
				value: 20,
				tip: '送10元'
			},
			{
				title: 30,
				value: 30,
				tip: '送15元'
			},
			{
				title: 50,
				value: 50,
				tip: '送30元'
			},
			{
				title: 100,
				value: 100,
				tip: '送50元'
			},
			{
				title: 200,
				value: 200,
				tip: '送100元'
			}
		]
	})

	// 点击卡片
	const onCard = title => {
		state.curFaceValue = title
	}

	// 点击确定
	const ssCheckoutCounterRef = ref(null)
	const onSave = () => {
		unref(ssCheckoutCounterRef).showModal()
	}
</script>

<style lang="scss" scoped>
	.save-btn {
		width: 620rpx;
		height: 86rpx;
		border-radius: 44rpx;
		font-size: 30rpx;
	}

	.recharge-card-box {
		width: 690rpx;
		min-height: 756rpx;
		background: $white;
		border-radius: 20rpx;
		margin: 30rpx;
		padding: 30rpx;

		.input-label {
			font-size: 30rpx;
			font-weight: 500;
		}

		.unit {
			font-size: 48rpx;
			font-weight: 500;
		}

		.face-value-btn {
			width: 200rpx;
			height: 144rpx;
			border: 1px solid var(--ui-BG-Main);
			border-radius: 10rpx;
			position: relative;
			z-index: 1;
			margin-bottom: 15rpx;
			margin-right: 15rpx;

			&:nth-of-type(3n) {
				margin-right: 0;
			}

			.face-value-title {
				font-size: 36rpx;
				font-weight: 500;
				color: var(--ui-BG-Main);

				&::after {
					content: '元';
					font-size: 24rpx;
					margin-left: 6rpx;
				}
			}

			.face-value-tag {
				position: absolute;
				z-index: 2;
				height: 40rpx;
				line-height: 40rpx;
				background: var(--ui-BG-Main);
				opacity: 0.8;
				border-radius: 10rpx 0 20rpx 0;
				top: 0;
				left: 0;
				padding: 0 16rpx;
				font-size: 22rpx;
				color: $white;

			}

			&::before {
				position: absolute;
				content: ' ';
				width: 100%;
				height: 100%;
				background: var(--ui-BG-Main);
				opacity: 0.1;
				z-index: 0;
				left: 0;
				top: 0;
			}
		}

		.btn-active {
			z-index: 1;

			&::before {
				content: '';
				background: var(--ui-BG-Main);
				opacity: 1;
			}

			.face-value-title {
				color: $white;
				position: relative;
				z-index: 1;
			}

			.face-value-tag {
				background: $white;
				color: var(--ui-BG-Main);

			}
		}


	}
</style>
