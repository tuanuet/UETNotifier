/* eslint-env node */
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var ThongBaoSchema = mongoose.Schema({
    kindOfSender:{
        type: mongoose.Schema.ObjectId,
        enum: ['Department','Faculty','Lecturer']
    },
    kindOfReceiver:{
        type: mongoose.Schema.ObjectId,
        enum:['Student','Faculty','Course','MainClass','All']
    },
    title:{
        type: String,
        required : true
    },
    content:{
        type: String,
        required: true
    },
    sender:{
        type: String,
        refPath: 'kindOfSender'
    },
    receiver:{
        type: String,
        refPath: 'kindOfReceiver'
    },
    //file đính kèm
    file:[{
        type: Schema.Schema.ObjectId,
        ref : 'File'
    }],
    kindOfAnnouncement:{
        type: Number,
        ref: 'KindOfAnnouncement'
    },
    priorityNotify:{
        type: Number,
        ref:'PriorityNotify',
        required: true,
        default : '0'
    },
    link:{
        type: String,
        unique: true,
        sparse: true
    },
    feedback:[
        {
            kindOfSenderFeedback:{
                type: mongoose.Schema.ObjectId,
                enum:['Admin','Faculty','Department','Lecturer','Student'],
                require: true
            },
            content :{
                type: String,
                require: true
            },
            senderFeedback:{
                type: mongoose.Schema.ObjectId,
                require: true,
                refPath: 'feedback.kindOfSenderFeedback'
            },
            time:{
                type: Date,
                default: Date.now
            }
        }
    ]
},{
    timestamps : true,
    _id : false
});


ThongBaoSchema.methods.findJoinAll = (params) => {
    return ThongBaoSchema.find(params).populate([
        { path:'file' },
        { path:'kindOfAnnouncement' },
        { path: 'priorityNotify' },
        { path:'feedback.senderFeedback'},
        { path:'sender' },
        { path:'receiver'}
    ]);
};

ThongBaoSchema.methods.findOneJoinAll = (params) => {
    return ThongBaoSchema.findOne(params).populate([
        { path:'file'  },
        { path:'kindOfAnnouncement' },
        { path: 'priorityNotify' },
        { path:'feedback.senderFeedback'},
        { path:'sender' },
        { path:'receiver'}
    ]);
};

//no feedback
ThongBaoSchema.methods.findJoinAllLimitOffset = (params,limit = 10,offset = 0) => {
    return ThongBaoSchema
        .find(params)
        .limit(limit)
        .skip(offset)
        .populate([
            { path:'file'  },
            { path:'kindOfAnnouncement'},
            { path:'sender' },
            { path:'receiver'}
        ]);
};

module.exports = mongoose.model('Announcement',ThongBaoSchema);

