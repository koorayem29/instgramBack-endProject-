
const Joi = require('joi')

const createPost = {
    body:Joi.object().required().keys({
        text:Joi.string()
    })
}
const createComment = {
    body:Joi.object().required().keys({
        text:Joi.string().required()
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}
const createReplay = {
    body:Joi.object().required().keys({
        text:Joi.string().required()
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required(),
        commentId:Joi.string().min(24).max(24).required()
    })
}
const createLike = {
    
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}

const deletePost = {
    
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}



module.exports = {
    createPost,
    createComment,
    createLike,
    createReplay,
    deletePost
}


