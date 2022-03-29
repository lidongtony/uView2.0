<template>
	<view>这是{{type}}</view>
</template>

<script setup>
	const props = defineProps({
		type: String,
		default: ''
	})
</script>

<style>
</style>
