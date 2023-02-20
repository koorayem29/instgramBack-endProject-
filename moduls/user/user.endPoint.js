const { roles } = require("../../meddleware/auth");




const endPoint = {
    displyProfile:[roles.Admin,roles.User],
    followUser:[roles.User]
}



module.exports = {
    endPoint
}