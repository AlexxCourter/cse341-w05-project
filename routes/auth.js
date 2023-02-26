const auth = require('express').Router();
const passport = require('passport');

auth.get('/',
//#swagger.ignore = true
passport.authenticate('google', {scope: ['profile']}));

auth.get('/google/callback',
//#swagger.ignore = true
passport.authenticate('google', {failureRedirect: '/'}), (req,res)=>{
    console.log('auth successful');
    if(req.isAuthenticated){
        console.log('where is the token?')
    }
});

module.exports = auth