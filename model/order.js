import e from "express";
import mongoose from "mongoose";
import product from "./product";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: true,
        unique: true,
    }, 
    email: {
        type: String,
        required: true, 
    },
    name : {
        type: String,
        required: true, 
    },
    address: {
        type: String,       
        required: true,
    },
    phone: {
        type: String, 
        required: true,  
    },
    status: {
        type: String,
        required: true,
        default: "Pending",
    },
    total:{
        type: Number,
        required: true,
    } ,
    products: [
        {
            productInfo:{
                productId: { type: String, required: true  },
                name: { type: String, required: true  },
                price: { type: Number, required: true},
                altNames: [{ type: String  }],  
                description: { 
                    type: String,
                    required: ture  },

                

    

            },
            quantity: { type: Number, required: true  }
        }
    ],
    data: {
        type: Date,
        default: Date.now,
    }

   
});

const order = mongoose.model('Order', orderSchema);