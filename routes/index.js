const routes = require('express').Router();

routes.use('/user', require('./user'));
routes.use('/achievements', require('./achievements'));

module.exports = routes;
