import _ from 'lodash';

class User {
  constructor (skeleton = {}) {
    const {
      email,
      profileImageUrl,
      fullName,
    } = _.cloneDeep(skeleton);

    this.email = email;
    this.profileImageUrl = profileImageUrl;
    this.fullName = fullName;
  }
};

export default User;
