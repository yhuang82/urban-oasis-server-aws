const express = require('express');
const router = express.Router();
const queries = require('../database/queries/queries');

router.get('/park/:id', (req, res) => {
  const { id } = req.params;
  queries.getReviewsByPark(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  queries.getReviewsByUser(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post('/', (req, res) => {
  const review = req.body;
  queries.addReview(review)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const review = req.body;
  queries.updateReview(id, review)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  queries.deleteReview(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});


module.exports = router;
