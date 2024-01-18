const db = require('../connection');
const { error, debug, getAll, getOne, insert, update } = require('../../utils/util');

//parks
const getAllParks = () => {
  return db.query("SELECT * FROM parks")
  .then(getAll)
  .catch(error('getUsers'));
};

const getOnePark = (id) => {
  return db.query("SELECT * FROM parks WHERE id = $1", [id])
  .then(getOne)
  .catch(error('getOnePark'));
};

const getParkByName = (searchTerm) => {
  const searchWords = searchTerm.split(" ").filter(Boolean); // Split search term into words

  // Construct a dynamic query to search for partial matches on each word
  const query = `
    SELECT * FROM parks
    WHERE ${searchWords
      .map(
        (word, index) => `LOWER(name) LIKE LOWER('%' || $${index + 1} || '%')`
      )
      .join(" AND ")}
  `;

  return db
    .query(query, searchWords)
    .then(getOne)
    .catch(error("getParkByName"));
};

const getParkByPrefix = (searchTerm) => {
  const searchTermLower = searchTerm.toLowerCase(); // Convert search term to lowercase

  const query = `
    SELECT * FROM parks
    WHERE LOWER(name) LIKE $1 || '%'
  `;

  return db
    .query(query, [searchTermLower])
    .then(getAll) // Retrieve all matching records
    .catch(error("getParksByPrefix"));
};

const getParkById = (id) => {
  return db.query("SELECT * FROM parks WHERE id = $1", [id]).then(getOne).catch(error("getParkById"));
};


const addPark = (park) => {
  return insert(db, 'parks', park)
  .then(getOne)
  .catch(error('addPark'));
};

const updatePark = (id, park) => {
  return update(db, 'parks', id, park)
  .then(getOne)
  .catch(error('updatePark'));
};

const deletePark = (id) => {
  return db.query("DELETE FROM parks WHERE id = $1", [id])
  .then(getOne)
  .catch(error('deletePark'));
};

//users

const getAllUsers = () => {
  return db.query("SELECT * FROM users")
  .then(getAll)
  .catch(error('getUsers'));
}

const getOneUser = (id) => {
  return db.query("SELECT * FROM users WHERE id = $1", [id])
  .then(getOne)
  .catch(error('getOneUser'));
}

const getUserByEmail = (email) => {
  return db.query("SELECT * FROM users WHERE email = $1", [email])
  .then(getOne)
  .catch(error('getUserByEmail'));
};

const addUser = (user) => {
  return insert(db, 'users', user)
  .then(getOne)
  .catch(error('addUser'));
}

const updateUser = (id, user) => {
  return update(db, 'users', id, user)
  .then(getOne)
  .catch(error('updateUser'));
}

const deleteUser = (id) => {
  return db.query("DELETE FROM users WHERE id = $1", [id])
  .then(getOne)
  .catch(error('deleteUser'));
}

//reviews

const getReviewsByPark = (parkId) => {
  return db.query("SELECT * FROM reviews WHERE park_id = $1", [parkId])
  .then(getAll)
  .catch(error('getReviewsByPark'));
};

const getReviewsByUser = (userId) => {
  return db.query("SELECT * FROM reviews WHERE user_id = $1", [userId])
  .then(getAll)
  .catch(error('getReviewsByUser'));
};

const addReview = (review) => {
  return insert(db, 'reviews', review)
  .then(getOne)
  .catch(error('addReview'));
};

const updateReview = (id, review) => {
  return update(db, 'reviews', id, review)
  .then(getOne)
  .catch(error('updateReview'));
};

const deleteReview = (id) => {
  return db.query("DELETE FROM reviews WHERE id = $1", [id])
  .then(getOne)
  .catch(error('deleteReview'));
};

const queries = {
  getAllParks,
  getOnePark,
  addPark,
  updatePark,
  deletePark,
  getAllUsers,
  getOneUser,
  getUserByEmail,
  addUser,
  updateUser,
  deleteUser,
  getReviewsByPark,
  getReviewsByUser,
  addReview,
  updateReview,
  deleteReview,
  getParkByName,
  getParkByPrefix,
  getParkById
};

module.exports = queries; 
