const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Product Name: "],
        maxLength : 40,
        trim: true,
    },
    description: {
        type: String,
        maxLength : 80,
        required: [true, "Please enter Product Description: "],
        unique: true
    }, 
    price: {
        type: Number,
        required: [true, "Please enter Product Price: "]
    },
    rating: {
        type: Number,
        default: 0
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
    category: {
        type: String,
        required: [true, "Please enter Product Category: "]
    },
    stock: {
        type: Number,
        required: [true, "Please enter Product Category: "],
        maxLength: 3,
        default: 1
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                default: 0
            },
            comment: {
                type: String,
                maxLength: 60
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Product", productSchema);