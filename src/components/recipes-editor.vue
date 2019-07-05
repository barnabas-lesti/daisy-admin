<template lang="pug">
	.recipes-editor
		base-modal(:value='modalMode', :title="$t('components.recipesEditor.modal.addFood')",
			@accept='addSelectedRecipeItemsToRecipe()', @discard='closeModal()')
			template(v-slot:content)
				v-card-text.mt-5.pt-4
					v-layout(row, wrap)
						v-flex(xs12)
							v-form(@submit.prevent='onSearchFormSubmit()')
								v-text-field.mb-3(v-model='modal.searchString', :disabled='isLoading', :placeholder="$t('components.recipesEditor.modal.searchPlaceholder')",
									ref='searchInput', prepend-inner-icon='search', color='teal', solo, clearable, autofocus, hide-details, @input='onSearchInput')

						v-flex(xs12)
							v-data-table.elevation-1(v-model='modal.selection', :headers='table.headers', :items='modal.recipeItems', :no-data-text="$t('components.recipesEditor.modal.table.noData')",
								:no-results-text="$t('components.recipesEditor.modal.table.noData')", item-key='food._id', hide-actions)
								template(v-slot:items='props')
									tr(:class="props.selected ? 'teal lighten-4': ''", :active='props.selected', @click='props.selected = !props.selected')
										td
											div.font-weight-bold.text-truncate(style='width: 150px;') {{ props.item.food.content.name }}
											div.font-italic {{ `${props.item.food.nutrients.calories.value} ${$t('common.units.kcal')} / ${props.item.food.serving.value} ${$t(`common.units.${props.item.food.serving.unit}`)}` }}
										td.text-xs-right
											v-text-field.pa-2(v-model='props.item.serving.value', :suffix="$t(`common.units.${props.item.food.serving.unit}`)",
												type='number', style='width: 75px;', hide-details, @click.stop)
										td.text-xs-right {{ props.item.food.nutrients.carbs.servingMultiplier * props.item.serving.value }} {{ $t('common.units.g') }}
										td.text-xs-right {{ props.item.food.nutrients.protein.servingMultiplier * props.item.serving.value }} {{ $t('common.units.g') }}
										td.text-xs-right {{ props.item.food.nutrients.fat.servingMultiplier * props.item.serving.value }} {{ $t('common.units.g') }}

		v-layout(row, wrap)
			v-flex(xs12)
				base-control-title(:title="title || $t('components.recipesEditor.fallbackTitle')")
					template(v-slot:controls)
						v-slide-x-reverse-transition
							v-btn.teal.lighten-1(v-show='table.selection.length', dark, fab, small, @click='removeSelectedRecipeItems()')
								v-badge(color='red darken-1')
									template(v-slot:badge)
										v-icon remove
									v-icon fastfood
						v-btn.teal.lighten-1(dark, fab, small, @click='openModal()')
							v-badge(color='green darken-1')
								template(v-slot:badge)
									v-icon add
								v-icon fastfood
						v-btn.red.lighten-1(:loading='isLoading', dark, fab, small, @click='deleteRecipe()')
							v-icon delete
						v-btn.green.lighten-1(:loading='isLoading', dark, fab, small, @click='saveRecipe()')
							v-icon done

			v-flex.hidden-lg-and-up(xs12)
				v-text-field.mb-3(v-model='recipe.content.name', :label="$t('components.recipesEditor.form.name')", solo, hide-details)
				v-textarea.mb-3(v-model='recipe.content.description', :label="$t('components.recipesEditor.form.description')", solo, hide-details)

			v-flex.hidden-sm-and-up(xs12)
				v-expansion-panel.mb-3
					v-expansion-panel-content.light-blue.lighten-4
						template(v-slot:header)
							div.font-weight-bold {{ $t('components.recipesEditor.nutritionSummary.title') }}
						base-nutrition-summary(:model='summary')
			v-flex.mb-3.hidden-xs-only(xs12, lg3)
				v-card.light-blue.lighten-4
					v-card-title.font-weight-bold {{ $t('pages.calculator.nutritionSummary') }}
					v-divider
					base-nutrition-summary(:model='summary')

			v-flex(xs12, lg9)
				v-layout(row, wrap)
					v-flex.hidden-md-and-down(xs12)
						v-text-field.mb-3(v-model='recipe.content.name', :label="$t('components.recipesEditor.form.name')", solo, hide-details)
						v-textarea.mb-3(v-model='recipe.content.description', :label="$t('components.recipesEditor.form.description')", solo, hide-details)
					v-flex(xs12)
						v-expansion-panel
							v-expansion-panel-content.teal.lighten-4
								template(v-slot:header)
									div.font-weight-bold {{ $t('components.recipesEditor.table.title') }}
								.text-xs-center.white(v-if='!recipe.items.length')
									v-btn.my-3(color='teal lighten-3', fab, dark, @click='openModal()')
										v-badge(color='green darken-1')
											template(v-slot:badge)
												v-icon add
											v-icon fastfood
								v-data-table.elevation-1(v-else, v-model='table.selection', :headers='table.headers', :items='recipe.items', item-key='food._id', hide-actions)
									template(v-slot:items='props')
										tr(:class="props.selected ? 'teal lighten-5': ''", @click='props.selected = !props.selected')
											td
												div.font-weight-bold.text-truncate(style='width: 130px;') {{ props.item.food.content.name }}
												div.font-italic {{ props.item.food.nutrients.calories.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.kcal') }}
											td.text-xs-right
												v-text-field.pa-2(v-model='props.item.serving.value', :suffix="$t(`common.units.${props.item.food.serving.unit}`)",
													type='number', style='width: 75px;', hide-details, @click.stop)
											td.text-xs-right
												div(style='width: 55px') {{ props.item.food.nutrients.carbs.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.g') }}
											td.text-xs-right
												div(style='width: 55px') {{ props.item.food.nutrients.protein.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.g') }}
											td.text-xs-right
												div(style='width: 55px') {{ props.item.food.nutrients.fat.servingMultiplier * props.item.serving.value | twoDecimal }} {{ $t('common.units.g') }}

			base-fab
				template(v-slot:content)
					v-btn.green.lighten-1(:loading='isLoading', fab, dark, small, @click='saveRecipe()')
						v-icon done
					v-btn.red.lighten-1(fab, dark, small, @click='deleteRecipe()')
						v-icon delete
					v-btn.teal.lighten-1(fab, dark, small, @click='openModal()')
						v-badge(color='green darken-1')
							template(v-slot:badge)
								v-icon add
							v-icon fastfood
					v-btn.teal.lighten-1(v-if='table.selection.length', fab, dark, small, @click='removeSelectedRecipeItems()')
						v-badge(color='red darken-1')
							template(v-slot:badge)
								v-icon remove
							v-icon fastfood
</template>

<script>
import _ from 'lodash';
import { mapState } from 'vuex';

import Recipe from '../models/recipe';
import RecipeItem from '../models/recipe-item';

import BaseControlTitle from './base-control-title';
import BaseFab from './base-fab';
import BaseModal from './base-modal';
import BaseNutritionSummary from './base-nutrition-summary';

export default {
	name: 'RecipesEditor',
	components: {
		BaseControlTitle,
		BaseFab,
		BaseModal,
		BaseNutritionSummary,
	},
	props: {
		title: {
			type: String,
			required: true,
		},
		recipe: {
			type: Object,
			default: () => new Recipe(),
		},
	},
	data () {
		return {
			isMainFabOpen: false,
			modal: {
				searchString: '',
				recipeItems: [],
				selection: [],
			},
			table: {
				headers: [
					{ text: this.$t('components.recipesEditor.table.header.name'), value: 'food.content.name', align: 'left' },
					{ text: this.$t('components.recipesEditor.table.header.serving'), value: 'serving.value', align: 'right' },
					{ text: this.$t('common.nutrients.carbs'), value: 'food.nutrients.carbs.value', align: 'right' },
					{ text: this.$t('common.nutrients.protein'), value: 'food.nutrients.protein.value', align: 'right' },
					{ text: this.$t('common.nutrients.fat'), value: 'food.nutrients.fat.value', align: 'right' },
				],
				selection: [],
			},
		};
	},
	computed: {
		...mapState([ 'isLoading' ]),

		modalMode: {
			get () { return this.$route.query['modal']; },
			set (newValue) { this.$router.push({ query: { ...this.$route.query, 'modal': newValue || undefined } }); },
		},

		summary () {
			return Recipe.getNutrientSummary(this.recipe);
		},
	},
	methods: {
		removeSelectedRecipeItems () {
			this.recipe.items = this.recipe.items.filter(item => this.table.selection.map(item => item.food._id).indexOf(item.food._id) === -1);
			this.table.selection = [];
		},
		addSelectedRecipeItemsToRecipe () {
			this.recipe.items.push(
				...this.modal.selection
					.map(item => _.cloneDeep(item))
					.filter(item => this.recipe.items.map(item => item.food._id).indexOf(item.food._id) === -1)
			);
			this.closeModal();
			this.modal.selection = [];
		},
		openModal () { this.modalMode = 'add-food'; },
		closeModal () { this.modalMode = undefined; },
		onSearchInput () {
			if (this._searchInputTimeoutId) {
				window.clearTimeout(this._searchInputTimeoutId);
			}
			this._searchInputTimeoutId = window.setTimeout(() => {
				this.onSearchFormSubmit();
			}, 300);
		},
		async onSearchFormSubmit () {
			await this.fetchRecipeItems();
			this.$nextTick(() => this.$refs.searchInput.focus());
		},
		async fetchRecipeItems () {
			this.$store.commit('startLoading');
			const food = await this.$axios.$get('/api/food', { params: { search: this.modal.searchString } });
			this.modal.recipeItems = food.map(item => new RecipeItem(item));
			this.$store.commit('finishLoading');
		},
		async deleteRecipe () {
			if (this.recipe._id) {
				this.$store.commit('startLoading');
				try {
					await this.$axios.$delete(`/api/recipes/${this.recipe._id}`);
					this.$store.commit('notifications/showSuccess', this.$t('components.recipesEditor.notifications.deleted'));
					this.$router.push({ name: 'locale-recipes' });
				} catch (ex) {
					console.error(ex);
					this.$store.commit('notifications/showError', this.$t('common.notifications.unknownErrorOccurred'));
				}
				this.$store.commit('finishLoading');
			} else {
				this.$router.go(-1);
			}
		},
		async saveRecipe () {
			this.$store.commit('startLoading');
			try {
				if (this.recipe._id) {
					await this.$axios.$patch(`/api/recipes/${this.recipe._id}`, this.recipe);
					this.$store.commit('notifications/showSuccess', this.$t('components.recipesEditor.notifications.updated'));
				} else {
					const { _id: id } = await this.$axios.$put('/api/recipes', this.recipe);
					this.$store.commit('notifications/showSuccess', this.$t('components.recipesEditor.notifications.created'));
					this.$router.push({ name: 'locale-recipes-id', params: { id } });
				}
			} catch (ex) {
				console.error(ex);
				this.$store.commit('notifications/showError', this.$t('common.notifications.unknownErrorOccurred'));
			}
			this.$store.commit('finishLoading');
		},
	},
	mounted () {
		if (!this.modal.recipeItems.length > 0) {
			this.fetchRecipeItems();
		}
	},
};
</script>
