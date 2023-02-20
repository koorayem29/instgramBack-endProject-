
const Joi = require('joi')


const signup = {
   body : Joi.object().required().keys({
    userName:Joi.string().required().pattern(new RegExp(/^[a-zA-Z](([\._\-][a-zA-Z0-9])|[a-zA-Z0-9])*[a-z0-9]$/)),
    email : Joi.string().email().required(),
    age:Joi.number().min(18).required(),
    gender: Joi.valid('Male','Female').required(),
    password: Joi.string().required().pattern(new RegExp(/^(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)),
    confirmPassword: Joi.string().required().valid(Joi.ref('password'))
   })
}
const signin = {
    body: Joi.object().required().keys({
        email : Joi.string().email().required(),
        password: Joi.string().required().pattern(new RegExp(/^(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/))
    })
}

const forgetPassword = {
    body : Joi.object().required().keys({
     email : Joi.string().email().required(),
     code:Joi.string().required(),
     newPassword: Joi.string().required().pattern(new RegExp(/^(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)),
     confirmPassword: Joi.string().required().valid(Joi.ref('newPassword'))
    })
 }

 const sendCode = {
    body : Joi.object().required().keys({
     email : Joi.string().email().required()
    
    })
 }






module.exports = {
    signup,
    signin,
    forgetPassword,
    sendCode
}