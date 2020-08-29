const db = require('../DB/data');

/**
 * @method logger
 * @description Middleware that show a little logger in the server
 */
const logger = ((req, res, next) => {
  console.log(req.url);
  next();
});

/**
 * @method userCreated
 * @description Middleware that adds a new user in the DB
 */
const userCreated = ((req, res, next) => {
  db.users.push(req.body);
  next();
});

/**
 * @method validateEmailExisting
 * @description Middleware that validates if the email already exist
 */
const validateEmailExisting = ((req, res, next) => {
  const emailFound = db.users.find(user => user.username === req.body.username);
  !emailFound ? next() : next(new Error);
});

/**
 * @method validateEmailExisting
 * @description Middleware that validates if the email already exist
 */
const validateAdminSession = ((req, res, next) => {
  if(JSON.stringify(req.body) === JSON.stringify(db.admin)) {
    next();
  } else next(new Error)
});

module.exports = {
  logger: logger,
  userCreated: userCreated,
  validateEmailExisting: validateEmailExisting,
  validateAdminSession: validateAdminSession
};