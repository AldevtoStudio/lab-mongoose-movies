const express = require('express');
const moviesRouter = express.Router();
const Movie = require('./../models/movies');

moviesRouter.get('/', (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      res.render('movies', { movies });
    })
    .catch((error) => next(error));
});

moviesRouter.get('/create', (req, res, next) => {
  res.render('movies/create');
});

moviesRouter.get('/:id', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.render('movies/show', { movie });
    })
    .catch((error) => next(error));
});

moviesRouter.get('/:id/edit', (req, res, next) => {
  Movie.findById(req.params.id)
    .then((movie) => {
      res.render('movies/edit', { movie });
    })
    .catch((error) => next(error));
});

moviesRouter.post('/', (req, res, next) => {
  const { name } = req.body;
  Movie.create({ name })
    .then((movie) => {
      const id = movie._id;
      res.redirect('/movies/' + id);
    })
    .catch((error) => {
      res.render('movies/create', { message: error.message });
    });
});

moviesRouter.post('/:id', (req, res, next) => {
  const { name } = req.body;
  Movie.findByIdAndUpdate(req.params.id, { name })
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => next(error));
});

moviesRouter.post('/:id/delete', (req, res, next) => {
  Movie.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/movies');
    })
    .catch((error) => next(error));
});

module.exports = moviesRouter;
