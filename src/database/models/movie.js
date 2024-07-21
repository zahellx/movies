const mongoose = require('mongoose');
const { toJSON, paginate } = require('../plugins');
const { categoriesList } = require('../../constants/categories');
const movieSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    yearOfRelease: {
      type: Number,
      required: true,
    },
    cover: {
      type: String,
      required: true,
    },
    categories: {
      type: [String],
      required: true,
      validate: {
        validator: function (categories) {
          return categories.length >= 1 && categories.length <= 4 && categories.every(category => categoriesList.includes(category));
        },
        message: 'Categories must have a minimum of 1 category and a maximum of 4 categories.',
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

// add plugin that converts mongoose to json
movieSchema.plugin(toJSON);
movieSchema.plugin(paginate);

/**
 * @typedef Movie
 */
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
