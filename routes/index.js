const routes = require('express').Router();

routes.use('/user', require('./user'));
routes.use('/achievements', require('./achievements'));
routes.use('/auth', require('./auth'));

module.exports = routes;
