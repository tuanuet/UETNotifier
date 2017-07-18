/* eslint-env node */
var mongoose   = require('mongoose');

var KhoaSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.ObjectId,
        ref : 'User',
        unique: true,
        required:true
    },
    name: {
        type: String,
        required: true,
        unique:true
    }
},{
    timestamps : true,
    _id : false
})

module.exports = mongoose.model('Faculty',KhoaSchema);

