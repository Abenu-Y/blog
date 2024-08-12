import express from 'express'

const router = express.Router()

import userRoutes from './user.routes.js'
import authRoutes from './auth.routes.js'
import postRoutes from './post.routes.js'
import commentRoutes from './comment.routes.js'


router.use('/api/user', userRoutes)
router.use('/api/auth',authRoutes)
router.use('/api/post',postRoutes)
router.use('/api/comment',commentRoutes)


router.use((err,req,res, next)=>{
    const statusCode = err?.statusCode || 500
    const message = err.message || 'Internal Server Error'
    res.status(statusCode).json({
        success:false,
         statusCode,
         message
    })
})


export default router


