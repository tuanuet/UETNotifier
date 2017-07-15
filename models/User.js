/* eslint-env node */
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


// set up a mongoose model
const UserSchema = new Schema({
    id:{
        type: String,
        unique: true,
        required: true,
        refPath : 'role'
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum : ['Admin','Faculty','Department','Lecturer','Student'],
        default: 'Student'
    }
});

UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) { return next(err); }
        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) { return next(err); }
            user.password = hash;
            next();
        });
    });
});

UserSchema.methods.comparePassword =  function(passw, cb){
    bcrypt.compare(passw,this.password, cb);
};

UserSchema.statics.update = function(id, newparams) {
    return this.findByIdAndUpdate(id,newparams,{new: true});
};

UserSchema.statics.delete =  function(id) {
    return this.findByIdAndRemove(id);
};
UserSchema.statics.findOneJoinAll = function({id}){
    return this
        .findOne({id});
    // .populate('id')

};

module.exports = mongoose.model('User', UserSchema);

