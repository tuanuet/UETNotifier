/* eslint-env node */
var mongoose = require('mongoose');

var LopMonHocSchema = mongoose.Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    time : {
        type: Date,
        default: Date.now
    },
    term : {
        type: String,
        required: true,
        ref : 'Term'
    },
    lecturer : [{
        type: String,
        required : true,
        ref :'Lecturer'
    }]
});

LopMonHocSchema.methods.findJoinAll =  (params) => {
    return LopMonHocSchema.find(params).populate([
        {
            path:'term'
        },
        {
            path:'lecturer',
            populate:{
                path:'faculty'
            }
        }
    ]);
};


module.exports = mongoose.model('Course',LopMonHocSchema);