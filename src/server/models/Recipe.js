const mongoose = require('mongoose');

const Ingredient = require('./ingredient');

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
  ingredients: {
    default: [],
    type: [
      {
        ingredient: {
          ref: 'Ingredient',
          type: mongoose.SchemaTypes.ObjectId,
          autopopulate: true,
        },
        customIngredient: Ingredient.schema,
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
