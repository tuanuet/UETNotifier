/* eslint-env node */

import passport from 'passport';

const callbackSignIn = (req,res,next) => {
    return passport.authenticate('local',{session : false},(err,user) => {
        if(err) return res.redirect('/users/login');
        if(user === false)
            return res.redirect('/users/login');
        req.user = user;
        next();
    })(req,res,next);
}

const isAuthenticate = (req,res,next) => {
    return passport.authenticate('jwt', { session: false},(err,user) => {
        if(err) res.redirect('/users/login');
        if(user === false) res.redirect('/users/login');
        req.user = user;
        next();

    })(req,res,next);
};
const reqIsAdmin= function (req,res,next) {
    if (req.user.role === 'Admin')
        next();
    res.render('permission-error',{
        success: false,
        message: 'You dont have permission of Admin'
    });
};

const reqIsLecture = function (req,res,next) {
    if (req.user.role === 'Lecturer')
        next();

    res.render('permission-error',{
        success: false,
        message: 'You dont have permission of Admin'
    });
};
const reqIsDepartment = function (req,res,next) {
    if (req.user.role === 'Department')
        next();

    res.render('permission-error',{
        success: false,
        message: 'You dont have permission of Admin'
    });

};
const reqIsFaculty = function (req,res,next) {
    if (req.user.role==='Faculty')
        return next();
    res.render('permission-error',{
        success: false,
        message: 'You dont have permission of Admin'
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