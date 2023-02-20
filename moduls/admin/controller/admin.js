const { findOne, findById } = require("../../../DB/model/User");
const userModel = require("../../../DB/model/User");
const sendEmail = require("../../../services/email");


const getAllusers = async (req,res)=>{

    const users = await userModel.find({role:{$ne:'Admin'}});
    res.status(200).json({message:"Done all user ",users})
}
// change role 
const changeRole = async (req,res)=>{
    try {
        const{id}=req.params
        const{role}=req.body 
        const user = await userModel.findByIdAndUpdate(id,{role},{new:true})
        sendEmail(user.email,`<p> The Admin has change your role to ${user.role}</p>`)
        res.status(200).json({message:"Done  ",user})
    } catch (error) {
        res.status(500).json({message:"error  ",error})
        console.log(error);
    }
   
}
// blook user 
const blookedUser = async (req,res)=>{
    try {
        const{id}=req.params
        const user = await userModel.findOne({_id:id})
        if (req.user.role == user.role) {
            res.status(401).json({message:"u can't blook user with same role "})
            
        } else {
            await userModel.findByIdAndUpdate(user._id,{isBlooked:true})
            sendEmail(user.email,`<p> your account has been blooked </p>`)
            res.status(200).json({message:"Done  ",user})
        }
       
    } catch (error) {
        res.status(500).json({message:"error  ",error})
        console.log(error);
    }
   
}




module.exports = {
    getAllusers,
    changeRole,
    blookedUser
}