const auth = require('express').Router();
const passport = require('passport');

auth.get('/',
//#swagger.ignore = true
passport.authenticate('google', {scope: ['profile']}));

module.exports = auth