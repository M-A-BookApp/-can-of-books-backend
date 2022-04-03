'use strict';

//jwt - json web tiaken
const jwt = require('jsonwebtoken');

//jwks - json web key set
const jwksClient = require('jwks-rsa');

//the jwks uri come Auth0 account page -> advanced settings -> endpoints -> 0auth -> JSON web Key set
const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

//i need a getkey function from jsonwebtoken to make things work 
//from: https://www.npmjs.com/package/jsonwebtoken - search for auth0
function getKey(header, callback) {
  client.signinKey(header.kid, function (err, key) {
    var signinKey = key.publicKey || key.rsaPublicKey;
    callback(null, signinKey);
  });
}

//this function is to verify the user on our route
function verifyUser(req, errorFirstOrUserCallbackFunction) {
  try {
    const token = req.headers.authorization.split('')[1];
    console.log(token);
    jwt.verfy(token, getKey, {}, errorFirstOrUserCallbackFunction);
  } catch (error) {
    errorFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;