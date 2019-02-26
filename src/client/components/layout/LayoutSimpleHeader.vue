<template>
	<header class="LayoutSimpleHeader">
		<div class="container">
			<div class="LayoutSimpleHeader_links">
				<router-link
					activeClass="LayoutSimpleHeader_link-active"
					class="LayoutSimpleHeader_link"
					v-for="(item, index) in menuItems"
					:key="index"
					:to="{ name: item.routeName }"
				>
					{{ item.label }}
				</router-link>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'LayoutSimpleHeader',
	props: {
		menuItems: {
			default: () => [],
			type: Array,
		},
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.LayoutSimpleHeader {
	@_linkColor: @colors_dark3;
	@_linkColor-active: darken(@_linkColor, 20%);
	@_linkColor-hover: darken(@_linkColor, 10%);

	box-shadow: @common_bottomBoxShadow;

	&_link {
		padding: 1rem;
		display: inline-block;
		font-weight: 500;
		color: @_linkColor;

		&:hover {
			color: @_linkColor-hover;
		}

		&-active {
			color: @_linkColor-active;
		}
	}

	&_links {
		display: flex;
		justify-content: flex-end;
	}
}
</style>
