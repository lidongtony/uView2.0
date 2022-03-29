<template>
	<detail-cell label="玩法" v-model="state.spceText"></detail-cell>
</template>

<script setup>
	import { onBeforeMount, onMounted, ref, unref, reactive, computed, nextTick, getCurrentInstance } from 'vue';

	import detailCell from '../detail-cell.vue'

	const state = reactive({
		spceText: '开团/参团·邀请好友·人满发货（不满退款）'
	})
</script>

<style lang="scss" scoped>
</style>
