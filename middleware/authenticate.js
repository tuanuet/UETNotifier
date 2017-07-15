/* eslint-env node */

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
import passport from 'passport';
import User from '../models/User';
var config = require('../config/database'); // get db config file

export const Strategy = (passport) => {
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
export const isAuthenticate = (req,res,next) => {
    return passport.authenticate('jwt', { session: false},(err,user) => {
        if(err) return res.json({success : false,msg : err.toString()});
        if(user === false) return res.json({success: false, msg: 'Authentication failed. User not found.'});
        req.user = user;
        next();

    })(req,res,next);
};
export const reqIsLecture = function (req,res,next) {
    if (req.user.role === 'Lecturer')
        next();

    res.json({
        success: false,
        message: 'You dont have permission of lecturer'
    });
};
export const reqIsDepartment = function (req,res,next) {
    if (req.user.role === 'Department')
        next();

    res.json({
        success: false,
        message: 'You dont have permission of department'
    });

};
export const reqIsFaculty = function (req,res,next) {
    if (req.user.role==='Faculty')
        return next();
    res.json({
        success: false,
        message: 'You dont have permission of Faculty'
    });

};
export const reqIsSinhVien = function (req,res,next) {
    if (req.user.role === 'Student')return next();

    res.json({
        success: false,
        message: 'You dont have permission of Student'
    });
};