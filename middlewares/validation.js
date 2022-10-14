const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const {
  regularLatinLettersRegExp,
  regularCyrilicLettersRegExp,
} = require('../constants/constants');

const validateLink = function validateLink(value) {
  return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(value);
};

const validateLatinLetters = function validateLatinLetters(value) {
  return /^[a-zA-Z0-9\s\S]+$/gm.test(value);
};

const validateCyrillicLetters = function validateCyrillicLetters(value) {
  return /^[а-яА-яёЁ0-9\s\S]+$/gm.test(value);
};

const filmCelebrate = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image заполнено некорректно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailerLink заполнено некорректно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполнено некорректно');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().pattern(regularCyrilicLettersRegExp),
    nameEN: Joi.string().required().pattern(regularLatinLettersRegExp),
  }),
});

const deleteIdCelebrate = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required(),
  }),
});

const validateUpdateDataUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().email().required(),
  }),
});

module.exports = {
  validateLink,
  validateLatinLetters,
  validateCyrillicLetters,
  filmCelebrate,
  deleteIdCelebrate,
  validateUpdateDataUser,
};
