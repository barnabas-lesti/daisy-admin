<template lang="pug">
  v-dialog.base-modal(v-model='isOpen', :fullscreen='$vuetify.breakpoint.smAndDown',
    :hide-overlay='$vuetify.breakpoint.smAndDown', :max-width="$vuetify.breakpoint.smAndDown ? 'none' : '400px'",
    transition='dialog-bottom-transition', lazy)
    v-card.pa-3
      v-card-title
        .headline {{ $t('title') }}
      v-card-text
        v-form(@submit.prevent='signIn()')
          v-layout(wrap)
            v-flex(xs12)
              v-text-field(v-model='email', :label="$t('email')", :error-messages="error ? $t('errorMessage') : ''", type='email' append-icon='account_circle')
            v-flex(xs12)
              v-text-field(v-model='password', :error='!!error', :label="$t('password')", type='password' append-icon='vpn_key')
            v-flex.mb-4(xs12)
              nuxt-link(:to="{ name: 'locale-register' }") {{ $t('registrationLink') }}
            v-flex.text-xs-right(xs12)
              v-btn.ma-0.mr-3(large, flat, @click='close()') {{ $t('cancel') }}
              v-btn.info.ma-0(type='submit', large) {{ $t('button') }}
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LayoutSignInModal',
  computed: {
    ...mapState([ 'isLoading' ]),
    ...mapState('user', [ 'user' ]),

    isOpen: {
      get () { return !this.user && this.$route.query['sign-in']; },
      set (newValue) { this.$router.push({ query: { ...this.$route.query, 'sign-in': newValue || undefined } }); },
    },
  },
  data () {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    close () {
      this.isOpen = false;
    },
    async signIn () {
      try {
        const result = await this.$firebase.auth().signInWithEmailAndPassword(this.email, this.password);
        console.log(result);
      } catch (ex) {
        this.error = ex;
      }
    },
  },
};
</script>

<i18n>
en:
  title: Sign in
  email: Email
  password: Password
  button: Sign in
  cancel: Cancel
  registrationLink: Don't have an account? Register!
  errorMessage: Invalid credentials
</i18n>
