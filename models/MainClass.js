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
    master: {
        type: mongoose.Schema.ObjectId,
        ref : 'Lecturer'
    },
    faculty:{
        required : true,
        type: String,
        ref :'Faculty'
    }
},{
    timestamps : true,
    _id : false
})


module.exports = mongoose.model('MainClass',LopChinhSchema);

