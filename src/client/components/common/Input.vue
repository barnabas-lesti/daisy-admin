<template>
	<div class="Input field">
		<div class="control">
			<label
				v-if="label"
				class="label"
			>
				{{ label }}
			</label>

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
			<textarea
				v-if="type === 'textarea'"
				class="textarea"
				:value="value"
				@input="onInput($event)"
			></textarea>
			<input
				v-else
				:type="type"
				:value="value"
				:class="[
					'input',
					'Input_inputElement',
					{ 'Input_inputElement-hasPostfix': postfix },
				]"
				@input="onInput($event)"
			/>

			<span
				v-if="postfix"
				class="Input_postfix"
			>
				{{ postfix }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Input',
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
.Input {
	&_postfix {
			display: inline-block;
			margin-top: 0.5rem;
			margin-left: .5rem;
	}

	&_inputElement {
		&-hasPostfix {
			width: 90%;
		}
	}
}
</style>
