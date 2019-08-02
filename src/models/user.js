import _ from 'lodash';

class User {
  constructor (skeleton = {}) {
    const {
      email,
      profileImageUrl,
      fullName,
      nickname,
    } = _.cloneDeep(skeleton);

    this.email = email;
    this.profileImageUrl = profileImageUrl;
    this.fullName = fullName;
    this.nickname = nickname;
  }
};

export default User;
