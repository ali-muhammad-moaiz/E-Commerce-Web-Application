const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingInfo: {
        address: {
            type: String,
            maxLength: 80,
            required: true
        },
        city: {
            type: String,
            maxLength: 85,
            required: true,
        },
        country: {
            type: String,
            maxLength: 85,
            required: true,
        },
        zip: {
            type: String,
            maxLength: 100,
            required: true
        },
        cellNo: {
            tpye: String,
            maxLength: 20,
            required: true
        }
    },
    customer: {
        userId:{
            type: mongoose.types.ObjectId,
            required: true,
            ref: "User"
        },
        userName:{
            type: String,
            required: true,
            ref: "User"
        }
    },
    paidAt: {
        type: Date
    },
    items:[
        {
            productId: {
                type:  mongoose.Types.ObjectId,
                required: true
            },
            price: {
                type: Number,
                required: true
            }
        }
    ],
    itemsPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    shippingPrice: {
        type: Number,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    orderStatus: {
        type: String,
        enum: ['processing', 'shipped', "delivered"],
        default: 'processing'
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    deliveredAt: {
        type: Date
    }
});

module.exports = mongoose.model("Product", productSchema);