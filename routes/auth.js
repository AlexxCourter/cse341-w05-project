const auth = require('express').Router();
const passport = require('passport');

auth.get('/',
//#swagger.ignore = true
passport.authenticate('google', {scope: ['profile']}));

auth.get('/google/callback',
//#swagger.ignore = true
passport.authenticate('google', {failureRedirect: '/'}), (req,res)=>{
    
});

module.exports = auth