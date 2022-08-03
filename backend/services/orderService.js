const Order = require('../models/orderModel.js');

const addNewOrder = async (order) =>{
    const addOrder = new Order(order);

    const orderAdded = await addOrder.save();
    if(orderAdded){
        return orderAdded;
    }
}

const findOrder = async (userId) =>{
    try{
        const obj = await Order.find({userId});
        return obj;
    }catch(err){
        console.log(err);
    }
}

module.exports.addNewOrder = addNewOrder;
module.exports.findOrder = findOrder;