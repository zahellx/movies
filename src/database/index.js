const mongoose = require('mongoose');
const config = require('config');
const User = require('./models/user');
const Movie = require('./models/movie');
const Token = require('./models/token');

const initDatabase = async () => {
  await mongoose.connect(config.get('database').url);
};

module.exports = {
  initDatabase,
  User,
  Movie,
  Token,
};
