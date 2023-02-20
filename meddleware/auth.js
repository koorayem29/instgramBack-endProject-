const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/User");

const roles ={
    Admin :"Admin",
    User :"User",
    HR :"HR"
}

const auth = (accessRoles)=>{


    return async (req,res,next)=>{
        try {
            const headerToken = req.headers['authorization']
            if (!headerToken.startsWith('Bearer ')  ) {
                res.status(400).json({message:"in-valid header token"})
            } else {
                
                const token = headerToken.split(" ")[1];
                try {
                    const decoded =  jwt.verify(token,process.env.loginToken)
                    if (!decoded || !decoded.isLoggedIn) {
                        res.status(400).json({message:"in-valid token"})
                         
                     } else {
                        
                         const findUser = await userModel.findOne({ _id :decoded.id}).select('role userName email')
                         if (!findUser) {
                             res.status(404).json({message:" usre not found"})
                         } else {
                             if (!accessRoles.includes(findUser.role)) {
                                 res.status(401).json({message:" not auth acc"})
                             } else {
                                 
                             req.user = findUser
                             next()
                             }
                             
                         }
                     }
                } catch (error) {
                    res.status(500).json({message:"validetion error",error})
                    console.log(error);
                }
               
              
            }
    
        } catch (error) {
            res.status(500).json({message:"validetion error",error})
            console.log(error);

        }


    }
}

module.exports = {
    auth,
    roles
} 