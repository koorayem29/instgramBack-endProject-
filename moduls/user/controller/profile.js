const userModel = require("../../../DB/model/User")
const bcrypt = require('bcryptjs')

const displayProfile = async (req,res)=>{
try {
     
    const user = await userModel.findById(req.user._id)
    res.status(200).json({message:"Done", user })

} catch (error) {
    res.status(500).json({message:"Catch error", error })

}
    
}

const profilePic = async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({message:'in-valid format'})
        } else {
            const imageURL = `${req.finalDestination}/${req.file.filename}`
            const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:imageURL},{new:true})
            res.status(200).json({message:'done',user})
        }
    } catch (error) {
        res.status(500).json({message:'catch error',error})
    }
}
const coverPic = async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({message:'in-valid format'})
        } else {

            const imageURL = [];
            req.files.forEach(file => {
                imageURL.push( `${req.finalDestination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id,{profilecov:imageURL},{new:true})

            res.status(200).json({message:'done',user})
        }
    } catch (error) {
        res.status(500).json({message:'catch error',error})
    }
}

const updatePassword = async (req,res)=>{
    try {
        const {oldPassword,newPassword}= req.body 
        if (oldPassword==newPassword) {
            res.status(409).json({message:"sorry u have to make a new password"})
        } else {
            const user = await userModel.findById(req.user._id)
            const match = bcrypt.compare(oldPassword,user.password)
            if (!match) {
                res.status(400).json({message:"in-valid password"})
            } else {
                const hashPassword = await bcrypt.hash(newPassword,parseInt(process.env.saltRound))
                await userModel.findByIdAndUpdate(user._id,{password:hashPassword})
                res.status(200).json({message:"Done"})
            }
        }
      
    } catch (error) {
        
            res.status(500).json({message:"catch error",error})
        }
    }
   
const followUser = async(req,res)=>{
    try {
        const user = req.user;
        const {followId } = req.params;
        
        const userFollowing = await userModel.findById(followId)
        if (!userFollowing) {
            res.status(404).json({message:'user not found'})
        } else {
            if (userFollowing.followers.includes(user._id)) {
            await userModel.findByIdAndUpdate(user._id,{$pull:{followeing:followId}})
            await userModel.findByIdAndUpdate(followId,{$pull:{followers:user._id}})
            res.status(200).json({message:'unfollow',userFollowing})
                
            } else {
             await userModel.findByIdAndUpdate(user._id,{$push:{followeing:followId}})
             await userModel.findByIdAndUpdate(followId,{$push:{followers:user._id}})

            res.status(200).json({message:'follow',userFollowing})
                
          }
        }
    } catch (error) {
        res.status(500).json({message:'catch err',error})
        console.log(error);
    }
}






module.exports = {
    displayProfile,
    profilePic,
    coverPic,
    updatePassword,
    followUser
}