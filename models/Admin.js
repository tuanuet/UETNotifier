/* eslint-env node */
var mongoose = require('mongoose');

var AdminSchema = mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref : 'User',
        unique:true,
        required:true
    },
    name:{
        type:String,
        required: true
    }
},{
    timestamps : true,
    _id : false
});

module.exports = mongoose.model('Admin',AdminSchema);


