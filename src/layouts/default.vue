<template>
	<div>
		<layout-header />

		<nuxt />

		<layout-footer />
	</div>
</template>

<script>
import LayoutHeader from '../components/layout/header';
import LayoutFooter from '../components/layout/footer';

export default {
	name: 'DefaultLayout',
	components: {
		LayoutHeader,
		LayoutFooter,
	},
};
</script>
