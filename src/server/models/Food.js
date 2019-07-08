const mongoose = require('mongoose');

const valueDescription = {
  default: 0,
  type: Number,
};

const nutrientDescription = {
  value: valueDescription,
};

const foodSchema = new mongoose.Schema({
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
  nutrients: {
    calories: nutrientDescription,
    carbs: nutrientDescription,
    energy: nutrientDescription,
    fat: nutrientDescription,
    fiber: nutrientDescription,
    protein: nutrientDescription,
    salt: nutrientDescription,
    saturatedFat: nutrientDescription,
    sugar: nutrientDescription,
  },
  serving: {
    unit: {
      default: 'g',
      type: String,
    },
    value: valueDescription,
  },
}, {
  id: false,
  toJSON: {
    versionKey: false,
    virtuals: true,
  },
  toObject: {
    versionKey: false,
    virtuals: true,
  },
});

for (const nutrientKey of Object.keys(foodSchema.obj.nutrients)) {
  foodSchema.virtual(`nutrients.${nutrientKey}.servingMultiplier`).get(function () {
    const servingValue = this.serving.value;
    return servingValue === 0 ? 0 : this.nutrients[nutrientKey].value / servingValue;
  });
}

module.exports = mongoose.model('Food', foodSchema);
