<template>
	<div
		:class="[
			'LayoutSimpleNotificationItem',
			{ 'LayoutSimpleNotificationItem-error': type === 'error' },
			{ 'LayoutSimpleNotificationItem-success': type === 'success' },
		]"
	>
		<div class="LayoutSimpleNotificationItem_content">
			<slot />
		</div>
		<Icon
			class="LayoutSimpleNotificationItem_closeIcon"
			type="close"
			@click.native="close()"
		/>
	</div>
</template>

<script>
import Icon from '../common/Icon';

export default {
	name: 'LayoutSimpleNotificationItem',
	components: {
		Icon,
	},
	props: {
		type: String,
	},
	methods: {
		close () {
			this.$emit('close');
		},
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LayoutSimpleNotificationItem {
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
