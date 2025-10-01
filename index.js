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

app.use(cors());  


//import { fetch } from 'undici-types';


//DLDtKDHxmExLK4X0
//jasingha2002sadininipunika_db_user
//mongodb+srv://jasingha2002sadininipunika_db_user:DLDtKDHxmExLK4X0@cluster0.rtl1zya.mongodb.net/


const app = express();

app.use(bodyParser.json())
// i create middleware 
 app.use((req, res, next) => {
  const tokenString = req.headers['authorization'];

  if (tokenString) {
    const token = tokenString.replace('Bearer ', '');

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
  if (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired, please log in again" });
    }
    return res.status(401).json({ message: "Invalid token" });
  }

  const token = jwt.sign(
  payload,
  process.env.JWT_SECRET || "cbc-batch-five#@2025",
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








