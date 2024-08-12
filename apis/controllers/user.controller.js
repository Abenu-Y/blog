import { errorHandler } from "../utils/error.js"
import bcrypt from 'bcrypt'
import User from "../models/User.model.js"

const test = (req,res)=>{
    res.json({msg:'Hello my mate'})
}

// const update = async(req, res, next) =>{

//     console.log(req.body.password)
//     console.log(req.user)

//     const {username, password, email} =req.body

//     // if(!username || !password || !email){
//     //     return next(errorHandler(400,'please enter all fields'))
//     // }

//     if(req.user?.id !== req.params?.userId){
//         return next(errorHandler(403,'access denied'))
//     }

//     if(req.body?.password){
//         if(req.body?.password.length < 6){
//            return next(errorHandler(400, 'Password must be greather six.'))
//         }

//         req.body.password = bcrypt.hashSync(req.body.password, 10)
//     }

//     if(req.body?.username){
//         if(req.body?.username.length <= 7 || req.body?.username.length >= 20 ){
//            return next(errorHandler(400, 'username should have a minimum of length 7 and a maximum of 20.'))
//         }

//         if (typeof req.body?.username === 'string' && req.body?.username.includes(' ')) {
//             return next(errorHandler(400, 'Username cannot contain spaces.'));
//         }
        
//         if(typeof req.body?.username === 'string' && req.body?.username !== req.body?.username.toLowerCase()  ){
//             return next(errorHandler(400, 'username must be lower case.'))
//         }
    
//         if(typeof req.body?.username === 'string' && !req.body?.username.match(/^[a-zA-Z0-9]+$/)){
//             return next(errorHandler(400, 'username can only contain letters and numbers.'))
//         }

//     }

   

//     console.log(req.body.profilepic)


//     try {

//         const updateUser = await User.findByIdAndUpdate(req.params.userId,{
//              $set:{
//                 username:req.body.username,
//                 email:req.body.email,
//                 profilepic:req.body.profilePic,
//                 password:req.body.password
//              }
//             },
//             {new:true},
//     )


//     const {password,...rest}=  updateUser._doc
//     res.status(200).json(rest)
      
//     } catch (error) {
//       console.log("not update67")
        
//         next(error)
//     }

// }


const update = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters'));
      }
      req.body.password = bcrypt.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, 'Username must be between 7 and 20 characters')
        );
      }
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Username can only contain letters and numbers')
        );
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilepic: req.body.profilepic,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };


const signout = (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json({msg:'User has been signed out'});
    } catch (error) {
      next(error);
    }
  };


const deleteUser = async(req,res,next) =>{
    if (!req.user.isAdmin && req.user.id !== req.params.userId) {
        return next(errorHandler(403, 'You are not allowed to delete this user'));
      }
      try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json({msg:'User has been deleted'});
      } catch (error) {
        next(error);
      }
  }


const getUsers = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You are not allowed to see all users'));
    }
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'asc' ? 1 : -1;
  
      const users = await User.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
  
      const usersWithoutPassword = users.map((user) => {
        const { password, ...rest } = user._doc;
        return rest;
      });
  
      const totalUsers = await User.countDocuments();
  
      const now = new Date();
  
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthUsers = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
  
      res.status(200).json({
        users: usersWithoutPassword,
        totalUsers,
        lastMonthUsers,
      });
    } catch (error) {
      next(error);
    }
  };
  
const getUser = async (req, res, next) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return next(errorHandler(404, 'User not found'));
      }
      const { password, ...rest } = user._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };

const userController = {
    test,update,signout,deleteUser,getUser,getUsers
}



export  default userController