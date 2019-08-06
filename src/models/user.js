import _ from 'lodash';

class User {
  constructor (skeleton = {}) {
    const {
      email,
      avatar,
      profileImageUrl,
      nickname,
    } = _.cloneDeep(skeleton);

    this.email = email;
    this.avatar = avatar;
    this.profileImageUrl = profileImageUrl;
    this.nickname = nickname;
  }
};

export default User;
