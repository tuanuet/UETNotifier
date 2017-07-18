/* eslint-env node */
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

import User from '../models/User';
import LocalStrategy from 'passport-local';
const config = require('../config/database.conf'); // get db config file

export const JWTStrategy = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));
};

export const LCStrategy = (passport) => {
    const opts = {usernameField : 'email'};
    passport.use(new LocalStrategy(opts,(email,password,done) => {
        User.findOne({
            email
        }, function(err, user) {
            if (err) return done(err);
            if (!user) return done(null,false);

            // check if password matches
            user.comparePassword(password, function (err, isMatch) {
                if(err) return done(err);
                if (!isMatch) return done(null,false);
                // if user is found and password is right create a token
                done(null, user);
            });
        });
    }));
};