/* eslint-env node */
const User = require('../models/User');
const Student = require('../models/Student');
const jwt = require('jwt-simple');
const config = require('../config/database.conf');

export const info = (req,res) => {
    User.find().then((result) => {
        res.json(result);
    }).catch(err => console.log(err));
}
export const infoStudent = (req,res) => {
    Student.find().populate([{path : '_id'}]).then((sv) => {
        res.json(sv);
    }).catch(err => console.log(err));
}