const validateLink = function validateLink(value) {
  return /^(https?:\/\/)?([\w-]{1,32}\.[\w-]{1,32})[^\s@]*$/gm.test(value);
};

const validateLatinLetters = function validateLatinLetters(value) {
  return /^[a-zA-Z0-9\s\S]+$/gm.test(value);
};

const validateCyrillicLetters = function validateCyrillicLetters(value) {
  return /^[а-яА-яёЁ0-9\s\S]+$/gm.test(value);
};

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

module.exports = {
  validateLink,
  validateLatinLetters,
  validateCyrillicLetters,
}