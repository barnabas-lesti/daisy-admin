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
.LayoutSimpleFooter {
	@_linkColor: #607080;
	@_linkColor-active: #242f3a;
	@_linkColor-hover: #2a3844;
	@_boxShadow: 0 -2px 4px 0 rgba(43, 43, 43, .1);

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
		font-weight: 600;
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
