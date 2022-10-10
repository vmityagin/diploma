const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');
const {
  regularLinkRegExp,
  regularLatinLettersRegExp,
  regularCyrilicLettersRegExp,
} = require('../constants/constants');

router.get('/', getAllMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(regularLinkRegExp),
    trailerLink: Joi.string().required().pattern(regularLinkRegExp),
    thumbnail: Joi.string().required().pattern(regularLinkRegExp),
    movieId: Joi.string().hex(),
    nameRU: Joi.string().required().pattern(regularCyrilicLettersRegExp),
    nameEN: Joi.string().required().pattern(regularLatinLettersRegExp),
  }),
}), createMovie);

router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

module.exports = router;
