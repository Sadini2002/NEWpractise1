import express from 'express';
import { getProducts, saveProduct } from '../controller/productController.js';
import { deleteProduct } from '../controller/productController.js';


const productRouter = express.Router();

// Define product routes here
productRouter.get("/",getProducts);
productRouter.post("/", saveProduct);
productRouter.delete("/:productId", deleteProduct);


export default productRouter;

