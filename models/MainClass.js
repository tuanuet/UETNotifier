/* eslint-env node */
var mongoose    = require('mongoose');
var LopChinhSchema = mongoose.Schema({
    id:{
        type: String,
        required : true,
        unique: true
    },
    name:{
        required : true,
        type: String
    },
    faculty:{
        required : true,
        type: String,
        ref :'Faculty'
    }
});


module.exports = mongoose.model('MainClass',LopChinhSchema);

