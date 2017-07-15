/* eslint-env node */
var mongoose = require('mongoose');

var FileSchema = mongoose.Schema({
    name: {
        type: String
    },
    link:{
        type: String
    },
    img: { data: Buffer, contentType: String }
});

module.exports = mongoose.model('File',FileSchema);

