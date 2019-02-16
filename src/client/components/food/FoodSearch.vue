<template>
	<form
		class="FoodSearch"
		@submit.prevent="emitSearch($event)"
	>
		<input
			class="_input input"
			type="text"
			ref="searchInput"
			v-model="searchString"
			:disabled="disabled"
		/>
		<input
			class="_button button is-info"
			type="submit"
			value="Search"
			:disabled="disabled"
		/>
	</form>
</template>

<script>
export default {
	name: 'FoodSearch',
	props: {
		initialValue: {
			default: '',
			type: String,
		},
		disabled: {
			default: false,
			type: Boolean,
		},
	},
	methods: {
		emitSearch () {
			this.$emit('search', { searchString: this.searchString });
		},
	},
	data () {
		return {
			searchString: this.initialValue,
		};
	},
};
</script>

<style lang="less">
.FoodSearch {
	display: flex;

	._input {
		margin-right: 1rem;
	}
}
</style>
