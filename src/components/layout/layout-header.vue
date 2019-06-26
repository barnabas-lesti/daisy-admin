<template>
	<header class="layout-header">
		<base-icon
			type="burger"
			:class="[
				'layout-header_toggle',
				{ 'layout-header_toggle-active': !isOpen }
			]"
			@click.native="toggleMenu()"
		/>
		<base-icon
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
import BaseIcon from '../base/base-icon';

export default {
	name: 'LayoutHeader',
	components: {
		BaseIcon,
	},
	props: {
		menuItems: {
			default: () => [],
			type: Array,
		},
	},
	methods: {
		toggleMenu () { this.isOpen = !this.isOpen; },
	},
	data () { return { isOpen: false }; },
};
</script>

<style lang="scss">
@import '../../styles/variables';

.layout-header {

}
</style>
