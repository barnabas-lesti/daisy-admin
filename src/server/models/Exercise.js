const { db } = require('../firebase');

class Exercise {
  constructor (skeleton = {}) {
    const {
      id,
      content = {},
      calorieBurn = {},
      duration = {},
    } = skeleton;

    this.id = id;
    this.content = content;
    this.calorieBurn = calorieBurn;
    this.duration = duration;
  }
}

Exercise.create = async (skeleton) => {
  const ref = await db.collection('exercises').add(skeleton);
  const doc = await ref.get();
  return doc.data();
};

module.exports = Exercise;
