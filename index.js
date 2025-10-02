import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import productRouter from './router/productRoute.js';
import userRouter from './router/userRoute.js';
import jwt from 'jsonwebtoken';
import orderRouter from './router/orderRoute.js';
import dotenv from 'dotenv';
dotenv.config();
//import fetch from 'node-fetch'; 
import cors from 'cors';
  


//import { fetch } from 'undici-types';


//DLDtKDHxmExLK4X0
//jasingha2002sadininipunika_db_user
//mongodb+srv://jasingha2002sadininipunika_db_user:DLDtKDHxmExLK4X0@cluster0.rtl1zya.mongodb.net/


const app = express();

app.use(cors());

app.use(bodyParser.json())
// i create middleware 
 app.use((req, res, next) => {
  const tokenString = req.headers['authorization'];

  if (tokenString!=null) {
    const token = tokenString.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
  if (decoded!=null) {
    req.user = decoded;
    next();
  } else {
    console.log(err,"Invalid Token");
   res.status(403).json({ message: "Invalid Token" });
   return;
  }

  const token = jwt.sign(
  payload,
  process.env.JWT_KEY || "cbc-batch-five#@2025",
  { expiresIn: "1h" } // instead of "1h"
);

  req.user = decoded;
  next();
});
  } else {
    return next();
  }
});






mongoose.connect(process.env.MONGODB_url)
.then(() => 
    console.log('Connected to MongoDB'))
.then(() => {
    app.listen(5000, () => {
        console.log('Server is running on port 5000');
    }); 
})
.catch(err => console.error('Could not connect to MongoDB...', err));



app.use("/products", productRouter );
app.use("/users", userRouter );  
app.use("/orders", orderRouter );








