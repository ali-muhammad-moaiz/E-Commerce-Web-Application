const Product = require('../models/productModel.js');
const {ApiFeatures} = require('../utils/apifeatures');
const RESULTSPERPAGE = 5;

const getProductsByKeywordCategory = async (queryStr, opt)=>{
    const apiFeature = new ApiFeatures(Product.find({}), queryStr).search(opt);
    
    try{
        const products = apiFeature.query;
        return products;
    }catch(err){
        return "Product not found!";
    }
}

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
    try{
        const obj = await Product.findById(id);
        return obj;
    }catch(err){
        return "Product not found!";
    }
}

const addNewProduct = async (newProduct) =>{
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
            stock: newProduct.stock
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

module.exports.addNewProduct = addNewProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.findProduct = findProduct;
module.exports.searchProductByPriceRangeKey = searchProductByPriceRangeKey;
module.exports.searchProduct = searchProduct;           //for getting the product by key = Name || Category