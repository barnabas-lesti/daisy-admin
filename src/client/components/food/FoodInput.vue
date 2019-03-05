<template>
	<div class="FoodInput field">
		<div class="control">
			<label
				v-if="label"
				class="label"
			>
				{{ label }}
			</label>
			<input
				v-if="type !== 'select'"
				:type="type"
				:value="value"
				:class="[
					'input',
					'FoodInput_input',
					{ 'FoodInput_input-hasPostfix': postfix },
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
				class="FoodInput_postfix"
			>
				{{ postfix }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'FoodInput',
	methods: {
		onInput ({ target }) {
			this.$emit('input', target.value);
		},
	},
	props: {
		label: String,
		value: [
			String,
			Number,
		],
		type: {
			type: String,
			default: 'number',
		},
		postfix: String,
	},
};
</script>

<style lang="less">
.FoodInput {
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
