import order from "../model/oderModel.js";
import product from "../model/product.js";
export async function createOder(req, res) {
   //get user info

   if(!req.user== null){
    res.status(403).json({ message: "You are not authorized to cretae an order. Please login and try again" });
    return;
    }
//add current users name to order
    const oderinfo = req.body;
    if(orderInfo.name == null ){
        orderInfo.name = req.user.firstname + " " + req.user.lastname;
    }
   
   //order id genarate

//cbc10001
let orderId="CBC00001";
const lastOrder = await order.findOne().sort({ date : -1 }).limit(1)

if (lastOrder.length>0 ){
    const lastOrderId = lastOrder[0].orderId; 
    // e.g., "CBC00001" replace "CBC" with ""
    const lastOrderNumberString= lastOrderId.replace("CBC","");
    lastOrderNumber = parseInt(lastOrderNumberString);
    const newOrderNumber = lastOrderNumber + 1;
    const newOrderNumberString = newOrderNumber.toString().padStart(5, '0');
    orderId = "CBC" + newOrderNumberString; //cbc00002


}

const order = new order({
    orderId: orderId,
    name: orderInfo.name,
    email: req.user.email,
    address: orderInfo.address,
    total:0,
    products: [],
})
try{

}catch (err) {
    res.status(500).json({ error: err.message });
    return;
}
   //stock check
   //create order object 
}