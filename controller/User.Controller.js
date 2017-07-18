/* eslint-env node */
import User from '../models/User';
const jwt = require('jwt-simple');
const config = require('../config/database.conf');
import mongoose from 'mongoose';
const Message = (success,message) => {return{success,message};};


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

function getToken(user) {
    let token = jwt.encode({_id : user._id,time : new Date()}, config.secret);
    return `JWT ${token}`;
}
export const postAuthenticate = (req,res) =>{
    // if user is found and password is right create a token
    let token = getToken(req.user)
    // return the information including token as JSON
    res.json({success: true, token});
};
export const getProfile = (req, res)=>{
    const Model = mongoose.model(req.user.role);
    Model
        .findById(req.user._id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.json(Message(false,err.toString()));
        });
}