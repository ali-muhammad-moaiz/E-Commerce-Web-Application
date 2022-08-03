const {addNewProduct, searchProduct, searchProductByPriceRangeKey, deleteReviewFromProduct, addReviewToProduct, findProduct, deleteProduct, updateProduct} = require('../services/productService');
const {findOrder, addNewOrder} = require('../services/orderService.js');
const result2 = "No such order found!";

const getOrderByIdController = async (req, res) =>{                 //for user(customer)
    const {id} = req.query;
    const result = await findOrder(id);
    if(!result)
        return res.status(404).json({'message':result2});
    return res.status(200).json({'message':result});
}

const createNewOrderController = async (req, res) =>{
    const pId = req.body.pId; //product Id
    const prodTmp = await findProduct(pId);

    const product = {
        shippingInfo: {
            address: req.body.address,
            city: req.body.city,
            country: req.body.country,
            zip: req.body.zip,
            cellNo: req.body.cellNo,
        },

        customer: {
            userId: req.user._id,
            userName: req.user.userName,
        },

        item: {
            productId: pId,
            price: prodTmp.price
        },

        itemsPrice: prodTmp.price,
        taxPrice: itemsPrice*18/100,      //assumed tax as 18%
        shippingPrice: 1000, 
        totalPrice: itemsPrice + taxPrice + shippingPrice
    }
    
    const result = await addNewOrder(pId, product);
    if(!result)
        return res.status(400).json({'message':result2});
    console.log("Product added in database.");
    return res.status(201).json({'message':result});
}

module.exports.getOrderByIdController = getOrderByIdController;
module.exports.createNewOrderController = createNewOrderController;