/* eslint-env node */

import passport from 'passport';

const callbackSignIn = (req,res,next) => {
    return passport.authenticate('local',{session : false},(err,user) => {
        if(err) return res.json({success : 'false',message : err.toString()})
        if(user === false)
            return res.json({success : 'false',message : 'Authentication failed. User not found.'})
        req.user = user;
        next();
    })(req,res,next);
}

const isAuthenticate = (req,res,next) => {
    return passport.authenticate('jwt', { session: false},(err,user) => {
        if(err) return res.json({success : false,msg : err.toString()});
        if(user === false) return res.json({success: false, msg: 'Authentication failed. User not found.'});
        req.user = user;
        next();

    })(req,res,next);
};
const reqIsAdmin= function (req,res,next) {
    if (req.user.role === 'Admin')
        next();

    res.json({
        success: false,
        message: 'You dont have permission of Admin'
    });
};

const reqIsLecture = function (req,res,next) {
    if (req.user.role === 'Lecturer')
        next();

    res.json({
        success: false,
        message: 'You dont have permission of lecturer'
    });
};
const reqIsDepartment = function (req,res,next) {
    if (req.user.role === 'Department')
        next();

    res.json({
        success: false,
        message: 'You dont have permission of department'
    });

};
const reqIsFaculty = function (req,res,next) {
    if (req.user.role==='Faculty')
        return next();
    res.json({
        success: false,
        message: 'You dont have permission of Faculty'
    });

};
const reqIsSinhVien = function (req,res,next) {
    if (req.user.role === 'Student')return next();

    res.json({
        success: false,
        message: 'You dont have permission of Student'
    });
};

export default {
    callbackSignIn,reqIsDepartment,reqIsAdmin,reqIsFaculty,reqIsLecture,reqIsSinhVien,isAuthenticate
};