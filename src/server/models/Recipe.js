const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  content: {
    description: {
      trim: true,
      type: String,
    },
    name: {
      trim: true,
      type: String,
    },
  },
  items: {
    default: [],
    type: [
      {
        food: {
          ref: 'Food',
          type: mongoose.SchemaTypes.ObjectId,
          autopopulate: true,
        },
        serving: {
          value: {
            default: 0,
            type: Number,
          },
        },
      },
    ],
  },
}, {
  id: false,
  toJSON: { versionKey: false },
  toObject: { versionKey: false },
});

recipeSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Recipe', recipeSchema);
