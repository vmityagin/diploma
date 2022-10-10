const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { auth } = require('../middlewares/auth');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const {
  login,
  createUser,
} = require('../controllers/users');
const NotFoundData = require('../errors/not-found-data');

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email({ minDomainSegments: 1 }),
    password: Joi.string().required(),
  }),
}), login);

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email({ minDomainSegments: 1 }),
    password: Joi.string().required(),
  }),
}), createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);

router.use(auth, (req, res, next) => {
  next(new NotFoundData('Такого запроса не существует'));
});

module.exports = router;
