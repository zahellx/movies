const Joi = require('joi');
const { categoriesList } = require('../constants/categories');
const { objectId } = require('./custom');

const movieFields = {
  id: Joi.string().custom(objectId),
  name: Joi.string().required(),
  yearOfRelease: Joi.number().required().min(1800),
  cover: Joi.string().required(),
  categories: Joi.array().items(Joi.string().valid(...categoriesList)).required(),
};

const createMovie = {
  body: Joi.object().keys(movieFields),
};

const updateMovie = {
  params: Joi.object().keys({
    movieId: Joi.required().custom(objectId),
  }),
  body: Joi.object().keys(movieFields).min(1),
};

module.exports = {
  createMovie,
  updateMovie,
};
