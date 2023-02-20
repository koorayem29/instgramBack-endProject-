const router = require('express').Router()
const regestretionConnect = require('./controller/regestretion')
const validator =require('./auth.validatiom')
const validation = require('../../meddleware/validetion')
const { auth } = require('../../meddleware/auth')
const { endPoint } = require('./auth.endPoint')

// sign up
router.post("/signup" , validation(validator.signup), regestretionConnect.signUp)
// confirm email
router.get('/confirmEmail/:token' , regestretionConnect.confirmEmail)
// sign in
router.post('/login',regestretionConnect.login)
// logout
router.patch('/logout',auth(endPoint.logout),regestretionConnect.logout)

// refresh email
router.get('/refreshEmail/:id',regestretionConnect.refreshEmail)

//forget password
router.post('/sendCode',validation(validator.sendCode),regestretionConnect.sendCode)
router.post('/forgetPassword',validation(validator.forgetPassword),regestretionConnect.forgetPassword)












module.exports = router 