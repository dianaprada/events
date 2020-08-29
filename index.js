/**
 * Server config
 */
const express = require('express');
const server = express();
const PORT = 8080; // This should be in the .env file

/**
 * Data Base and Schemas
 */
const db = require('./DB/data');
const userSchema = require('./schemas/userSchema');

/**
 * Middlewares
 */
const { logger, userCreated, validateEmailExisting, validateAdminSession } = require('./middlewares/');
const { errorHandler } = require('./middlewares/errorHandler');
const { Validator } = require('express-json-validator-middleware');
var cors = require('cors')

const validator = new Validator({allErrors: true}); 
const validate = validator.validate;

server.use(cors()) //Enable CORS Origin *
server.use(express.json());
server.use(logger);

// POST - Retrieve all users
server.post('/admin', validateAdminSession, (req, res) => {
  res.json(db.users);
});

// POST - Register
server.post(
  '/subscription',
  validate({body: userSchema}),
  validateEmailExisting,
  userCreated,
  (req, res) => {
    res.send(req.body)
  }
);

server.use(errorHandler);

server.listen(PORT, (() => {
  console.log(`Listeniing on port ${PORT}`);
}));