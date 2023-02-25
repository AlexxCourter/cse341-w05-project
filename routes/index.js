const routes = require('express').Router();
const passport = require('passport');

routes.use('/user', require('./user'));
routes.use('/achievements', require('./achievements'));
routes.use('/auth', require('./auth'));
// routes.get('/api-docs/auth',
// //#swagger.ignore = true
// passport.authenticate('google', {scope: ['profile']}));

module.exports = routes;
