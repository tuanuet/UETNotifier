/* eslint-env node */
var mongoose = require('mongoose');

var LecturerSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref : 'User',
        unique:true,
        required:true
    },
    name:{
        type:String,
        required: true
    },
    faculty:{
        type:String,
        ref:'Faculty'
    }
},{
    timestamps : true,
    _id : false
})

LecturerSchema.statics.findJoinAll = (params) => {
    return LecturerSchema.find(params).populate([
        { path:'faculty' }
    ]);
};
LecturerSchema.statics.findOneJoinAll = (params) => {
    return LecturerSchema.findOne(params).populate([
        { path:'faculty' }
    ]);
};

module.exports = mongoose.model('Lecturer',LecturerSchema);


