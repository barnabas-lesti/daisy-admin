<template>
	<div
		:class="[
			'LayoutSimpleNotification',
			{ 'LayoutSimpleNotification-error': type === 'error' },
			{ 'LayoutSimpleNotification-success': type === 'success' },
		]"
	>
		<div
			v-if="title"
			class="LayoutSimpleNotification_header"
		>
			{{ title }}
		</div>
		<div class="LayoutSimpleNotification_content">
			<slot />
		</div>
		<Icon
			class="LayoutSimpleNotification_closeIcon"
			type="close"
			@click.native="close()"
		/>
	</div>
</template>

<script>
import Icon from '../common/Icon';

export default {
	name: 'LayoutSimpleNotification',
	components: {
		Icon,
	},
	props: {
		type: String,
		title: String,
	},
	methods: {
		close () {
			this.$emit('close');
		},
	},
	data () {
		return {};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LayoutSimpleNotification {
	@_infoBgColor: @colors_info0;
	@_successBgColor: @colors_success0;
	@_errorBgColor: @colors_error0;
	@_itemBoxShadow: @common_aroundBoxShadow;

	background-color: @_infoBgColor;
	padding: .5rem 1.5rem .5rem .5rem;
	border-radius: 4px;
	box-shadow: @_itemBoxShadow;
	position: relative;

	&-success {
		background-color: @_successBgColor;
	}

	&-error {
		background-color: @_errorBgColor;
	}

	&_header {
		font-size: .9em;
		font-weight: 500;
		margin-bottom: .25rem;
	}

	&_content {
		font-size: .8em;
	}

	&_closeIcon {
		position: absolute;
		top: .5rem;
		right: .5rem;

		&:hover {
			cursor: pointer;
		}
	}
}
</style>
