/* eslint-env node */
var mongoose = require('mongoose');

var SinhVienSchema =new  mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        unique: true,
        ref: 'User',
        required:true
    },
    name: {
        type: String,
        required: true
    },
    mainClass:{
        type: String,
        ref :'MainClass',
        required:true
    },
    course:[{
        type: mongoose.Schema.ObjectId,
        ref: 'Course'
    }],
    token:{
        type: String
    },
    kindOfAnnouncement:[{
        type:Number,
        ref:'KindOfAnnouncement'
    }],
    kindOfNew:[{
        type: Number,
        ref:'KindOfNew'
    }]
},{
    timestamps : true,
    _id : false
})


SinhVienSchema.methods.findOneJoinAll = (params) => {
    return(
        SinhVienSchema
        .findOne(params)
        .populate([
            {
                path:'mainClass',
                populate:{path:'faculty'}
            },
            {
                path:'course',
                populate:{ path:'lecture'}
            },
            { path:'kindOfAnnouncement' },
            { path:'kindOfNew' }
        ])
    );
};

SinhVienSchema.methods.update = (id, params) => {
    return SinhVienSchema.findByIdAndUpdate(id,params,{new: true});
};


module.exports = mongoose.model('Student',SinhVienSchema);

