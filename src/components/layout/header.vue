<template>
	<header class="layout-header">
		<Icon
			type="burger"
			:class="[
				'layout-header_toggle',
				{ 'layout-header_toggle-active': !isOpen }
			]"
			@click.native="toggleMenu()"
		/>
		<Icon
			type="close"
			:class="[
				'layout-header_toggle',
				{ 'layout-header_toggle-active': isOpen }
			]"
			@click.native="toggleMenu()"
		/>
		<div
			:class="[
				'layout-header_content container',
				{ 'layout-header_content-active': isOpen }
			]"
		>
			<router-link
				:to="{ name: 'home' }"
				class="layout-header_brand"
			>
				<img
					src="daisy-logo.jpg"
					class="layout-header_logo"
				>
			</router-link>
			<div class="layout-header_links">
				<router-link
					v-for="(item, index) in menuItems"
					:key="index"
					:active-class="!item.exact ? 'layout-header_link-active' : ''"
					:exact-active-class="item.exact ? 'layout-header_link-active' : ''"
					:to="{ name: item.routeName }"
					class="layout-header_link"
				>
					{{ $t(item.labelKey) }}
				</router-link>
			</div>
		</div>
	</header>
</template>

<script>
import Icon from '../common/icon';

export default {
	name: 'LayoutHeader',
	components: {
		Icon,
	},
	props: {
		menuItems: {
			default: () => [],
			type: Array,
		},
	},
	methods: {
		toggleMenu () {
			this.isOpen = !this.isOpen;
		},
	},
	data () {
		return {
			isOpen: false,
		};
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables.less';

.layout-header {
	@_linkColor: #4f90bb;
	@_linkColor-active: #396685;
	@_linkColor-hover: #457fa5;
	@_bgColor: #ffffff;
	@_height: 57px;

	box-shadow: 0 2px 4px 0 rgba(43, 43, 43, .1);
	height: @_height;

	&_brand {
		font-size: 0;
	}

	&_logo {
		width: auto;
		height: 2.5rem;
	}

	&_content {
		position: fixed;
		top: @_height;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: @_bgColor;
		z-index: 200;
		text-align: center;
		padding: 1rem;
		box-sizing: border-box;
		display: none;

		&-active {
			display: block;
		}
	}

	&_toggle {
		padding: 1rem;
		font-size: 1rem;
		float: right;
		line-height: 1.5;
		display: none;

		&:hover {
			cursor: pointer;
		}

		&-active {
			display: block;
		}
	}

	&_link {
		font-weight: 600;
		margin: 1rem;
		display: block;

		&-active {
			color: @_linkColor-active;
		}
	}

	&_links {
		user-select: none;
	}

	&::after {
		content: '';
		display: table;
		clear: both;
	}

	@media screen and (min-width: @breakpoint_tabletMinWidth) {
		&_content {
			padding: 0 1rem;
			position: static;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		&_toggle {
			display: none;
		}

		&_link {
			padding: 1rem;
			margin: 0;
			display: inline-block;
		}

		&_links {
			display: flex;
			justify-content: flex-end;
		}
	}
}
</style>
