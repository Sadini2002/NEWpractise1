import product from "../model/product.js"; 
import { isAdmin } from "./userController.js";

export async function getProducts (req, res) {
    
    try {
          if (isAdmin(req) ) {
            const products = await product.find()
            res.json(products)
        } else  {

            const products = await product.find({isAvailable:true  } )
            res.json(products)
        }
    } catch (err) {

        res.json({
                message: "Failed to get products",
                error: err.message
            });
            
}
}


export function saveProduct(req, res) {

    if(!isAdmin(req) ){
        return res.status(403) .json({ message: "Only admin can create product" });
        return;
    }

 
    const newProduct = new product(
        req.body    
    );
newProduct.save()
    .then(() => {
        res.json({ message: 'Product created successfully' });     
    })
    .catch((err) => {
        res.json({ message: 'Error creating product', error: err });
    }); 



}
    


export async function deleteProduct(req, res) {

    if(!isAdmin(req) ){
        return res.status(403) .json({ message: "Only admin can delete product" });
        return;
    }
    try{
    await product.deleteOne({productId: req.body.productId})
    res.json({ message: 'Product deleted successfully' });  
    } catch (err) {
        res.status(500).json({ message: 'Error deleting product', error: err });
    }

}

