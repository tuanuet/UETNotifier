/**
 * Created by vmt on 20/07/2017.
 */
import mongoose from 'mongoose';
import User from '../models/User';

export const getDashboard = (req,res) => {
    res.render('admin/dashboard');
}
export const getManagementAccount = (req,res) => {
    let role = (req.params.role || 'Student');
    const stringModel = role.charAt(0).toUpperCase() + role.slice(1);
    const Model = mongoose.model(stringModel);
    Model
        .find({})
        .populate({
            path : '_id'
        })
        .then(models => {
            res.render('admin/management-account',{models});
        })
        .catch(err => {
            res.render('error',{
                success : false,
                err : err.toString()
            });
        });
};
/**
 * Insert an account
 * @param req
 * @param res
 */
export const postAccount = (req,res) => {
    let {email, password, name, role} = req.body;

    if (!role || !email || !password || !name)
        return res.render('error',{
            success : false,
            message : 'invalid'
        });
    // chuẩn hoá Role
    role = role.charAt(0).toUpperCase() + role.slice(1);


    // Logic
    try {
        const Model = mongoose.model(role);
        const user = new User({
            email,
            password,
            role
        });

        user.save()
            .then(({_id}) => {
                const model = new Model({_id,name});
                return model.save();
            })
            .then( result => {
                console.log(result);
                res.json({
                    success: true,
                    result
                });
            })
            .catch( err => {
                return res.render('error',{
                    success : false,
                    message : err.toString()
                });
            });
    }catch (err) {
        return res.render('error',{
            success : false,
            message : err.toString()
        });
    }
};