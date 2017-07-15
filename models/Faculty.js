/* eslint-env node */
var mongoose   = require('mongoose');

var KhoaSchema = new mongoose.Schema({
    id:{
        type: String,
        ref : 'User',
        unique: true
    },
    name: {
        type: String,
        required: true,
        unique:true
    },
    avatar:{
        data: String,
        contentType: String,
    }
});

module.exports = mongoose.model('Faculty',KhoaSchema);

