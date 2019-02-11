<template>
	<nav class="Sidebar">
		<router-link
			class="Sidebar_brand"
			:to="{ name: 'home' }"
		>
			Daisy
		</router-link>
		<div class="Sidebar_links">
			<router-link
				v-for="(navItem, index) in navItems"
				:key="index"
				:to="{ name: navItem.name }"
				class="Sidebar_link"
			>
				<Icon
					v-if="navItem.icon"
					:type="navItem.icon"
					class="Sidebar_linkIcon"
				/>
				{{ navItem.label }}
			</router-link>
		</div>
	</nav>
</template>

<script>
import { routes } from '../routes';
import Icon from './Icon.vue';

const navItems = [
	routes.HOME,
	routes.DASHBOARD,
];

export default {
	components: {
		Icon,
	},
	data () {
		return {
			navItems,
		};
	},
	name: 'Sidebar',
};
</script>

<style scoped lang="less">
@import (reference) '../styles/variables.less';

.Sidebar {
	@_bgColor: @colors_dark1;
	@_bgColor-hover: lighten(@colors_dark1, 10%);
	@_brandBoxShadow: @common_bottomBoxShadow;
	@_brandHeight: @layout_headerHeight;
	@_textColor: @colors_light1;
	@_textColor-hover: lighten(@colors_light1, 10%);
	@_width: @layout_sidebarWidth;
	@_gutter: 1rem;

	background-color: @_bgColor;
	height: 100%;
	left: 0;
	position: fixed;
	top: 0;
	width: @_width;

	&_brand {
		align-items: center;
		background-color: @_bgColor;
		box-shadow: @_brandBoxShadow;
		color: @_textColor;
		display: flex;
		font-size: 1.6rem;
		font-weight: bold;
		height: @_brandHeight;
		justify-content: center;
		letter-spacing: 2px;
		width: 100%;

		&:hover {
			color: @_textColor-hover;
			background-color: @_bgColor-hover;
		}
	}

	&_links {
		margin: 0;
		padding: 0;
		overflow: hidden;
	}

	&_link {
		background-color: @_bgColor;
		color: @_textColor;
		display: block;
		padding: @_gutter @_gutter @_gutter @_gutter * 3;
		position: relative;

		&:hover {
			color: @_textColor-hover;
			background-color: @_bgColor-hover;
		}
	}

	&_linkIcon {
		position: absolute;
		top: 50%;
		left: @_gutter;
		transform: translateY(-50%);
	}
}
</style>
