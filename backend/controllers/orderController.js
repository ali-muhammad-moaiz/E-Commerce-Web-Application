const {addNewProduct, searchProduct, searchProductByPriceRangeKey, deleteReviewFromProduct, addReviewToProduct, findProduct, deleteProduct, updateProduct} = require('../services/productService');
const {findOrder, addNewOrder, findOrderById} = require('../services/orderService.js');
const result2 = "No such order found!";

const getOrderByIdController = async (req, res) =>{                 //for user(customer)
    const {id} = req.user._id;
    const result = await findOrder(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const getSpecificOrderController = async (req, res) =>{                 //for user(customer)
    const {id} = req.params;
    const result = await findOrderById(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
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

module.exports.getOrderByIdController = getOrderByIdController;
module.exports.getSpecificOrderController = getSpecificOrderController;
module.exports.createNewOrderController = createNewOrderController;