const commentModel = require("../../../DB/model/Comment");
const { findOne } = require("../../../DB/model/Post");
const postModel = require("../../../DB/model/Post");



const creatComment = async(req,res)=>{
    try {
        const {text} =req.body;
        const {_id} = req.user;
        const {id} = req.params;
        const post = await postModel.findOne({_id:id})
        if (!post) {
            res.status(404).json({message:"in-valid post id"})
        } else {
            const createComment = new commentModel({text,postId:post._id,createdBy:_id})
            const savedComment = await createComment.save()
            await postModel.findByIdAndUpdate(post._id,{$push:{comments:savedComment._id}})
            res.status(201).json({message:"done",savedComment})
        }
    } catch (error) {
        res.status(500).json({message:"catch err",error})
    }
}
const creatReplay = async(req,res)=>{
    try {
        const {text} =req.body;
        const {_id} = req.user;
        const {id,commentId} = req.params;
        const post = await postModel.findOne({_id:id})
        if (!post) {
            res.status(404).json({message:"in-valid post id"})
        } else {
            const comment = await commentModel.findOne({_id:commentId,postId:post._id})
            if (!comment) {
                res.status(404).json({message:"in-valid comment id"})
            } else {
                const createComment = new commentModel({text,postId:post._id,createdBy:_id})
            const savedComment = await createComment.save()
            await commentModel.findByIdAndUpdate(commentId,{$push:{replays:savedComment._id}})
            res.status(201).json({message:"done",savedComment})
            }
            
        }
    } catch (error) {
        res.status(500).json({message:"catch err",error})
    }
}
const likeComment = async(req,res)=>{
    try {
       const {id} = req.params
       const {_id} = req.user 
       const comment = await commentModel.findById(id)
    //    if (comment.createdBy.toString()==_id.toString()) {
    //     res.status(400).json({message:"sorry u can't like your own comment"})
    //    } else {
        if (comment.likes.includes(_id)) {
            await commentModel.findByIdAndUpdate(id,{$pull:{likes:_id}})
            res.status(200).json({message:"unLike"})
           } else {
            await commentModel.findByIdAndUpdate(id,{$push:{likes:_id}})
            res.status(200).json({message:"Like"})
           }
       }
   
 //   }
     catch (error) {
        res.status(500).json({message:"eror like",error})
        console.log(error);
    }
  
}

module.exports = {
    creatComment,
    creatReplay,
    likeComment
}