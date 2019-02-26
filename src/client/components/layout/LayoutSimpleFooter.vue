<template>
	<footer class="LayoutSimpleFooter">
		<div class="LayoutSimpleFooter_content container">
			<div class="LayoutSimpleFooter_links">
				<router-link
					activeClass="LayoutSimpleFooter_link-active"
					class="LayoutSimpleFooter_link"
					v-for="(item, index) in menuItems"
					:key="index"
					:to="{ name: item.routeName }"
				>
					{{ item.label }}
				</router-link>
			</div>
			<div class="LayoutSimpleFooter_legal">
				<p>© 2019 Daisy, Inc.</p>
			</div>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'LayoutSimpleFooter',
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

.LayoutSimpleFooter {
	@_linkColor: lighten(@colors_dark1, 20%);
	@_linkColor-active: darken(@_linkColor, 20%);
	@_linkColor-hover: darken(@_linkColor, 10%);
	@_boxShadow: @common_topBoxShadow;

	flex-shrink: 0;
	box-shadow: @_boxShadow;

	&_content {
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	&_link {
		padding: .5rem;
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
		margin: 0;
		padding: 0;
		display: flex;
	}
}
</style>
