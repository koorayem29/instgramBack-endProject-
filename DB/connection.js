const mongoose = require("mongoose")
const connctedDB = ()=>{
    return mongoose.connect(process.env.DBURI)
    .then ( res => console.log(`connected DB on ${process.env.DBURI}`)) 
    .catch ( err => console.log("faild to connect"))

}



module.exports = connctedDB