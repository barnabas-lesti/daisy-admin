<template>
	<form
		class="SearchInput"
		@submit.prevent="emitSearch($event)"
	>
		<input
			class="SearchInput_input input"
			type="text"
			ref="searchInput"
			v-model="searchString"
			@input="onInput()"
		/>
		<input
			class="SearchInput_input button is-info"
			type="submit"
			value="Search"
			v-if="!autoSearch"
			:disabled="disabled"
		/>
	</form>
</template>

<script>
const DEFAULT_THROTTLE = 500;

export default {
	name: 'SearchInput',
	props: {
		autoSearch: Boolean,
		disabled: Boolean,
		initialValue: String,
	},
	methods: {
		emitSearch (searchString) {
			this.$emit('search', { searchString });
		},

		onInput () {
			if (this.inputThrottleId) {
				window.clearTimeout(this.inputThrottleId);
			}
			this.inputThrottleId = window.setTimeout(() => {
				this.emitSearch(this.searchString);
			}, DEFAULT_THROTTLE);
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
.SearchInput {
	display: flex;

	&_input {
		margin-right: 1rem;

		&:last-of-type {
			margin-right: 0;
		}
	}
}
</style>
