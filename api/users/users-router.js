const express = require('express');
const {validateUserId, validateUser, validatePost} = require('../middleware/middleware')

const Users = require('./users-model')
const Posts = require('../posts/posts-model')

const router = express.Router();


router.get('/', (req, res) => {
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
  const { id } = req.params
  await Users.remove(id)
    .then(() => {
      return res.json(req.user)
    })
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  const { id } = req.params
  await Users.getUserPosts(id)
    .then((user) => {
      res.json(user)
    })
    .catch(next)
})

router.post('/:id/posts', validateUserId, validatePost, async (req, res) => {
  const { id } = req.params
  const { text } = req.body
  await Posts.insert({user_id: id, text: text})
    .then(newPost => {
      res.status(201).json(newPost)
    })

});

router.use((err, req, res, next) => { //eslint-disable-line
  res.status(err.status || 500).json({
    customMessage: 'Something bad happend inside the hubs router',
    message: err.message,
  });
});

module.exports = router
