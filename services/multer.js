const multer = require('multer')
const {nanoid} =require('nanoid')
const path = require('path')
const fs = require('fs')
const fileValidation =  {
    image :['image/jpeg','image/png'],
    pdf : ['apllications/pdf']
}
const HME = (err,req,res,next)=>{
    if (err) {
        res.status(500).json({message:'multer err',err})
    } else {
        next()
    }
}
function myMulter(customPath , customValidation) {
    if (!customPath) {
        customPath = "general"
    }
    const fullPath = path.join(__dirname,`../uploads/${customPath}`)
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath,{recursive:true})
    }
    const storage = multer.diskStorage({
        destination : function (req,file,cb) {
            req.finalDestination = `uploads/${customPath}`
            cb(null,fullPath)
        },
        filename : function (req,file,cb) {
            cb(null,nanoid()+"_"+file.originalname)
        }
    })

const fileFilter = function (req,file,cb) {
    if (customValidation.includes(file.mimetype)) {
        cb(null,true)
    } else {
        req.fileErr = true
        cb(null,true)
    }
    
}

const upload = multer({dest:fullPath,limits:{fileSize:6250000},fileFilter,storage})
return upload


}









module.exports = {
    myMulter,
    fileValidation,
    HME
}