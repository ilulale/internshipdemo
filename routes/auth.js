
const jwt = require('express-jwt');
const keys = require('../config/keys');

const getTokenFromHeaders = (req) => {
  const { headers: { authorization } } = req;
  if(authorization && authorization.split(' ')[0] === 'Bearer') {
    return authorization.split(' ')[1];
  }
  return null;
};


const auth = {
  required: jwt({
    secret: keys.secretOrKey,
    userProperty: 'payload',
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: keys.secretOrKey,
    userProperty: 'payload',
    algorithms: ['HS256'],
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;