const Product = require('../models/productModel.js');
const {ApiFeatures} = require('../utils/apifeatures');
const RESULTSPERPAGE = 5;

const searchProduct = async (key, page)=>{
    const currentPage = page || 1;
    const skip = RESULTSPERPAGE * (currentPage - 1); 
    const productCount = await Product.countDocuments(); 
    try{
        const objRes = await Product.find( { $or: [ {name:{'$regex' : key, '$options' : 'i'}},  {category: key}, {description:{'$regex' : key, '$options' : 'i'}} ] }).limit(RESULTSPERPAGE).skip(skip);
        return objRes;
    }catch(err){
        return "No such product found!";
    }
}

const searchProductByPriceRangeKey = async (key, greaterThan, lesserThan, page) =>{
    const currentPage = page || 1;
    const productCount = await Product.countDocuments();
    try{
        const skip = RESULTSPERPAGE * (currentPage - 1);   
        if(key){
            const obj = await Product.find( { $and: [ {name:{'$regex' : key, '$options' : 'i'}},  {price: {$gt : greaterThan, $lt :  lesserThan}} ] }).limit(RESULTSPERPAGE).skip(skip);
            return obj;
        }else{
            const obj = await Product.find({ price : { $gt :  greaterThan, $lt : lesserThan}}).limit(RESULTSPERPAGE).skip(skip);;
            return obj;
        }
    }catch(err){
        return "No product found in such range!";
    }
}

const findProduct = async (id)=>{
    const obj = await Product.findById(id);
    if(obj){
        return obj;
    }
}

const addNewProduct = async (newProduct, adderId) =>{
    const addProduct = new Product(
        {
            name: newProduct.name,
            description: newProduct.description,
            price: newProduct.price,
            images:{
                product_id: newProduct.images.product_id,
                url: newProduct.images.url
            },
            category: newProduct.category,
            stock: newProduct.stock,
            adminId: adderId
        }
    );
    try{
        const product = await addProduct.save();
        return product;
    }catch(err){
        return "Please input all the required data.";
    }
}

const deleteProduct = async (id)=>{
    try{
        const deletedObj = await Product.findOneAndDelete({ _id: id });
        return deletedObj;
    }catch(err){
        return "Product not found!";
    }
}

const updateProduct = async (id, updates)=>{
    try{
        const updatedObj = await Product.findOneAndUpdate({ _id: id }, updates, {new:true});
        return updatedObj;
    }catch(err){
        return "Product not found!";
    }
}

const addReviewToProduct = async (productId, review) =>{
    const product = await Product.findOne({_id : productId});
    if(!product){
        return;
    }else{
        for (let x of product.reviews) {
            if(toString(x) === toString(review.customerId)){
                const temp = await Product.findOneAndUpdate({_id: product._id}, {$pull: {reviews: {customerId: review.customerId}}}, {new: true});
                temp.save({validateBeforeSave: false});
                break;
            }
        }
        const tmp = await Product.findOneAndUpdate({_id: product._id}, {$push: {reviews: review}}, {new: true});
        const updatedObj = await updateRating(tmp);
        return updatedObj;
    }
}

const updateRating = async (product) =>{
    let sum = 0;
    for (let x of product.reviews){
        console.log(x);
        sum+= x.rating;
    }
    product.numberOfReviews = product.reviews.length;
    product.rating = (sum) / (product.numberOfReviews);
    const prod = await product.save({validateBeforeSave: false});
    if(prod){
        return prod;
    }
}

const deleteReviewFromProduct = async ( productId, customerId ) => {
    const product = await Product.findOne({_id : productId});
    if(!product){
        return;
    }else{
        let temp;
        for (let x of product.reviews) {
            if(toString(x.customerId) === toString(customerId)){
                temp = await Product.findOneAndUpdate({_id: productId}, {$pull: {reviews: {customerId: customerId}}}, {new: true});
                await product.save({validateBeforeSave: false});
                break;
            }
        }
        if(temp){
            const tmp = await updateRating(temp);
            return tmp;
        }
        return product;
    }
}

module.exports.addNewProduct = addNewProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.findProduct = findProduct;
module.exports.addReviewToProduct = addReviewToProduct;
module.exports.deleteReviewFromProduct = deleteReviewFromProduct;
module.exports.searchProductByPriceRangeKey = searchProductByPriceRangeKey;
module.exports.searchProduct = searchProduct;               //for getting the product by key = Name || Category