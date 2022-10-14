const router = require('express').Router();
const { filmCelebrate, deleteIdCelebrate } = require('../middlewares/validation');
const {
  getAllMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

router.get('/', getAllMovies);

router.post('/', filmCelebrate, createMovie);

router.delete('/:id', deleteIdCelebrate, deleteMovie);

module.exports = router;
