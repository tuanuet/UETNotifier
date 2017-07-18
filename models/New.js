/* eslint-env node */
var mongoose = require('mongoose');
//model crawl dũ liệu trên sevêr cũ
var TinTucSchema = new mongoose.Schema({
    id:{
        type:mongoose.Schema.ObjectId,
        required: true,
        unique: true
    },
    link:{
        type: String,
        unique: true,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    content:{
        type : String,
        require: true
    },
    imageLink :{
        type : String,
        require : true
    },
    postAt : {
        type : Date,
        require :true,
        default :Date.now()
    },
    kind : {
        type : Number,
        required : true,
        ref : 'KindOfNew'
    }
},{
    timestamps : true,
    _id : false
})
TinTucSchema.methods.findLimitOffset = (param,offset,limit = 10) => {
    return TinTucSchema
        .find(param)
        .sort({'postAt': -1})
        .limit(limit)
        .skip(offset)
        .populate('kind');

};

TinTucSchema.methods.find = (param,limit = 10) => {
    return TinTucSchema
        .find(param)
        .limit(limit)
        .sort({'postAt': -1})
        .populate('kind');
};
module.exports = mongoose.model('New',TinTucSchema);