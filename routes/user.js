const express = require('express');
const router = express.Router();
const queries = require('../database/queries/queries');


router.get('/', (req, res) => {
  queries.getAllUsers()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  queries.getOneUser(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get('/email/:email', (req, res) => {
  const { email } = req.params;
  queries.getUserByEmail(email)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post('/', (req, res) => {
  const user = req.body;
  queries.addUser(user)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const user = req.body;
  queries.updateUser(id, user)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  queries.deleteUser(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;