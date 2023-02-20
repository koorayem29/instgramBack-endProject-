const { roles } = require("../../meddleware/auth");



const endPoint = {
    createPost : [roles.Admin , roles.User ],
    deletePost : [roles.Admin , roles.User ,roles.HR ]
}

module.exports = endPoint