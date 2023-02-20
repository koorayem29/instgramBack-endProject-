const mongoose = require("mongoose")

const postSchema = mongoose.Schema({

    text:String,
    image:{type:Array,required:true},
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true},
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    share:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    isDeleted:{type:Boolean,default:false},
    deletedBy:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    comments:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment"}],





},{
    timestames : true
})

const postModel = mongoose.model('Post',postSchema)
module.exports = postModel