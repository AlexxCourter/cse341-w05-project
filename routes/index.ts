const routes = require('express').Router();

routes.use('/user', require('./user.ts'));
routes.use('/achievements', require('./achievements.ts'));
routes.use('/auth', require('./auth.ts'));
// routes.get('/api-docs/auth',
// //#swagger.ignore = true
// passport.authenticate('google', {scope: ['profile']}));

module.exports = routes;
