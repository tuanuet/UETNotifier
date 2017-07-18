/* eslint-env node */
var mongoose = require('mongoose');

var KiHocSchema = mongoose.Schema({
    id:{
        type:mongoose.Schema.ObjectId,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }

},{
    timestamps : true,
    _id : false
})

module.exports = mongoose.model('Term',KiHocSchema);

