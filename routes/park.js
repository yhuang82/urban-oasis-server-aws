const express = require('express');
const router = express.Router();
const pool = require('../database/connection');
const queries = require('../database/queries/queries');

router.get('/', (req, res) => {
  queries.getAllParks()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  queries.getParkById(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/name/:name", (req, res) => {
  const { name } = req.params;
  queries
    .getParkByName(name)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.get("/prefix/:prefix", (req, res) => {
  const { prefix } = req.params;
  console.log("hit in the prefix route");
  console.log("prefix: ", prefix);
  queries
    .getParkByPrefix(prefix)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.post('/', (req, res) => {
  const park = req.body;
  queries.addPark(park)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const park = req.body;
  queries.updatePark(id, park)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  queries.deletePark(id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err.message);
    });
});


module.exports = router;
