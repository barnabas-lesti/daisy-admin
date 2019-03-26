<template>
	<footer class="LayoutSimpleFooter">
		<div class="LayoutSimpleFooter_content container">
			<div class="LayoutSimpleFooter_links">
				<router-link
					v-for="(item, index) in menuItems"
					class="LayoutSimpleFooter_link"
					:activeClass="!item.exact ? 'LayoutSimpleFooter_link-active' : ''"
					:exactActiveClass="item.exact ? 'LayoutSimpleFooter_link-active' : ''"
					:key="index"
					:to="{ name: item.routeName }"
				>
					{{ $t(item.labelKey) }}
				</router-link>
			</div>
			<div v-html="$t('common.copyrightHtml')"></div>
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
@import (reference) '../../styles/variables.less';

.LayoutSimpleFooter {
	@_linkColor: #607080;
	@_linkColor-active: #242f3a;
	@_linkColor-hover: #2a3844;
	@_boxShadow: 0 -2px 4px 0 rgba(43, 43, 43, .1);

	flex-shrink: 0;
	box-shadow: @_boxShadow;

	&_content {
		padding: 2rem 1rem;
		text-align: center;
	}

	&_links {
		margin-bottom: 1rem;
	}

	&_link {
		padding: .5rem;
		font-weight: 600;
		color: @_linkColor;
		display: block;

		&:hover {
			color: @_linkColor-hover;
		}

		&-active {
			color: @_linkColor-active;
		}
	}

	@media screen and (min-width: @breakpoint_tabletMinWidth) {
		&_content {
			padding: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		&_links {
			display: flex;
			margin-bottom: 0;
		}

		&_link {
			display: inline-block;
		}
	}
}
</style>
