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

// const getProductsOfEachCategory = async (queryStr, opt)=>{
//     const apiFeature = new ApiFeatures(Product.find({}), queryStr).search(opt);

//     try{
//         const products = apiFeature.query;
//         return products;
//     }catch(err){
//         return "Product not found!";
//     }

// }

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

module.exports.getProductsByKeywordCategory = getProductsByKeywordCategory;
module.exports.addNewProduct = addNewProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.findProduct = findProduct;


