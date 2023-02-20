const { roles } = require("../../meddleware/auth");



const endPoint = {
    geAllUsers :[roles.Admin],
    changeRole:[roles.Admin],
    blookedUser : [roles.Admin]
}

module.exports = {
    endPoint
}