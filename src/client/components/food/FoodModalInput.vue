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
					'_input',
					{ '_input-hasPostfix': postfix },
				]"
				@input="onInput($event)"
			/>
			<div
				v-if="type === 'select'"
				class="select"
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
				v-if="postfix"
				class="_postfix"
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
		value: {
			type: [
				String,
				Number,
			],
		},
		type: {
			type: String,
			default: 'text',
		},
		postfix: {
			type: String,
		},
	},
};
</script>

<style lang="less">
.FoodModalInput {
	._postfix {
			display: inline-block;
			margin-top: 0.5rem;
			margin-left: .5rem;
	}

	._input-hasPostfix {
		width: 90%;
	}
}
</style>
