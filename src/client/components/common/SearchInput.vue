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
			v-if="!autoSearch"
			class="SearchInput_input button is-info"
			type="submit"
			value="Search"
			:disabled="disabled"
		/>
	</form>
</template>

<script>
const DEFAULT_THROTTLE = 500;

export default {
	name: 'SearchInput',
	props: {
		initialValue: {
			default: '',
			type: String,
		},
		disabled: {
			default: false,
			type: Boolean,
		},
		autoSearch: {
			default: false,
			type: Boolean,
		},
	},
	methods: {
		emitSearch () {
			this.$emit('search', { searchString: this.searchString });
		},

		onInput () {
			if (this.inputThrottleId) {
				window.clearTimeout(this.inputThrottleId);
			}

			this.inputThrottleId = window.setTimeout(() => {
				this.emitSearch();
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
