const {findProduct} = require('../services/productService');
const {findOrder, addNewOrder, deleteOrder, findOrderById, addProductToOrder, updateOrderStatus, updateOrderDetails, cancelOrder, removeProductFromOrder} = require('../services/orderService.js');
const result2 = "No such order found!";

const getOrderByIdController = async (req, res) =>{                 //for user(customer)
    const id = req.user._id;
    const result = await findOrder(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const getSpecificOrderController = async (req, res) =>{   
    const {id} = req.params;
    const result = await findOrderById(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const updateOrderDetailsController = async (req, res) =>{
    const orderId = req.params.id;
    const {updates} = req.body;
    const result = await updateOrderDetails(orderId, updates);
    if(!result)
        return res.status(404).json({'message': "Something went wrong!"});
    return res.status(204).json({'message':result});
}

const createNewOrderController = async (req, res) =>{
    const pId = req.body.productId; //product Id
    const prodTmp = await findProduct(pId);

    if(prodTmp){
        var order = {
            shippingInfo: {
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                zip: req.body.zip,
                cellNo: req.body.cellNo,
            },
            customer: {
                userId: req.user._id,
                userName: req.user.name,
            },
            items: {
                productId: pId,
                price: Number(prodTmp.price)
            },
            itemsPrice: Number(prodTmp.price),
            taxPrice: Number(prodTmp.price)*18/100,      //assumed tax as 18%
            shippingPrice: Number(1000), 
            totalPrice: 0
        }
        order.totalPrice = Number( order.itemsPrice + order.taxPrice + order.shippingPrice );
    }else{
        var order = {
            shippingInfo: {
                address: req.body.address,
                city: req.body.city,
                country: req.body.country,
                zip: req.body.zip,
                cellNo: req.body.cellNo,
            },
            customer: {
                userId: req.user._id,
                userName: req.user.name,
            },
            itemsPrice: Number(0),
            taxPrice: Number(0),      
            shippingPrice: Number(0), 
            totalPrice: Number(0)
        }
    }
    const result = await addNewOrder(order);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const addProductToOrderController = async (req, res) =>{
    const productId = req.body.pid;
    const orderId = req.params.id;
    
    const result = await addProductToOrder(orderId, productId);
    if(!result)
        return res.status(404).json({'message': "Something went wrong!"});
    return res.status(200).json({'message':result});
}

const removeProductFromOrderController = async (req, res) =>{
    const productId = req.body.pid;
    const orderId = req.params.id;
    
    const result = await removeProductFromOrder(orderId, productId);
    if(!result)
        return res.status(404).json({'message': "Something went wrong!"});
    return res.status(200).json({'message':result});
}

const deleteOrderController = async (req, res) => {       //by the user himself
    if(req.params.id){
        const id = req.params.id;
        const result = await deleteOrder(id);
        if(!result){
            return res.status(404).json({'message':result2});
        }
        console.log("Order deleted from database.");
        return res.status(200).json({'message':result}); 
    }
    return res.status(404).json({'message': "Something went wrong!"});
}

const cancelOrderController = async (req, res) =>{
    if(req.params.id){
        const id = req.params.id;
        const result = await cancelOrder(id);
        if(!result){
            return res.status(404).json({'message':result2});
        }1
        return res.status(200).json({'message':result}); 
    }
    return res.status(404).json({'message': "Something went wrong!"});
}

const updateOrderStatusController = async (req, res) =>{            //for admin
    if(req.params.id && req.body.status){
        const id = req.params.id;
        const status = req.body.status;
        const result = await updateOrderStatus(id, status);
        if(!result){
            return res.status(404).json({'message': "Something went wrong!"});
        }1
        return res.status(200).json({'message':result}); 
    }
    return res.status(404).json({'message': "Something went wrong!"});
}

module.exports.updateOrderStatusController = updateOrderStatusController;
module.exports.removeProductFromOrderController = removeProductFromOrderController;
module.exports.addProductToOrderController = addProductToOrderController;
module.exports.getOrderByIdController = getOrderByIdController;
module.exports.getSpecificOrderController = getSpecificOrderController;
module.exports.createNewOrderController = createNewOrderController;
module.exports.deleteOrderController = deleteOrderController;
module.exports.cancelOrderController = cancelOrderController;
module.exports.updateOrderDetailsController = updateOrderDetailsController;