const routes = require('express').Router();

routes.use('/v1', require('./default'));

module.exports = routes;
