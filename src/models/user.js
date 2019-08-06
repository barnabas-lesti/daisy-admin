import _ from 'lodash';

class User {
  constructor (skeleton = {}) {
    const {
      email,
      avatar,
      fullName,
      nickname,
    } = _.cloneDeep(skeleton);

    this.email = email;
    this.avatar = avatar;
    this.fullName = fullName;
    this.nickname = nickname;
  }
};

export default User;
