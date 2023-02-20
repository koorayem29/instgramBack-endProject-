const { auth } = require('../../meddleware/auth')
const { myMulter, fileValidation } = require('../../services/multer')
const endPoint = require('./post.endPoint')
const postController = require('./controller/post')
const commentController = require('./controller/comment')
const validation = require('../../meddleware/validetion')
const validator = require('./post.validation')
const router = require('express').Router()
router.get('/',postController.getAllPosts)

router.post('/',auth(endPoint.createPost),myMulter('/post',fileValidation.image).array('image',5),
validation(validator.createPost),postController.creatPost)

router.patch('/:id/comment',auth(endPoint.createPost),
validation(validator.createComment),commentController.creatComment)

router.patch('/:id/like',auth(endPoint.createPost),
validation(validator.createLike),postController.likePost)

router.patch('/:id/replay/:commentId',auth(endPoint.createPost),
validation(validator.createReplay),commentController.creatReplay)

router.patch('/:id/likeComment',auth(endPoint.createPost),
validation(validator.createLike),commentController.likeComment)

router.patch('/:id/deletePost',auth(endPoint.deletePost),
validation(validator.deletePost),postController.deletePost)


module.exports = router