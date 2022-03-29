<template>
	<view>自定义头部导航：{{data}}</view>
</template>

<script setup>
	const props = defineProps({
		data: {
			type: Object,
			default () {}
		}
	})
</script>

<style>
</style>
