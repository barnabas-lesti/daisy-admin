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
				activeClass="Sidebar_link-active"
				class="Sidebar_link"
				v-for="(navItem, index) in navItems"
				:key="index"
				:to="{ name: navItem.routeName }"
			>
				<Icon
					class="Sidebar_linkIcon"
					v-if="navItem.icon"
					:type="navItem.icon"
				/>
				{{ navItem.label }}
			</router-link>
		</div>
	</nav>
</template>

<script>
import Icon from './Icon';

export default {
	components: {
		Icon,
	},
	name: 'Sidebar',
	props: {
		navItems: {
			required: true,
			type: Array,
			validator: items => {
				for (const item of items) {
					if (!item.label || !item.routeName) {
						return false;
					}
				}
				return true;
			},
		},
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/variables';

.Sidebar {
	@_bgColor: @colors_dark1;
	@_bgColor-active: lighten(@colors_dark1, 5%);
	@_bgColor-hover: lighten(@colors_dark1, 10%);
	@_brandBoxShadow: @common_bottomBoxShadow;
	@_brandHeight: @layout_headerHeight;
	@_gutter: 1rem;
	@_textColor: @colors_light1;
	@_textColor-hover: lighten(@colors_light1, 10%);
	@_width: @layout_sidebarWidth;

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
			background-color: @_bgColor-hover;
			color: @_textColor-hover;
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

		&-active {
			color: @_textColor-hover;
			background-color: @_bgColor-hover;
		}

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
