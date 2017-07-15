/* eslint-env node */
var mongoose= require('mongoose');
var MucDoThongBaoSchema = new mongoose.Schema({
    id:{
        type: Number,
        unique: true
    },
    name :{
        type: String,
        required : true
    }
});


module.exports = mongoose.model('PriorityNotify',MucDoThongBaoSchema);