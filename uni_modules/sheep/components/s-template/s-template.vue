<template>
	<!-- 默认通用顶部导航栏 -->
	<block v-if="navbar">
		<s-navbar />
	</block>

	<!-- 自定义顶部导航栏 -->
	<block v-if="navbarData">
		<s-custom-navbar :data="navbarData" />
	</block>

	<!-- 页面内容插槽 -->
	<slot></slot>

	<!-- 底部导航 -->
	<s-tabbar :path="tabbar" />

</template>

<script setup>
	import {
		computed
	} from 'vue'
	const props = defineProps({
		title: {
			type: String,
			default: ''
		},
		navbar: {
			type: Boolean,
			default: false
		},
		customStyle: {
			type: Object,
			default () {}
		},
		// 强制显示底部导航
		tabbar: {
			type: String,
			default: ""
		},

	})
	const navbarData = computed(() => {
		if (props.customStyle?.header) {
			return props.customStyle.header;
		}
	})
</script>

<style>
</style>
