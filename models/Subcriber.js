/* eslint-env node */
var mongoose =require('mongoose');

const SubscribeSchema= new mongoose.Schema({
    id:{
        type:String,
        unique: true,
        ref:'Student'
    },
    kindOfAnnouncement:[{
        type:Number,
        ref:'KindOfAnnouncement'
    }],
    kindOfNew:[{
        type: Number,
        ref:'KindOfNew'
    }]
});

SubscribeSchema.methods.findJoinAll = (params) => {
    return(
        SubscribeSchema
        .find(params)
        .populate([{
            path:'id',
            populate:{
                path:'mainClass',
                populate:{ path:'faculty' }
            }
        },
        { path:'kindOfAnnouncement' },
        { path:'kindOfNew' }
        ])
    );
};

SubscribeSchema.methods.update = (id, params) => {
    return SubscribeSchema.findByIdAndUpdate(id,params,{new: true});
};
SubscribeSchema.methods.delete = (id) => {
    return SubscribeSchema.findByIdAndRemove(id);
};

module.exports = mongoose.model('Subscribe',SubscribeSchema);