import Vue from 'vue';

class Auth {
  constructor (context) {
    this._context = context;
  }

  async signOut () {
    await this._context.$firebase.auth().signOut();
  }
}

export default (context) => {
  const auth = new Auth(context);
  context.$auth = auth;
  Vue.prototype.$auth = auth;
};
