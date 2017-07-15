/* eslint-env node */
var mongoose = require('mongoose');

var PhongBanSchema = mongoose.Schema({
    id:{
        type: String,
        ref : 'User',
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    avatar:{
        data: String,
        contentType: String,
    }

});
PhongBanSchema.methods.update = (id, params) => {
    return PhongBanSchema.findByIdAndUpdate(id,params,{new: true});
};

module.exports = mongoose.model('Department',PhongBanSchema);