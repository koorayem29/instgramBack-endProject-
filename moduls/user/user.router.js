const router = require('express').Router()
const { auth } = require('../../meddleware/auth');
const validation = require('../../meddleware/validetion');
const { myMulter, fileValidation, HME } = require('../../services/multer');
const profileController = require('./controller/profile');
const { endPoint } = require('./user.endPoint');
const validator = require("./user.validation")

router.get('/profile',validation(validator.displayProfile),auth(endPoint.displyProfile),profileController.displayProfile)


router.patch('/profile/pic',myMulter('user/profile/pic',fileValidation.image).single("image"),HME
,auth(endPoint.displyProfile),profileController.profilePic)

router.patch('/profile/coverPic',myMulter('user/profile/coverPic',fileValidation.image).array("image",5),HME
,auth(endPoint.displyProfile),profileController.coverPic)

 router.patch("/profile/updatePassword",auth(endPoint.displyProfile),
 validation(validator.updatePassword)
 ,profileController.updatePassword)

router.patch('/follow/:followId',validation(validator.followUser),auth(endPoint.followUser),profileController.followUser)
 








module.exports = router;