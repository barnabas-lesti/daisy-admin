<template>
	<div class="Foods">
		<h1>Foods</h1>
		<FoodsTable :initialItems="foods" />
	</div>
</template>

<script>
import httpService from '../../services/httpService';
import FoodsTable from '../modules/FoodsTable.vue';

export default {
	components: {
		FoodsTable,
	},
	created () {
		httpService.get('/foods')
			.then(foods => {
				this.foods = foods;
			});
	},
	data () {
		return {
			foods: [],
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/partials.less';

.Foods {
	&:extend(.page);
}
</style>
