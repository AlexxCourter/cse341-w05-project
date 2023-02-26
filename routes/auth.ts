const auth = require('express').Router();
const routePassport = require('passport');

auth.get(
  '/',
  //#swagger.ignore = true
  routePassport.authenticate('google', { scope: ['profile'] })
);

auth.get(
  '/google/callback',
  //#swagger.ignore = true
  routePassport.authenticate('google', { failureRedirect: '/' }),
  (req,res) => {
    console.log('auth successful');
    if (req.isAuthenticated) {
      console.log(
        res
      );
      res.redirect('/login')
    }
  }
);

module.exports = auth;
