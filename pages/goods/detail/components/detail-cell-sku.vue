<template>
	<detail-cell class="ss-p-x-20 ss-p-y-10 ss-bg-white" @tap="hooksModal.showModal('ssSkuModal')" label="选择" v-model="value"></detail-cell>
</template>

<script setup>
import { computed } from 'vue';
import useModal from '@/sheep/composables/modal.js';
const hooksModal = useModal();

import detailCell from './detail-cell.vue';

const props = defineProps({
	modelValue: {
		type: Array,
		default() {
			return [];
		}
	},
	skus: {
		type: Array,
		default() {
			return [];
		}
	}
});
const value = computed(() => {
	let str = '';
	if (props.modelValue.length > 0) {
		props.modelValue.forEach((item, index) => {
			str += props.skus[index].name + ':' + item + ' ';
		});
	} else {
		str = '请选择商品规格';
	}
	return str;
});
</script>
