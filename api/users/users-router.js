const express = require('express');
const {validateUserId} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required
const router = express.Router();


router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      console.log(users)
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
          message: "The posts information could not be retrieved"
      })
  })

});

router.get('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE USER OBJECT
  console.log(req.user)
  await res.json(req.user)
  // this needs a middleware to verify user id
});

router.post('/', (req, res) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
});

router.put('/:id', (req, res) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.delete('/:id', (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
});

router.get('/:id/posts', (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
});

router.post('/:id/posts', (req, res) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'Something bad happend inside the hubs router',
    message: err.message,
  });
});
// do not forget to export the router
module.exports = router
