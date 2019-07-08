<template lang="pug">
	.pages-food-index
		base-modal(:value='modalMode', :title="$t(`pages.food.modal.${ modal.model._id ? 'editTitle' : 'createTitle' }`)",
			@accept='saveFood()', @discard='closeModal()')
			template(v-slot:content)
				v-form(@submit.prevent='saveFood()')
					v-card-text.mt-5
						v-text-field(v-model='modal.model.content.name', :label="$t('common.name')")
						v-layout(wrap, row)
							v-flex(xs8)
								v-text-field(v-model='modal.model.serving.value', :label="$t('common.serving')", type='number')
							v-spacer
							v-flex(xs3)
								v-select(v-model='modal.model.serving.unit', :label="$t('common.unit')", :items='modal.units')
									template(v-slot:selection='data')
										| {{ $t(`common.units.${data.item}`) }}
									template(v-slot:item='data')
										| {{ $t(`common.units.${data.item}`) }}
						v-text-field(v-model='modal.model.nutrients.calories.value', :label="$t('common.nutrients.calories')", :suffix="$t('common.units.kcal')", type='number')
						v-text-field(v-model='modal.model.nutrients.carbs.value', :label="$t('common.nutrients.carbs')", :suffix="$t('common.units.g')", type='number')
						v-text-field(v-model='modal.model.nutrients.protein.value', :label="$t('common.nutrients.protein')", :suffix="$t('common.units.g')", type='number')
						v-text-field(v-model='modal.model.nutrients.fat.value', :label="$t('common.nutrients.fat')", :suffix="$t('common.units.g')", type='number')
						v-text-field(v-model='modal.model.nutrients.energy.value', :label="$t('common.nutrients.energy')", :suffix="$t('common.units.kj')", type='number')
						v-text-field(v-model='modal.model.nutrients.fiber.value', :label="$t('common.nutrients.fiber')", :suffix="$t('common.units.g')", type='number')
						v-text-field(v-model='modal.model.nutrients.salt.value', :label="$t('common.nutrients.salt')", :suffix="$t('common.units.g')", type='number')
						v-text-field(v-model='modal.model.nutrients.saturatedFat.value', :label="$t('common.nutrients.saturatedFat')", :suffix="$t('common.units.g')", type='number')
						v-text-field(v-model='modal.model.nutrients.sugar.value', :label="$t('common.nutrients.sugar')", :suffix="$t('common.units.g')", type='number')
						v-textarea(v-model='modal.model.content.description', :label="$t('common.description')")

		v-layout(row, wrap)
			v-flex(xs12)
				base-control-title(:title="$t('pages.food.title')")
					template(v-slot:controls)
						v-slide-x-reverse-transition
							v-btn.red.lighten-1(v-show='selection', :loading='isLoading', fab, dark, small, @click='deleteFood()')
								v-icon delete
						v-slide-x-reverse-transition
							v-btn.blue.lighten-1(v-show='selection', fab, dark, small, @click='openEditModal()')
								v-icon create
						v-btn.green.lighten-1(fab, dark, small, @click='openCreateModal()')
							v-icon add

			v-flex(xs12)
				v-form(@submit.prevent='onSearchFormSubmit()')
					v-text-field(v-model='searchString', :disabled='isLoading', :placeholder="$t('pages.food.searchPlaceholder')",
						ref='searchInput', prepend-inner-icon='search', solo, clearable, autofocus, @input='onSearchInput()')

			v-flex(xs12)
				v-data-table.elevation-1(:value='table.selected', :headers='table.headers', :items='food', :no-data-text="$t('pages.food.table.noData')",
					:no-results-text="$t('pages.food.table.noData')", ref='dataTable', item-key='_id', hide-actions)
					template(v-slot:items='props')
						tr(:active='props.selected', @click='onFoodListSelect(props.item._id)')
							td
								div.font-weight-bold.text-truncate(style='width: 130px;') {{ props.item.content.name }}
								div.font-italic {{ `${props.item.serving.value} ${$t(`common.units.${props.item.serving.unit}`)}` }}
							td.text-xs-right {{ props.item.nutrients.calories.value }} {{ $t('common.units.kcal') }}
							td.text-xs-right {{ props.item.nutrients.carbs.value }} {{ $t('common.units.g') }}
							td.text-xs-right {{ props.item.nutrients.protein.value }} {{ $t('common.units.g') }}
							td.text-xs-right {{ props.item.nutrients.fat.value }} {{ $t('common.units.g') }}
					template(v-slot:expand='props')
						v-card.grey.lighten-4(flat, tile)
							v-card-title.px-4.pb-2.caption.font-weight-bold {{ $t('common.description') }}
							v-card-text.px-4.pt-0.caption
								span(v-if="props.item.content.description") {{ props.item.content.description }}
								span.font-italic(v-if="!props.item.content.description") {{ $t('common.noDescription') }}
						v-divider

			base-fab
				template(v-slot:content)
					v-btn.green.lighten-1(fab, dark, small, @click='openCreateModal()')
						v-icon add
					v-btn.blue.lighten-1(v-if='selection', fab, dark, small, @click='openEditModal()')
						v-icon create
					v-btn.red.lighten-1(v-if='selection', :loading='isLoading', fab, dark, small, @click='deleteFood()')
						v-icon delete
