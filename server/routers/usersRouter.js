const express = require('express');
const jsonParser = require('body-parser').json();

// const { DEV } = require('./config');
// const knex = require('knex')(DEV);

const router = express.Router();

module.exports = { usersRouter: router };