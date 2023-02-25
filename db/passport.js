const GoogleStrategy = require('passport-google-oauth20').Strategy;
const database = require('../db/connector');

const dbName = 'GoalAchievement'; //enter with exact capitalization
const collName = 'users';
const User = await database.getDb().db(dbName).collection(collName);

module.exports = function(passport){
    passport.use(new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: '/auth/google/callback'
        },
    ));

    passport.serializeUser(function (user, done){
        done(null,user.id);
    });

    passport.deserializeUser(function (id,done){
        User.findById(id, function(err,user){
            done(err,user);
        });
    });
}