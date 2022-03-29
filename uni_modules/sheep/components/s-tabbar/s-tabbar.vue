<template>
	<view class="u-page__item">
		<u-tabbar value="0" :fixed="true" :placeholder="true" :safeAreaInsetBottom="true">
			<block v-if="tabbar?.lists.length > 0">
				<!-- <swiper-item> -->
				<view v-for="item in tabbar.lists" :key="item.path">
					<text @tap="$u.route({ type:'tab', url: item.path })">{{item.text}}</text>
				</view>
				<!-- </swiper-item> -->
			</block>
		</u-tabbar>
	</view>
</template>

<script setup>
	import {
		computed
	} from 'vue'
	import $u from '@/uni_modules/uview-ui'
	import sheep from '@/sheep';
	const tabbar = computed(() => {
		return sheep.$store.getters.basicData.tabbar
	})
	const props = defineProps({

	})
</script>

<style>
</style>
