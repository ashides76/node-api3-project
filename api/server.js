const express = require('express');
const userRouter = require('./users/users-router')
const { logger } = require('./middleware/middleware')
const morgan = require('morgan')

const server = express();

server.use(express.json())
server.use(logger)
server.use('/api/users', userRouter)
server.use(morgan('dev'))


server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;