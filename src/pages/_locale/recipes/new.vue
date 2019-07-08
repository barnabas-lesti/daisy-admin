<template lang="pug">
  .pages-recipes-new
    recipes-editor(:title="$t('title')")
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
      title: this.$t('title'),
      meta: [ { name: 'description', content: this.$t('description') } ],
    };
  },
};
</script>

<i18n>
en:
  title: New recipe
  description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.
</i18n>
