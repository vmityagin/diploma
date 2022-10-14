require('dotenv').config();
const Movie = require('../models/movie');
const NotCorrectData = require('../errors/not-correct-data');
const NotFoundData = require('../errors/not-found-data');
const ServerError = require('../errors/server-error');
const NotCredentialsData = require('../errors/not-credentials-data');

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send({ data: movies }))
    .catch(() => next(new ServerError('Произошла ошибка')));
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .then((movie) => res.send({ data: movie }))
    .catch((e) => {
      console.log(e);
      if (e.name === 'ValidationError') {
        next(new NotCorrectData('Некорректные данные'));
      } else {
        next(new ServerError('Произошла ошибка'));
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .orFail(() => new NotFoundData('Ошибка, такого id фильма не существует'))
    .then((movie) => {
      if (!movie.owner.equals(req.user._id)) {
        return next(new NotCredentialsData('Вы не можете удалить чужую карточку'));
      }
      return movie.remove()
        .then(() => {
          res.send({ message: 'Фильм удален' });
        });
    })
    .catch(next);
};
