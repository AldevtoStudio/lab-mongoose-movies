const express = require('express');
const celebritiesRouter = express.Router();
const Celebrity = require('./../models/celebrity');

celebritiesRouter.get('/', (req, res, next) => {
  Celebrity.find({})
    .then((celebrities) => {
      res.render('celebrities', { celebrities });
    })
    .catch((error) => next(error));
});

celebritiesRouter.get('/create', (req, res, next) => {
  res.render('celebrities/create');
});

celebritiesRouter.get('/:id', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render('celebrities/show', { celebrity });
    })
    .catch((error) => next(error));
});

celebritiesRouter.get('/:id/edit', (req, res, next) => {
  Celebrity.findById(req.params.id)
    .then((celebrity) => {
      res.render('celebrities/edit', { celebrity });
    })
    .catch((error) => next(error));
});

celebritiesRouter.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      const id = celebrity._id;
      res.redirect('/celebrities/' + id);
    })
    .catch((error) => {
      res.render('celebrities/create', { message: error.message });
    });
});

celebritiesRouter.post('/:id', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(req.params.id, { name, occupation, catchPhrase })
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => next(error));
});

celebritiesRouter.post('/:id/delete', (req, res, next) => {
  Celebrity.findByIdAndRemove(req.params.id)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch((error) => next(error));
});

module.exports = celebritiesRouter;

/*
.then(() => {})
.catch((error) => next(error));
*/
