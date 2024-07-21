const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { movieService } = require('../services');

const createMovie = catchAsync(async (req, res) => {
  const movieData = { ...req.body, userId: req.user.id };
  const movie = await movieService.createMovie(movieData);
  res.status(httpStatus.CREATED).send(movie);
});

const getMovies = catchAsync(async (req, res) => {
  let filter = pick(req.query, ['name', 'category']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  if (filter.category) {
    filter = { ...filter, categories: filter.category };
    delete filter.category;
  }
  const result = await movieService.queryMovies(filter, options);
  res.send(result);
});

const getMovie = catchAsync(async (req, res) => {
  const movie = await movieService.getMovieById(req.params.movieId);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  if (movie.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized access');
  }
  res.send(movie);
});

const updateMovie = catchAsync(async (req, res) => {
  const movie = await movieService.updateMovieById(req.params.movieId, req.body, req.user);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  if (movie.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized access');
  }
  res.send(movie);
});

const deleteMovie = catchAsync(async (req, res) => {
  const movie = await movieService.updateMovieById(req.params.movieId, req.body, req.user);
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Movie not found');
  }
  if (movie.userId.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new ApiError(httpStatus.FORBIDDEN, 'Unauthorized access');
  }
  await movieService.deleteMovieById(req.params.movieId, req.user);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createMovie,
  getMovies,
  getMovie,
  updateMovie,
  deleteMovie,
};
