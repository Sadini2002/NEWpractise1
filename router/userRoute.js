import express from 'express';
//import user from '../model/user.js';
import { createUser } from '../controller/userController.js';
import { loginUser } from '../controller/userController.js';


const userRouter = express.Router();


userRouter.post('/',  createUser);
userRouter.post('/login',  loginUser);


export default userRouter;  