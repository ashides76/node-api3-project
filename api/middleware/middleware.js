const Users = require('../users/users-model')
const Posts = require('../posts/posts-model')

function logger(req, res, next) {
  // DO YOUR MAGIC
  const timestamp = new Date().toLocaleString()
  const method = req.method
  const url = req.orignalUrl
  console.log('Reqtest Info:', {method: method, url: url, timestamp: timestamp})
  next()
}

async function validateUserId (req, res, next) {
  // DO YOUR MAGIC
  const { id } = req.params
  await Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user
        next()
      } else {
        next({
          status: 404,
          message: "user not found"
        })
      }
    })
    .catch(err => {
      next(err)
    })

}

async function validateUser(req, res, next) {
  // DO YOUR MAGIC
  const { name } = req.body
  // why not required for post?
  // await Users.getUserPosts(name) 
      if (!name || !name.trim()) {
        res.status(400).json({
          message: "missing required name field"
        })
      } else {
        req.name = name.trim()
        next()
      }
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
  const { text } = req.body
  // why not required for post?
  // await Users.getUserPosts(name) 
  if (!text || !text.trim()) {
    res.status(400).json({
      message: "missing required text field"
    })
  } else {
    req.text = text.trim()
    next()
  }
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId,
  validateUser, 
  validatePost,
}