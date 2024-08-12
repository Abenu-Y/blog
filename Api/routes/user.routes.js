import express from 'express'

const router = express.Router()

import userController from '../controllers/user.controller.js'
import { verifyToken } from '../utils/verifyUser.js'


router.get('/test',userController.test)
router.put('/update/:userId',verifyToken,  userController.update)
router.post('/signout',userController.signout)
router.delete('/delete/:userId',verifyToken, userController.deleteUser)
router.get('/getusers', verifyToken, userController.getUsers);
router.get('/:userId', userController.getUser);

export default router