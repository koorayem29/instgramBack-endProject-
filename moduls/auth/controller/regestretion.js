const userModel = require("../../../DB/model/User")
const sendEmail = require("../../../services/email")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { findById } = require("../../../DB/model/User")

//signup
const signUp =async (req,res)=>{
    try {
        const {userName,email,password,confirmPassword,gender,age} =req.body
    const newUser = userModel({userName,email,password,confirmPassword,gender,age})
    const savedUser =await newUser.save()
    const token = jwt.sign({id:savedUser._id},process.env.emailToken,{expiresIn : 5*60})
    const link = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
    const link2 = `${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${savedUser._id}`
    const message = `<a href="${link}"> follow me to confim your acc  </a>
    <br>
    <a href="${link2}"> refrech token  </a>`
    sendEmail(savedUser.email , message)
    res.status(201).json({message:'Done please check ur email to confim ur account'})
    } catch (error) {
        if (error.keyValue?.email) {
            res.status(409).json({message:'emali exist'})
        } else {
            res.status(500).json({message:'errorSignip', error})
        }
        }
}
//refresh email confirmation
const refreshEmail = async(req,res)=>{
    try {
        const id = req.params.id
        const user = await userModel.findById(id).select('confirmEmail email')
        if (!user) {
            res.status(404).json({message:'in-valid account'})
        } else {
            if (user.confirmEmail) {
                res.status(400).json({message:'u already confirmed'})
            } else {
                const token = jwt.sign({id:user._id},process.env.emailToken,{expiresIn : 2*60})
    const link = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
    const link2 = `${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${token}`
    const message = `<a href="${link}"> follow me to confim your acc  </a>
    <br>
    <a href="${link2}"> refrech token </a>`
    sendEmail(user.email , message)
    res.status(200).json({message:'done plz chick ur email'})
            }
        }
   } catch (error) {
       res.status(500).json({message:'catch err refresh token', error })
   }
}
// confirm email
const confirmEmail = async (req,res)=>{
    try {
        const {token} = req.params
        const decoded = jwt.verify(token,process.env.emailToken)
        if (!decoded) {
            res.status(400).json({message:"in-valid token"})
        } else {
            const user = await userModel.findById(decoded.id).select('confirmEmail')
            if (!user) {
                res.status(404).json({message:"in-valid token id"})
            } else {
                if (user.confirmEmail) {
                    res.status(400).json({message:"u already confirmed "})
                } else {
                      await userModel.findByIdAndUpdate({_id:user._id }, {confirmEmail : true})
                    res.status(200).json({message:"Done plz login"})
                }
            }
        }
    } catch (error) {
        res.status(500).json({message:" catch err",error})
    }
 
}
// signin 
const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email});
        if (!user) {
            res.status(404).json({message:"in-valid email"})
        } else {
            if (!user.confirmEmail) {
                res.status(400).json({message:"plz confirm ur email first"})
            } else {
                if (user.isBlooked.includes('true')) {
                    res.status(400).json({message:"soory this account is blooked"})
                } else {
                    const match = await bcrypt.compare(password,user.password)
                    if (!match) {
                        res.status(400).json({message:"password is not match"})
                    } else {
                         const token = jwt.sign({id:user._id , isLoggedIn:true},
                                process.env.loginToken , {expiresIn:"24h"})
                                await userModel.findOneAndUpdate({_id:user._id},{online:true})
                            res.status(200).json({message:"login sucess" , token})
                    }
                }
              
            }
        }
    } catch (error) {
        res.status(500).json({message:"catch error",error})
    }
}
// logout
const logout = async (req,res)=>{
try {
   await  userModel.findByIdAndUpdate(req.user._id,{ online : false , lastSeen:Date.now()})
    res.status(200).json({message:"logout sucess" })
} catch (error) {
    res.status(500).json({message:"catch error",error})
    
}
    }

//forget password

    const sendCode = async(req,res)=>{
        try {
        const {email} = req.body;
        const user = await userModel.findOne({email})
        if (!user) {
            res.status(404).json({message:"in-valid email"})
        } else {
            const code = Math.floor(Math.random()*(9999 - 1000 + 1)+1000)
            await userModel.findByIdAndUpdate(user._id,{code})
            sendEmail(user.email,`<p>use this code to update your password ${code}</p>`)
            res.status(200).json({message:"Done",code})
        }
    }
 catch (error) {
    res.status(500).json({message:"catch err",error})
}}
const forgetPassword = async(req,res)=>{
    try {
    const {email,code,newPassword} = req.body;
    const user = await userModel.findOne({email})
    if (!user) {
        res.status(404).json({message:"in-valid email"})
    } else {
        if (user.code != code) {
            res.status(400).json({message:"in-valid code"})
        } else {
            const hashedPassword = await bcrypt.hash(newPassword,parseInt(process.env.saltRound))
            await userModel.findByIdAndUpdate(user._id,{password :hashedPassword ,code:"" })
            res.status(200).json({message:"Done plz loggin"})
        }
        
    }
}
catch (error) {
res.status(500).json({message:"catch err",error})
}}








module.exports = {
    signUp,
    confirmEmail,
    login ,
    refreshEmail,
    sendCode,
    forgetPassword,
    logout
}