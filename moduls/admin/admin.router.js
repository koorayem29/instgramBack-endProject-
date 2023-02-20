const { auth } = require('../../meddleware/auth')
const { endPoint } = require('./admin.endPoint')
const adminController =  require('./controller/admin')
const router = require('express').Router()


router.get('/users',auth(endPoint.geAllUsers),adminController.getAllusers)

router.patch('/:id/role',auth(endPoint.changeRole),adminController.changeRole)

router.patch('/:id/blook',auth(endPoint.blookedUser),adminController.blookedUser)













module.exports = router 