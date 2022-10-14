const mongoose = require('mongoose');
const {
  validateLink,
  validateLatinLetters,
  validateCyrillicLetters,
} = require('../middlewares/validation');

const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  trailerLink: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    default: '0',
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

MovieSchema.path('image').validate(
  validateLink,
  'image `{VALUE}` not valid',
  'Invalid image',
);

MovieSchema.path('nameRU').validate(
  validateCyrillicLetters,
  'nameRU `{VALUE}` not valid',
  'Invalid name',
);

MovieSchema.path('nameEN').validate(
  validateLatinLetters,
  'nameEN `{VALUE}` not valid',
  'Invalid name',
);

MovieSchema.path('trailerLink').validate(
  validateLink,
  'trailerLink `{VALUE}` not valid',
  'Invalid trailerLink',
);

module.exports = mongoose.model('movie', MovieSchema);