/* eslint-env node */

import passport from 'passport';

export const callbackSignIn = (req,res,next) => {
    return passport.authenticate('local',{session : false},(err,user) => {
        if(err) return res.json({success : 'false',message : err.toString()})
        if(user === false)
            return res.json({success : 'false',message : 'Authentication failed. User not found.'})
        req.user = user;
        next();
    })(req,res,next);
}

export const isAuthenticate = (req,res,next) => {
    return passport.authenticate('jwt', { session: false},(err,user) => {
        if(err) return res.json({success : false,msg : err.toString()});
        if(user === false) return res.json({success: false, msg: 'Authentication failed. User not found.'});
        req.user = user;
        next();

    })(req,res,next);
};
export const reqIsAdmin= function (req,res,next) {
    if (req.user.role === 'Admin')
        next();

    res.json({
        success: false,
        message: 'You dont have permission of Admin'
    });
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