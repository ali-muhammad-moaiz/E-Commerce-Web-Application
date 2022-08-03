const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    shippingnfo: {
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
    user: {
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
    itemsPrice: {
        type: Number,
        required: true
    },
    taxPrice: {
        type: Number,
        required: true
    },
    images: [
        {
            product_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
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