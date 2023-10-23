const express = require("express")
const mongoose = require("mongoose")
const dotenv= require("dotenv")
const cors = require("cors")
const router = require("./routes/todoRoutes")


const app = express()
dotenv.config()

// MIDDLEWARES
app.use(express.json())
app.use(cors())
app.use("/", router)

// CONNECTION TO DB
mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("MONGODB IS CONNECTED"))
.catch((err)=>console.log(err))

const PORT = process.env.PORT

app.listen(PORT, ()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})