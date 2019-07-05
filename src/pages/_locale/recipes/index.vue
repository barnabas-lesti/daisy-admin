<template lang="pug">
	.pages-recipes-index
		v-layout(row, wrap)
			v-flex(xs12)
				base-control-title(:title="$t('pages.recipes.index.title')")
					template(v-slot:controls)
						v-btn(color='green lighten-1', fab, dark, small, @click='createNewRecipe()')
							v-icon add

			v-flex(xs12)
				v-form(@submit.prevent='onSearchFormSubmit()')
					v-text-field(v-model='searchString', :disabled='isLoading', :placeholder="$t('pages.recipes.index.searchPlaceholder')",
						ref='searchInput', prepend-inner-icon='search', solo, clearable, autofocus, @input='onSearchInput()')

			v-flex(xs12)
				v-data-table.elevation-1(:headers='table.headers', :items='computedRecipes', :no-data-text="$t('pages.recipes.index.table.noData')",
					:no-results-text="$t('pages.recipes.index.table.noData')", item-key='_id', hide-actions)
					template(v-slot:items='props')
						tr(:active='props.selected', @click='onListItemClick(props.item._id)')
							td
								div.font-weight-bold.text-truncate(style='width: 130px;') {{ props.item.content.name }}
							td.text-xs-right(:style='table.summaryTdStyle') {{ props.item.summary.calories.value | twoDecimal }} {{ $t('common.units.kcal') }}
							td.text-xs-right(:style='table.summaryTdStyle') {{ props.item.summary.carbs.value | twoDecimal }} {{ $t('common.units.g') }}
							td.text-xs-right(:style='table.summaryTdStyle') {{ props.item.summary.protein.value | twoDecimal }} {{ $t('common.units.g') }}
							td.text-xs-right(:style='table.summaryTdStyle') {{ props.item.summary.fat.value | twoDecimal }} {{ $t('common.units.g') }}

			base-fab
				template(v-slot:content)
					v-btn(color='green lighten-1', fab, dark, small, @click='createNewRecipe()')
						v-icon add
</template>

<script>
import { mapState } from 'vuex';

import Recipe from '../../../models/recipe';

import BaseControlTitle from '../../../components/base-control-title';
import BaseFab from '../../../components/base-fab';

export default {
	name: 'PagesRecipesIndex',
	components: {
		BaseControlTitle,
		BaseFab,
	},
	head () {
		return {
			title: this.$t('pages.recipes.index.title'),
			meta: [ { name: 'description', content: this.$t('pages.recipes.index.description') } ],
		};
	},
	data () {
		return {
			table: {
				summaryTdStyle: 'min-width: 110px;',
				headers: [
					{ text: this.$t('common.name'), value: 'content.name', align: 'left' },
					{ text: this.$t('common.nutrients.calories'), value: 'summary.calories.value', align: 'right' },
					{ text: this.$t('common.nutrients.carbs'), value: 'summary.carbs.value', align: 'right' },
					{ text: this.$t('common.nutrients.protein'), value: 'summary.protein.value', align: 'right' },
					{ text: this.$t('common.nutrients.fat'), value: 'summary.fat.value', align: 'right' },
				],
			},
		};
	},
	computed: {
		...mapState([ 'isLoading' ]),

		searchString: {
			get () { return this.$route.query['search']; },
			set (newValue) { this.$router.push({ query: { ...this.$route.query, 'search': newValue || undefined } }); },
		},
		computedRecipes () {
			return this.recipes.map(recipe => new Recipe({
				...recipe,
				summary: Recipe.getNutrientSummary(recipe),
			}));
		},
	},
	methods: {
		onListItemClick (id) {
			this.$router.push({ name: 'locale-recipes-id', params: { id } });
		},
		createNewRecipe () {
			this.$router.push({ name: 'locale-recipes-new' });
		},
		onSearchInput () {
			if (this._searchInputTimeoutId) {
				window.clearTimeout(this._searchInputTimeoutId);
			}
			this._searchInputTimeoutId = window.setTimeout(() => this.onSearchFormSubmit(), 300);
		},
		async onSearchFormSubmit () {
			await this.fetchRecipes();
			this.$nextTick(() => this.$refs.searchInput.focus());
		},
		async fetchRecipes () {
			this.$store.commit('startLoading');
			const response = await this.$axios.$get('/api/recipes', { params: { search: this.searchString } });
			this.recipes = response.map(item => new Recipe(item));
			this.$store.commit('finishLoading');
		},
	},

	async asyncData ({ route, $axios }) {
		const response = await $axios.$get('/api/recipes', { params: { search: route.query['search'] } });
		return { recipes: response.map(item => new Recipe(item)) };
	},
};
</script>
