<template lang="pug">
  .pages-index
    v-layout(row, wrap)
      v-flex(xs12)
        h1.pb-3 {{ $t('pages.index.title') }}

      v-flex(xs12)
        .pb-3(v-html="$t('pages.index.descriptionHtml')")

      v-flex.mb-3(v-for="(item, index) of cards", :key='index', xs12, sm6)
        v-card(:to='localePath({ name: item.routeName })', nuxt, hover)
          v-img(:src='item.thumbnailPath', height='190px')
          v-card-title(primary-title)
            div
              h3.headline.mb-0 {{ item.title }}
              div(v-html='item.descriptionHtml')
          v-card-actions
            v-btn(color='orange', flat) {{ item.actionLabel }}
</template>

<script>
export default {
  name: 'PagesIndex',
  head () {
    return {
      title: this.$t('pages.index.title'),
      meta: [ { name: 'description', content: this.$t('pages.index.description') } ],
    };
  },
  data () {
    return {
      cards: [
        {
          title: this.$t('pages.index.cards.food.title'),
          descriptionHtml: this.$t('pages.index.cards.food.descriptionHtml'),
          actionLabel: this.$t('pages.index.cards.defaultActionLabel'),
          thumbnailPath: '/images/food-materials.jpg',
          routeName: 'food',
        },
        {
          title: this.$t('pages.index.cards.recipes.title'),
          descriptionHtml: this.$t('pages.index.cards.recipes.descriptionHtml'),
          actionLabel: this.$t('pages.index.cards.defaultActionLabel'),
          thumbnailPath: '/images/recipes.jpg',
          routeName: 'recipes',
        },
        {
          title: this.$t('pages.index.cards.exercises.title'),
          descriptionHtml: this.$t('pages.index.cards.exercises.descriptionHtml'),
          actionLabel: this.$t('pages.index.cards.defaultActionLabel'),
          thumbnailPath: '/images/exercise.jpg',
          routeName: 'exercises',
        },
        {
          title: this.$t('pages.index.cards.calculator.title'),
          descriptionHtml: this.$t('pages.index.cards.calculator.descriptionHtml'),
          actionLabel: this.$t('pages.index.cards.defaultActionLabel'),
          thumbnailPath: '/images/calorie-calculation.jpg',
          routeName: 'calculator',
        },
      ],
    };
  },
};
</script>
