import express from 'express'
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from 'cors'
import authRoute from "./routes/auth.js";
import postRoute from './routes/posts.js'
import fileUpload from 'express-fileupload'
const app = express()
mongoose.set('strictQuery', true)
dotenv.config()
//const
const PORT = process.env.PORT || 4002
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))
// Routes
app.use('/auth',authRoute)
app.use('/posts',postRoute)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.jixajfr.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`)

        app.listen(PORT,() => {
            console.log(`server start:${PORT}`)
        })
    }catch (error){
        console.log(error)
    }
}
start()

