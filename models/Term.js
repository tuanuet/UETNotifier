/* eslint-env node */
var mongoose = require('mongoose');

var KiHocSchema = mongoose.Schema({
    id:{
        type:String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Term',KiHocSchema);

