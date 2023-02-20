const mongoose = require("mongoose")

const commentSchema = mongoose.Schema({

    text:String,
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    postId:{type:mongoose.Schema.Types.ObjectId,ref:"Post",required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    isDeleted:{type:Boolean,default:false},
    deletedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    replays:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}]





},{
    timestames : true
})

const commentModel = mongoose.model('Comment',commentSchema)
module.exports = commentModel