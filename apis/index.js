import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import axios from 'axios'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import path from 'path'



dotenv.config()
const app =express()
const port = 3000


//*Database

mongoose.connect(process.env.MONGO).then(()=>console.log("Database's working")).catch((err)=>console.log("error",err))

const __dirname = path.resolve()

//middleware
app.use(express.json())
app.use(cookieParser())
import router from './routes/index.js' 
// MV9EOTDuS08fB8fv
//test
app.use(router)

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });
  




app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})