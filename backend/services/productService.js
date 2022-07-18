const Product = require('../models/productModel.js')
const {ApiFeatures} = require('../utils/apifeatures');

const getProductsByKeywordCategory = async (queryStr, opt)=>{
    const apiFeature = new ApiFeatures(Product.find({}), queryStr).search(opt);
    
    try{
        const products = apiFeature.query;
        return products;
    }catch(err){
        return "Product not found!";
    }
}

const searchProduct = async (key)=>{
    const obj1 = await Product.find({name:{'$regex' : key, '$options' : 'i'}});
    const obj2 = await Product.find({'category': key});
    const obj3 = await Product.find({description:{'$regex' : key, '$options' : 'i'}});

    if(obj1 || obj2 || obj3){
        let objRes = [];
        if(obj1)
            objRes.push(obj1);
        if(obj2)
            objRes.push(obj2);
        if(obj3)
            objRes.push(obj3);

        return objRes;
    }else{
        return "Product not found!";
    }
}

const searchProductByPriceRangeKey = async (key, greaterThan, lesserThan) =>{
    try{
        if(key){
            const obj = await Product.find( { $and: [ {name:{'$regex' : key, '$options' : 'i'}},  {price: {$gt : greaterThan, $lt :  lesserThan}} ] });
            return obj;
        }else{
            const obj = await Product.find({ price : { $gt :  greaterThan, $lt : lesserThan}});
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
	    category: newProduct.category
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