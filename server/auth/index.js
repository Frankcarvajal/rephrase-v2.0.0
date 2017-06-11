const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;
const { User } = require('../models/user');

mongoose.Promise = global.Promise;

// Define the google and bearer strategies here and then export
// them to the usersRouter where you can insert passport middleware
// for user authentication

passport.use(
    new GoogleStrategy({
        clientID:  process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: `/api/auth/google/callback`
    },
    (accessToken, refreshToken, profile, cb) => {
        // Mongo User model stores the google id and google access token
        const _user = {
            googleId: profile.id,
            displayName: profile.displayName,
            accessToken
        };
        return User
            .findOne({googleId: _user.googleId})
            .exec()
            .then(user => {
                if (!user) {
                    // If there is no user in the database, just create a new user
                   return User.create(_user) 
                }
                // Otherwise, update new access token
                return User.findByIdAndUpdate(user._id, { $set: { accessToken } }, { new: true });
            })
            .then(user => cb(null, _user))
            .catch(err => console.error(err));
    }
));

passport.use(
    new BearerStrategy(
        (token, done) => {
            // Try to find a user with a matching access token.
            // If they exist, let them in, if not refuse entry
            // token comes into middleware via Authorization header
            return User
                .findOne({ accessToken: token })
                .exec()
                .then(user => {
                    if (!user) {
                        return done(null, false); // authentication fails 
                    }
                    return done(null, user);
                })
                .catch(err => console.error(err));
        }
    )
);

module.exports = { passport };