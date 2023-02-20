const commentModel = require("../../../DB/model/Comment");
const postModel = require("../../../DB/model/Post");
const userModel = require("../../../DB/model/User");
const { post } = require("../post.router");


//  get all posts 

// const getAllPosts = async (req,res)=>{
//     try {
//        const post =[];
//        const cursor = postModel.find({}).cursor();
//        for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
//         console.log(doc); // Prints documents one at a time
//         const comment = await commentModel.find({postId:doc._id})
//         post.push({post:doc,comment})
//       }
//             res.status(200).json({message:"done",post})
        
//     } catch (error) {
//         res.status(500).json({message:"catch erorr",error})
//     }

// }

const getAllPosts = async (req,res)=>{
    try {
       const post = await postModel.find({isDeleted:{$ne:'true'}}).populate([{
        path:'createdBy',
        select:"userName email"
    },
        {
            path:'comments',
            populate:[{
                path:'createdBy',
                select:"userName email"
            }
            , {path:'likes',
            select:"userName email"}
            ,
           { path:'replays',
            populate:[{
                path:'createdBy text replays',
                select:"userName email replays"

            },{path:'likes',
            select:"userName email"}
            , { path:'replays',
            populate:[{
                path:'createdBy text replays',
                select:"userName email replays"

            },{path:'likes',
            select:"userName email"}
                ]
                    }
                ]
                    }
                        ]
        },
        {
            
                path:'likes',
                select:"userName email"
                
            
        }
       ])
       
            res.status(200).json({message:"done",post})
        
    } catch (error) {
        res.status(500).json({message:"catch erorr",error})
        console.log(error);
    }

}

// cerate post 
const creatPost = async (req,res)=>{
    try {
        const {text} = req.body
        if (req.fileErr) {
            res.status(400).json({message:"in vaild format"})
        } else {

            const imageURL = [];
            req.files.forEach(file => {
                imageURL.push( `${req.finalDestination}/${file.filename}`)
            });
            const newPost = new postModel({text,image:imageURL,createdBy:req.user._id})
            const savePost = await newPost.save()
            await userModel.findByIdAndUpdate(req.user._id,{$push:{gallery:savePost._id}})
            res.status(201).json({message:"done",savePost})
        }
    } catch (error) {
        res.status(500).json({message:"catch erorr",error})
    }

}

// like post 
const likePost = async(req,res)=>{
    try {
       const {id} = req.params
       const {_id} = req.user 
       const Post = await postModel.findById(id)
       if (Post.createdBy.toString()==_id.toString()) {
        res.status(400).json({message:"sorry u can't like your own post"})
       } else {
        if (Post.likes.includes(_id)) {
            await postModel.findByIdAndUpdate(id,{$pull:{likes:_id}})
            res.status(200).json({message:"unLike"})
           } else {
            await postModel.findByIdAndUpdate(id,{$push:{likes:_id}})
            res.status(200).json({message:"Like"})
           }
       }
    
    } catch (error) {
        res.status(500).json({message:"eror like",error})
        console.log(error);
    }
  
}
// delete post 
const deletePost = async (req,res)=>{
    try {
        const {id} = req.params
       const post = await postModel.findById(id)
       if (!post) {
        res.status(404).json({message:"post not found" })
        
       } else {
        if (post.createdBy.toString()!=req.user._id.toString()) {
        res.status(400).json({message:" not auth user " })
            
        } else {
          const deletedPost = await postModel.findByIdAndUpdate(id,{isDeleted:true})
            res.status(200).json({message:"post deleted sucess",deletedPost })
        }
       }
       
    } catch (error) {
        res.status(500).json({message:"catch error",error})
        console.log(error);
        
    }
        }


module.exports = {
    creatPost,
    getAllPosts,
    likePost,
    deletePost
}