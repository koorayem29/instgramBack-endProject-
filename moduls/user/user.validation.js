const { options } = require("joi");
const Joi = require("joi");


const displayProfile = {
    headers : Joi.object().required().keys({
        authorization : Joi.string().required()
    }).options({allowUnknown:true})

}
const updatePassword = {
    body : Joi.object().required().keys({
     oldPassword: Joi.string().required().pattern(new RegExp(/^(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)),
     newPassword: Joi.string().required().pattern(new RegExp(/^(?=^.{6,20}$)(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/)),
     confirmPassword: Joi.string().required().valid(Joi.ref('newPassword'))
    })
 }

 const followUser = {
    
    params:Joi.object().required().keys({
        followId:Joi.string().min(24).max(24).required()
    })
}


module.exports = {
    displayProfile,
    updatePassword,
    followUser
}