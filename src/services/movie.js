const httpStatus = require('http-status');
const { Movie } = require('../database');
const ApiError = require('../utils/ApiError');

/**
 * Create a movie
 * @param {Object} movieBody
 * @returns {Promise<Movie>}
 */
const createMovie = async (movieBody) => Movie.create(movieBody);

/**
 * Query for movies
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryMovies = async (filter, options) => {
  const movies = await Movie.paginate(filter, options);
  return movies;
};

/**
 * Get movie by id
 * @param {ObjectId} id
 * @returns {Promise<Movie>}
 */
const getMovieById = async (id) => Movie.findById(id);

/**
 * Update movie by user
 * @param {ObjectId} movieId
 * @param {Object} updateBody
 * @returns {Promise<Movie>}
 */
const updateMovieById = async (movieId, updateBody, user) => {
  const movie = await getMovieById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  if (movie.userId.toString() !== user.id && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized access');
  }
  Object.assign(movie, updateBody);
  await movie.save();
  return movie;
};

/**
 * Delete movie by id
 * @param {ObjectId} movieId
 * @returns {Promise<Movie>}
 */
const deleteMovieById = async (movieId, user) => {
  const movie = await getMovieById(movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  if (movie.userId.toString() !== user.id && user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized access');
  }
  Object.assign(movie, { deleted: true });
  await movie.save();
  return movie;
};

module.exports = {
  createMovie,
  queryMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
};
