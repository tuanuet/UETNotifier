/* eslint-env node */
var mongoose = require('mongoose');

var GiangVienSchema = mongoose.Schema({
    id:{
        type: String,
        ref : 'User',
        unique:true
    },
    name:{
        type:String,
        required: true
    },
    faculty:{
        type:String,
        ref:'Faculty'
    },
    course: [{
        type: String,
        ref : 'Course'
    }],
    avatar:{
        data: String,
        contentType: String,
    }
});

GiangVienSchema.methods.findJoinAll = (params) => {
    return GiangVienSchema.find(params).populate([
        { path:'faculty' },
        { path:'course' }
    ]);
};

module.exports = mongoose.model('Lecturer',GiangVienSchema);


