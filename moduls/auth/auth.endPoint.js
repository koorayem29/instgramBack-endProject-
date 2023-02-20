const { roles } = require("../../meddleware/auth");


const endPoint = {
    logout:[roles.Admin,roles.HR,roles.User]
}
module.exports ={
    endPoint
}