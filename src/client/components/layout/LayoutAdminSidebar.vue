<template>
	<nav class="LayoutAdminSidebar">
		<router-link
			class="LayoutAdminSidebar_brand"
			:to="{ name: 'home' }"
		>
			Daisy
		</router-link>
		<div class="LayoutAdminSidebar_links">
			<router-link
				v-for="(item, index) in menuItems"
				class="LayoutAdminSidebar_link"
				:activeClass="!item.exact ? 'LayoutAdminSidebar_link-active' : ''"
				:exactActiveClass="item.exact ? 'LayoutAdminSidebar_link-active' : ''"
				:key="index"
				:to="{ name: item.routeName }"
			>
				<Icon
					v-if="item.icon"
					class="LayoutAdminSidebar_linkIcon"
					:type="item.icon"
				/>
				{{ $t(item.labelKey) }}
			</router-link>
		</div>
	</nav>
</template>

<script>
import Icon from '../common/Icon';

export default {
	components: {
		Icon,
	},
	name: 'LayoutAdminSidebar',
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

.LayoutAdminSidebar {
	@_bgColor: #263544;
	@_bgColor-active: #324558;
	@_bgColor-hover: #3f5163;
	@_brandBoxShadow: 0 2px 4px 0 rgba(43, 43, 43, .1);
	@_brandHeight: @layout_adminHeaderHeight;
	@_gutter: 1rem;
	@_textColor: #ececec;
	@_textColor-hover: #ffffff;
	@_width: @layout_adminSidebarWidth;

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
