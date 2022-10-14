const router = require('express').Router();
const { validateUpdateDataUser } = require('../middlewares/validation');
const {
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getUser);

router.patch('/me', validateUpdateDataUser, updateUser);

module.exports = router;
