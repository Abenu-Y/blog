import jwt from 'jsonwebtoken'
import {errorHandler} from './error.js'

export const verifyToken = (req, res, next) =>{
 const token =req.cookies.access_token

 if(!token){
    return next(errorHandler(401,'Unauthorized'))
 }

 jwt.verify(token , process.env.SECRET , (err, userData)=>{

    if(err){
        return next(errorHandler(401,'Unauthorized'))
    }

    req.user = userData
    next()
 })
}