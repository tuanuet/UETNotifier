/* eslint-env node */
import User from '../models/User';
const jwt = require('jwt-simple');
const config = require('../config/database');

export const postSignUp = (req ,res) =>{
    if (!req.body.name || !req.body.password) {
        return res.json({success: false, msg: 'Please pass name and password.'});
    }
    var newUser = new User({
        name: req.body.name,
        password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
        if (err)
            return res.json({success: false, msg: 'Username already exists.'});
        res.json({success: true, msg: 'Successful created new user.'});
    });
};

export const postAuthenticate = (req,res) =>{
    User.findOneJoinAll({id: req.body.username})
        .then ((user) => {
            if (!user) {
                return res.json(new Error({
                    success: false,
                    message: 'Authentication failed ,User not Found.'
                }));
            }

            user.comparePassword(req.body.password, (err, isMatch) => {
                if(!isMatch || err)
                    return res.json({
                        succsess: false,
                        message: 'Authentication failed.Password did not match'
                    });
                // if user is found and password is right create a token
                var token = jwt.encode(user, config.secret);

                // return the information including token as JSON
                res.json({success: true, token: 'JWT ' + token});
            });
        }).catch((err) => {
            res.json(err);
        });
};
