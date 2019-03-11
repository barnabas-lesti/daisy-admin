<template>
	<header class="LayoutSimpleHeader">
		<div class="container">
			<div class="LayoutSimpleHeader_links">
				<router-link
					v-for="(item, index) in menuItems"
					class="LayoutSimpleHeader_link"
					:activeClass="!item.exact ? 'LayoutSimpleHeader_link-active' : ''"
					:exactActiveClass="item.exact ? 'LayoutSimpleHeader_link-active' : ''"
					:key="index"
					:to="{ name: item.routeName }"
				>
					{{ $t(item.labelKey) }}
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
.LayoutSimpleHeader {
	@_linkColor: #4f90bb;
	@_linkColor-active: #396685;
	@_linkColor-hover: #457fa5;

	box-shadow: 0 2px 4px 0 rgba(43, 43, 43, .1);

	&_link {
		padding: 1rem;
		display: inline-block;
		font-weight: 600;

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
