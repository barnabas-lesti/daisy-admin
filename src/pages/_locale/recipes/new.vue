<template lang="pug">
  .pages-recipes-new
    recipes-editor(:title="$t('pages.recipes.new.title')")
</template>

<script>
import RecipesEditor from '../../../components/recipes-editor';

export default {
  name: 'PagesRecipesNew',
  components: {
    RecipesEditor,
  },
  head () {
    return {
      title: this.$t('pages.recipes.new.title'),
      meta: [ { name: 'description', content: this.$t('pages.recipes.new.description') } ],
    };
  },
};
</script>
