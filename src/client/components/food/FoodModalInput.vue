<template>
	<div class="FoodModalInput field">
		<div class="control">
			<label class="label">{{ label }}</label>
			<input
				v-if="type !== 'select'"
				:type="type"
				:value="value"
				:class="[
					'input',
					'FoodModalInput_input',
					{ 'FoodModalInput_input-hasPostfix': postfix },
				]"
				@input="onInput($event)"
			/>
			<div
				class="select"
				v-if="type === 'select'"
			>
				<select
					:value="value"
					@input="onInput($event)"
				>
					<option value="g">g</option>
					<option value="ml">ml</option>
				</select>
			</div>
			<span
				class="FoodModalInput_postfix"
				v-if="postfix"
			>
				{{ postfix }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FoodModalInput',
	methods: {
		onInput ({ target }) {
			this.$emit('input', target.value);
		},
	},
	props: {
		label: {
			required: true,
			type: String,
		},
		value: [
			String,
			Number,
		],
		type: {
			type: String,
			default: 'text',
		},
		postfix: String,
	},
};
</script>

<style lang="less">
.FoodModalInput {
	&_postfix {
			display: inline-block;
			margin-top: 0.5rem;
			margin-left: .5rem;
	}

	&_input {
		&-hasPostfix {
			width: 90%;
		}
	}
}
</style>
