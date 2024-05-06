const express = require('express')
const morgan = require('morgan')
const Users = require('../users/users-model')

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
  const { id } = req.param
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
}

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId
}