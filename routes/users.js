const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getUser,
  updateUser,
} = require('../controllers/users');
const { regularEmailRegExp } = require('../constants/constants');

router.get('/me', getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().pattern(regularEmailRegExp),
  }),
}), updateUser);

module.exports = router;
