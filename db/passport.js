const GoogleStrategy = require('passport-google-oauth20').Strategy;
const database = require('../db/connector');


module.exports = function(passport){
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
        function(accessToken, refreshToken, profile, done) {
            const user = {
                displayName: profile.displayName,
                googleId: profile.id
            }
            return done(null, user);
        }
    ));
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}