require('dotenv').config()
const express = require('express')
const app = express()
const connctedDB = require('./DB/connection')


const port = process.env.port

const indexRouter = require("./moduls/index.router")

app.use(express.json())

const path = require('path')



app.use('/api/v1/uploads',express.static(path.join(__dirname,"./uploads")))
app.use("/api/v1/auth", indexRouter.authRouter)
app.use("/api/v1/user", indexRouter.userRouter)
app.use("/api/v1/post", indexRouter.postRouter)
app.use("/api/v1/admin",indexRouter.adminRouter)















connctedDB()
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})