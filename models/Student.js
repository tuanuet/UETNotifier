/* eslint-env node */
var mongoose = require('mongoose');

var SinhVienSchema =new  mongoose.Schema({
    id:{
        type: String,
        unique: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    mainClass:{
        type: String,
        ref :'MainClass'
    },
    course:[{
        type: String,
        ref: 'Course'
    }],
    token:{
        type: String
    },
    avatar:{
        date: String,
        contentType: String,
    }
});



SinhVienSchema.methods.findJoinAll = (params) => {
    return(
        SinhVienSchema
        .find(params)
        .populate([
            {
                path:'mainClass',
                populate:{path:'faculty'}
            },
            {
                path:'course',
                populate:{ path:'lecture'}
            }
        ])
    );
};

SinhVienSchema.methods.update = (id, params) => {
    return SinhVienSchema.findByIdAndUpdate(id,params,{new: true});
};


module.exports = mongoose.model('Student',SinhVienSchema);

