<template lang="pug">
	.pages-exercises-index
		base-modal(:value='modalMode', :title="$t(`pages.exercises.modal.${ modal.model._id ? 'editTitle' : 'createTitle' }`)",
			@accept='saveExercise()', @discard='closeModal()')
			template(v-slot:content)
				v-form(@submit.prevent='saveExercise')
					v-card-text.mt-5
						v-text-field(v-model='modal.model.content.name', :label="$t('common.name')")
						v-text-field(v-model='modal.model.duration.value', :label="$t('common.duration')", :suffix="$tc('common.units.mins', modal.model.duration.value)",
							type='number')
						v-text-field(v-model='modal.model.calorieBurn.value', :label="$t('common.calorieBurn')", :suffix="$t('common.units.kcal')",
							type='number')
						v-textarea(v-model='modal.model.content.description', :label="$t('common.description')", rows='10')

		v-layout(row, wrap)
			v-flex(xs12)
				base-control-title(:title="$t('pages.exercises.title')")
					template(v-slot:controls)
						v-slide-x-reverse-transition
							v-btn.red.lighten-1(v-show='selection', :loading='isLoading', fab, dark, small, @click='deleteExercise()')
								v-icon delete
						v-slide-x-reverse-transition
							v-btn.blue.lighten-1(v-show='selection', fab, dark, small, @click='openEditModal()')
								v-icon create
						v-btn.green.lighten-1(fab, dark, small, @click='openCreateModal()')
							v-icon add

			v-flex(xs12)
				v-form(@submit.prevent='onSearchFormSubmit()')
					v-text-field(v-model='searchString', :disabled='isLoading', :placeholder="$t('pages.exercises.searchPlaceholder')",
					ref='searchInput', prepend-inner-icon='search', solo, clearable, autofocus, @input='onSearchInput()')

			v-flex(xs12)
				v-data-table.elevation-1(v-model='table.selected', :headers='table.headers', :items='exercises', :no-data-text="$t('pages.exercises.table.noData')",
					:no-results-text="$t('pages.exercises.table.noData')", ref='dataTable', item-key='_id', hide-actions)
					template(v-slot:items='props')
						tr(:active='props.selected', @click='onListItemClick(props)')
							td
								div.font-weight-bold.text-truncate(style='width: 130px;') {{ props.item.content.name }}
								div.font-italic {{ `${props.item.duration.value} ${$tc('common.units.mins', props.item.duration.value)}` }}
							td.text-xs-right {{ props.item.calorieBurn.value }} {{ $t('common.units.kcal') }}
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
					v-btn.red.lighten-1(v-if='selection', :loading='isLoading', fab, dark, small, @click='deleteExercise()')
						v-icon delete
</template>

<script>
import { mapState } from 'vuex';

import Exercise from '../../models/exercise';

import BaseControlTitle from '../../components/base-control-title';
import BaseFab from '../../components/base-fab';
import BaseModal from '../../components/base-modal';

export default {
	name: 'PagesExercisesIndex',
	components: {
		BaseControlTitle,
		BaseFab,
		BaseModal,
	},
	head () {
		return {
			title: this.$t('pages.exercises.title'),
			meta: [ { name: 'description', content: this.$t('pages.exercises.description') } ],
		};
	},
	data () {
		return {
			modal: {
				model: new Exercise(),
			},
			table: {
				headers: [
					{ text: this.$t('common.name'), value: 'content.name', align: 'left' },
					{ text: this.$t('common.calorieBurn'), value: 'calorieBurn.value', align: 'right' },
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
			this.table.selected = [ this.exercises.filter(item => item._id === this.selection)[0] ];
		},
		openCreateModal () {
			this.modal.model = new Exercise();
			this.modalMode = 'create';
		},
		openEditModal () {
			this.modal.model = new Exercise(this.exercises.filter(item => item._id === this.selection)[0]);
			this.modalMode = 'edit';
		},
		closeModal () {
			this.modalMode = undefined;
		},
		onListItemClick (props) {
			const { _id: id } = props.item;
			props.selected = !props.selected;
			this.selection = id !== this.$route.query.selection ? id : undefined;
		},
		onSearchInput () {
			if (this._searchInputTimeoutId) {
				window.clearTimeout(this._searchInputTimeoutId);
			}
			this._searchInputTimeoutId = window.setTimeout(() => this.onSearchFormSubmit(), 300);
		},
		async onSearchFormSubmit () {
			await this.fetchExercises();
			this.$nextTick(() => this.$refs.searchInput.focus());
		},
		async fetchExercises () {
			this.$store.commit('startLoading');
			const response = await this.$axios.$get('/api/exercises', { params: { search: this.searchString } });
			this.exercises = response.map(item => new Exercise(item));
			this.$store.commit('finishLoading');
		},
		async deleteExercise () {
			this.$store.commit('startLoading');
			try {
				await this.$axios.$delete(`/api/exercises/${this.selection}`);
				this.$store.commit('notifications/showSuccess', this.$t('pages.exercises.notifications.deleted'));
				this.selection = undefined;
				await this.fetchExercises();
			} catch (ex) {
				console.error(ex);
				this.$store.commit('notifications/showError', this.$t('common.notifications.unknownErrorOccurred'));
			}
			this.$store.commit('finishLoading');
		},
		async saveExercise () {
			this.$store.commit('startLoading');
			try {
				if (this.modal.model._id) {
					await this.$axios.$patch(`/api/exercises/${this.modal.model._id}`, this.modal.model);
					this.$store.commit('notifications/showSuccess', this.$t('pages.exercises.notifications.updated'));
				} else {
					await this.$axios.$put('/api/exercises', this.modal.model);
					this.$store.commit('notifications/showSuccess', this.$t('pages.exercises.notifications.created'));
				}
				this.modal.model = new Exercise();
				this.closeModal();
				await this.fetchExercises();
			} catch (ex) {
				console.error(ex);
				this.$store.commit('notifications/showError', this.$t('common.notifications.unknownErrorOccurred'));
			}
			this.$store.commit('finishLoading');
		},
	},

	async asyncData ({ route, $axios }) {
		const response = await $axios.$get('/api/exercises', { params: { search: route.query['search'] } });
		return { exercises: response.map(item => new Exercise(item)) };
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
