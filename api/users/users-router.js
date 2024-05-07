const express = require('express');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')

// You will need `users-model.js` and `posts-model.js` both
const Users = require('./users-model')
const Posts = require('../posts/posts-model')

// The middleware functions also need to be required
const router = express.Router();


router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  Users.get()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
          message: "The posts information could not be retrieved"
      })
  })

});

//how do I include catch?***
router.get('/:id', validateUserId, async (req, res) => {
    await res.json(req.user)
});

router.post('/', validateUser, async (req, res, next) => {
  const { name } = req.body
  await Users.insert({name: name})
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(err => {
      next(err)
    })
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  const { id } = req.params
  const { name } = req.body
  await Users.update(id, {name: name.trim()})
    .then(() => {
      return Users.getById(id)
    })
    .then(user => {
      res.status(200).json(user)
    })
    .catch(next)
});

router.delete('/:id', validateUserId, async (req, res) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  const { id } = req.params
  await Users.remove(id)
    .then(() => {
      return res.json(req.user)
    })
});

router.get('/:id/posts', validateUserId, validatePost, async (req, res) => {
  // RETURN THE ARRAY OF USER POSTS
  await res.json(req.post)
  // this needs a middleware to verify user id
});

router.post('/:id/posts', validateUserId, (req, res) => {
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
