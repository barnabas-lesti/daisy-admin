<template>
	<div class="ProfileRegistrationInput field">
		<div class="control">
				<label
					v-if="label"
					class="label"
				>
					{{ label }}
				</label>
				<input
					class="input is-primary"
					:type="type"
					:placeholder="placeholder"
					:value="value"
					@input="onInput($event)"
				/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProfileRegistrationInput',
	props: {
		type: {
			default: 'text',
			type: String,
		},
		placeholder: String,
		label: String,
		value: String,
	},
	methods: {
		emitInput (value) {
			this.$emit('input', value);
		},

		onInput ({ target }) {
			this.emitInput(target.value);
		},
	},
};
</script>

<style lang="less">
.ProfileRegistrationInput {

}
</style>
