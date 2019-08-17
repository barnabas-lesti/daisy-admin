<template lang="pug">
  .pages-sign-out
</template>

<script>

export default {
  name: 'PagesSignOut',
  middleware: 'local/signed-in',
  head () {
    return {
      title: this.$t('pages.signOut.title'),
    };
  },
  created () {
    const ref = this.$route.query['ref'];
    this.$auth.signOut();
    this.$router.push(this.localePath({ name: ref || 'sign-in' }));
  },
};
</script>