</template>

<script>
import { mapState } from 'vuex';

import Food from '../../models/food';

import BaseControlTitle from '../../components/base-control-title';
import BaseFab from '../../components/base-fab';
import BaseModal from '../../components/base-modal';

const units = [ 'g', 'ml' ];

export default {
	name: 'PagesFoodIndex',
	components: {
		BaseControlTitle,
		BaseFab,
		BaseModal,
	},
	head () {
		return {
			title: this.$t('pages.food.title'),
			meta: [ { name: 'description', content: this.$t('pages.food.description') } ],
		};
	},
	data () {
		return {
			modal: {
				units,
				model: new Food(),
			},
			table: {
				headers: [
					{ text: this.$t('common.name'), value: 'content.name', align: 'left' },
					{ text: this.$t('common.nutrients.calories'), value: 'nutrients.calories.value', align: 'right' },
					{ text: this.$t('common.nutrients.carbs'), value: 'nutrients.carbs.value', align: 'right' },
					{ text: this.$t('common.nutrients.protein'), value: 'nutrients.protein.value', align: 'right' },
					{ text: this.$t('common.nutrients.fat'), value: 'nutrients.fat.value', align: 'right' },
				],
				selected: [],
			},
		};
	},
	computed: {
		...mapState([ 'isLoading' ]),

		selection: {
			get () { return this.$route.query['selection']; },
			set (newValue) { this.$router.push({ query: { ...this.$route.query, 'selection': newValue || undefined } }); },
		},
		modalMode: {
			get () { return this.$route.query['modal']; },
			set (newValue) { this.$router.push({ query: { ...this.$route.query, 'modal': newValue || undefined } }); },
		},
		searchString: {
			get () { return this.$route.query['search']; },
			set (newValue) { this.$router.push({ query: { ...this.$route.query, 'search': newValue || undefined } }); },
		},
	},

	methods: {
		checkSelection () {
			this.$refs.dataTable.expanded = { [this.selection]: true };
			this.table.selected = [ this.food.filter(item => item._id === this.selection)[0] ];
		},
		openCreateModal () {
			this.modal.model = new Food();
			this.modalMode = 'create';
		},
		openEditModal () {
			this.modal.model = new Food(this.food.filter(item => item._id === this.selection)[0]);
			this.modalMode = 'edit';
		},
		closeModal () {
			this.modalMode = undefined;
		},
		onFoodListSelect (id) {
			this.selection = id !== this.$route.query.selection ? id : undefined;
		},
		onSearchInput (search) {
			if (this._searchInputTimeoutId) {
				window.clearTimeout(this._searchInputTimeoutId);
			}
			this._searchInputTimeoutId = window.setTimeout(() => this.onSearchFormSubmit(), 300);
		},
		async onSearchFormSubmit () {
			await this.fetchFood();
			this.$nextTick(() => this.$refs.searchInput.focus());
		},
		async fetchFood () {
			this.$store.commit('startLoading');
			const response = await this.$axios.$get('/api/food', { params: { search: this.searchString } });
			this.food = response.map(item => new Food(item));
			this.$store.commit('finishLoading');
		},
		async deleteFood () {
			this.$store.commit('startLoading');
			try {
				await this.$axios.$delete(`/api/food/${this.selection}`);
				this.$store.commit('notifications/showSuccess', this.$t('pages.food.notifications.deleted'));
				this.selection = undefined;
				await this.fetchFood();
			} catch (ex) {
				this.$sentry.captureException(ex);
				this.$store.commit('notifications/showError', this.$t('common.notifications.unknownErrorOccurred'));
			}
			this.$store.commit('finishLoading');
		},
		async saveFood () {
			this.$store.commit('startLoading');
			try {
				if (this.modal.model._id) {
					await this.$axios.$patch(`/api/food/${this.modal.model._id}`, this.modal.model);
					this.$store.commit('notifications/showSuccess', this.$t('pages.food.notifications.updated'));
				} else {
					await this.$axios.$put('/api/food', this.modal.model);
					this.$store.commit('notifications/showSuccess', this.$t('pages.food.notifications.created'));
				}
				this.modal.model = new Food();
				this.closeModal();
				await this.fetchFood();
			} catch (ex) {
				this.$sentry.captureException(ex);
				this.$store.commit('notifications/showError', this.$t('common.notifications.unknownErrorOccurred'));
			}
			this.$store.commit('finishLoading');
		},
	},

	async asyncData ({ route, $axios }) {
		const response = await $axios.$get('/api/food', { params: { search: route.query['search'] } });
		return { food: response.map(item => new Food(item)) };
	},
	mounted () {
		if (this.modalMode === 'edit') {
			this.openEditModal();
		}
		this.checkSelection();
	},

	watch: {
		'$route.query.selection' () { this.checkSelection(); },
	},
};
</script>
