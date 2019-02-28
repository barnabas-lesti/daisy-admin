<template>
	<div class="RecipesCardList">
		<div
			v-for="(item, index) of items"
			:key="index"
			class="RecipesCardList_itemWrapper"
		>
			<RecipesCard
				class="RecipesCardList_item"
				:title="item.name"
				@click.native="onCardClick(item)"
			>
				{{ item.description }}
			</RecipesCard>
		</div>
	</div>
</template>

<script>
import RecipesCard from './RecipesCard';

export default {
	name: 'RecipesCardList',
	components: {
		RecipesCard,
	},
	props: {
		items: {
			default: () => [],
			type: Array,
		},
	},
	methods: {
		emitSelect (item) {
			this.$emit('select', { selectedItem: item });
		},

		onCardClick (item) {
			this.emitSelect(item);
		},
	},
};
</script>

<style lang="less">
@import (reference) '../../styles/mixins';

.RecipesCardList {
	@_gutter: .5rem;

	display: flex;
	flex-wrap: wrap;
	margin: -(@_gutter);

	&_itemWrapper {
		padding: @_gutter;
		flex-grow: 1;
		width: 100%;
	}

	&_item {
		&:hover {
			cursor: pointer;
		}
	}

	@media screen and (min-width: 769px) {
		&_itemWrapper {
			flex-basis: 50%;
			flex-grow: 0;
		}

		&_item {
			.transition(opacity);
			opacity: .8;

			&:hover {
				opacity: 1;
			}
		}
	}

	@media screen and (min-width: 1024px) {
		&_itemWrapper {
			flex-basis: 33.33%;
		}
	}

	@media screen and (min-width: 1216px) {
		&_itemWrapper {
			flex-basis: 25%;
		}
	}
}
</style>
