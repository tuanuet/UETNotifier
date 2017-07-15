/* eslint-env node */
var mongoose = require('mongoose');

var ChuDeSchema = mongoose.Schema({
    name: {
        type: String,
        required : true
    },
    describe : {
        type: String
    }
});

module.exports = mongoose.model('Themes',ChuDeSchema);

