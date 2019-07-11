import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';

export default (context) => {
  const { store } = context;
  if (!firebase.apps.length) {
    firebase.initializeApp(context.env.firebase);
    firebase.auth().languageCode = store.state.i18n.locale;
  }
  context.$firebase = firebase;
  Vue.prototype.$firebase = firebase;
};
