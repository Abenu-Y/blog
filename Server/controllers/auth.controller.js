
import User from "../models/User.model.js"
import bcrypt from 'bcrypt'
import { errorHandler } from "../utils/error.js"
import jwt from 'jsonwebtoken'

const signup =  async(req,res,next)=>{
    const {username , email ,password} = req.body

    if(!username || !email || !password ){
        next(errorHandler(400,'All fields are required'))
    }

    const hashedPassword = bcrypt.hashSync(password, 10)

    const newUser = new User({
        username, email, password:hashedPassword
    })

   try {

    await newUser.save()

    res.json({msg:'SignUp Successfully'})
    
   } catch (error) {
       next(error)
   }
   
   
}


const signin =  async(req,res,next)=>{
    const {email  ,password} = req.body

    if(!email  || !password ){
        next(errorHandler(400,'All fields are required'))
    }

   try {

    const validUser = await User.findOne({email})

    if(!validUser){
        next(errorHandler(400,'User not found!'))
    }

    // console.log(validUser.password)

    console.log(validUser._doc)

    const validPassword =  bcrypt.compareSync(password, validUser.password)

    console.log(validPassword)

    

    if(!validPassword){
        next(errorHandler(400,'Incorrect Credential !!'))
    } else{
        const {password, ...rest}=validUser._doc
        const token = jwt.sign({id:validUser._id, username:validUser.username, isAdmin:validUser.isAdmin },process.env.SECRET)
        res.status(200).cookie('access_token',token).json(rest)
    }

  
    
   } catch (error) {
       next(error)
   }
   
   
}


const google =  async(req,res,next)=>{
    const {email  , name, googlePhotoUrl} = req.body

  console.log(email, name, googlePhotoUrl)
   try {

    const user = await User.findOne({email})

    console.log(user)

    if(user){

        const token = jwt.sign({id:User._id, username:User.username },process.env.SECRET)

        const {password, ...rest} = user._doc
          console.log("login")
        res.status(200).cookie('access_token',token).json(rest)
    } else{

        const generatedPassword  = Math.random().toString(36).slice(-8)

        const hashedPassword = bcrypt.hashSync(generatedPassword,10)
        const username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4)

        const newUser = new User({
            username,
            email,
            password:hashedPassword,
            profilepic:googlePhotoUrl
        })

        await newUser.save()

        const token = jwt.sign({id:newUser._id, username:newUser.username ,isAdmin:newUser.isAdmin},process.env.SECRET)

        const {password, ...rest} = User._doc

        res.status(200).cookie('access_token',token).json(rest)

    }
    
    }catch(error){
    next(error)
    }
   
   
}



const authController = {
    signup,signin, google
}



export  default authController