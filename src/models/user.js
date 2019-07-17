import _ from 'lodash';

class User {
  constructor (skeleton = {}) {
    const {
      email,
      profileImageUrl,
      fullName,
      nickname,
      isVerified,
    } = _.cloneDeep(skeleton);

    this.email = email;
    this.profileImageUrl = profileImageUrl;
    this.fullName = fullName;
    this.nickname = nickname;
    this.isVerified = isVerified;
  }
};

export default User;
