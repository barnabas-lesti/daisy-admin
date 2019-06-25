<template>
	<footer class="layout-footer">
		<div class="layout-footer_content container">
			<div class="layout-footer_links">
				<router-link
					v-for="(item, index) in menuItems"
					:key="index"
					:active-class="!item.exact ? 'layout-footer_link-active' : ''"
					:exact-active-class="item.exact ? 'layout-footer_link-active' : ''"
					:to="{ name: item.routeName }"
					class="layout-footer_link"
				>
					{{ $t(item.labelKey) }}
				</router-link>
			</div>
			<div v-html="$t('common.copyrightHtml')" />
		</div>
	</footer>
</template>

<script>
const menuItems = [
	{
		icon: 'home',
		labelKey: 'common.menuItems.home',
		routeName: 'locale',
		exact: true,
	},
	// {
	// 	icon: 'calculator',
	// 	labelKey: 'common.menuItems.calculator',
	// 	routeName: 'calculator',
	// },
	{
		icon: 'food',
		labelKey: 'common.menuItems.food',
		routeName: 'locale-food',
	},
	// {
	// 	icon: 'recipes',
	// 	labelKey: 'common.menuItems.recipes',
	// 	routeName: 'recipes',
	// },
	// {
	// 	icon: 'exercise',
	// 	labelKey: 'common.menuItems.exercises',
	// 	routeName: 'exercises',
	// },
];

export default {
	name: 'LayoutFooter',
	data () {
		return {
			menuItems,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables.less';

.layout-footer {
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
