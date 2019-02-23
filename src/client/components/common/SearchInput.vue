<template>
	<form
		class="SearchInput"
		@submit="onSubmit($event)"
	>
		<input
			v-model="searchString"
			class="SearchInput_input input"
			type="text"
			ref="searchInput"
			:placeholder="placeholder"
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
		autoSearch: Boolean,
		disabled: Boolean,
		initialValue: String,
		placeholder: String,
	},
	methods: {
		clearThrottle () {
			if (this.inputThrottleId) {
				window.clearTimeout(this.inputThrottleId);
			}
		},

		emitSearch (searchString) {
			this.$emit('search', { searchString });
		},

		onInput () {
			this.clearThrottle();
			this.inputThrottleId = window.setTimeout(() => {
				this.emitSearch(this.searchString);
			}, DEFAULT_THROTTLE);
		},
		onSubmit (event) {
			event.preventDefault();

			this.clearThrottle();
			this.emitSearch(this.searchString);
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
