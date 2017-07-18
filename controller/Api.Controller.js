/* eslint-env node */
const User = require('../models/User');
const Student = require('../models/Student');
const Message = (success,message) => {return{success,message};};
import KindOfAnnoucement from '../models/KindOfAnnouncement';
import KindOfNew from '../models/KindOfNew';
import Annoucement from '../models/Announcement';

export const getAllKindOfAnnoucement = (req,res) => {
    KindOfAnnoucement
        .find({})
        .then(kind => {
            res.json(kind);
        })
        .catch(err => res.json(Message(false,err.toString())));
};

export const getAllKindOfNew = (req,res) => {
    KindOfNew
        .find({})
        .then(kind => {
            res.json(kind);
        })
        .catch(err => res.json(Message(false,err.toString())));
};
// Add a KindOfAnnoucement
export const postKindOfAnnoucement = (req,res) => {

};
//Add a KindOfNew
export const postKindOfNew = (req,res) => {

};

export const getAnnoucement = (req,res) => {
    Annoucement
        .findOne(req.params.id || null)
        .then((annouce) => {
            res.json(annouce);
        })
        .catch(err => res.json(Message(false,err.toString())));
};

export const getAllAnnoucement = (req,res) => {
    Annoucement
        .find({})
        .then((annouce) => {
            res.json(annouce);
        })
        .catch(err => res.json(Message(false,err.toString())));
};

export const postAnnoucement = (req,res) => {

}