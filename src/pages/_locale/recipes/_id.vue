<template lang="pug">
  .pages-recipes-id
    recipes-editor(:title='recipe.content.name', :recipe='recipe')
</template>

<script>
import RecipesEditor from '../../../components/recipes-editor';

export default {
  name: 'PagesRecipesId',
  components: {
    RecipesEditor,
  },
  head () {
    return {
      title: this.recipe.content.name || this.$t('fallbackTitle'),
      meta: [ { name: 'description', content: this.recipe.content.description } ],
    };
  },
  async asyncData ({ params, $axios }) {
    return { recipe: await $axios.$get(`/api/recipes/${params.id}`) };
  },
};
</script>

<i18n>
en:
  fallbackTitle: Just a recipe
</i18n>
