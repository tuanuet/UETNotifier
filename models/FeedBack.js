/* eslint-env node */
var mongoose = require('mongoose');

var FeedbackSchema = mongoose.Schema({
    content :{
        type: String,
        require: true
    },
    sender:{
        type: String,
        require: true,
        ref : 'User'
    },
    time:{
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('Feedback',FeedbackSchema);

