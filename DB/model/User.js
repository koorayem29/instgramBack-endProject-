const mongoose = require("mongoose")
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({


    userName : {type:String , required : true},
    firstName : {type:String },
    lastName : {type:String , },
    email : {type:String , required : true , unique:true},
    password : {type:String , required : true},
    phone: {type:String },
    age : {type:Number , required : true},
    gender : {type:String , required : true , enum:['Male','Female'],default:'Male'},
    profilePic : {type:String },
    profilecov : Array,
    gallery : Array ,
    confirmEmail : {type:Boolean , default:false},
    online : {type:Boolean , default:false},
    isBlooked : {type:String , default : false},
    role : {type:String , default:'User'},
    sociailLinks : Array,
    followers: [{type:mongoose.Schema.Types.ObjectId , ref :'User'}],
    followeing : [{type:mongoose.Schema.Types.ObjectId , ref :'User'}],
    pdfLink : String,
    code : String,
    lastSeen : String
   



},{
    timestames : true
})
userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,parseInt(process.env.saltRound))
    next()
})
userSchema.pre('findOneAndUpdate', async function (next) {
    console.log({model:this.model});
    console.log({query:this.getQuery()});
    const hookData = await this.model.findOne(this.getQuery()).select('__v')
    console.log({hookData});
    this.set({__v:hookData.__v+1})
    next()
})
const userModel = mongoose.model('User',userSchema)
module.exports = userModel