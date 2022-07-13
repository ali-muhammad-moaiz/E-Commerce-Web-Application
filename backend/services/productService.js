const Product = require('../models/productModel.js')

const getAllProducts = async ()=>{
    const objs = await Product.find({});
    return objs;
}

const findProduct = async (id)=>{
    const obj = await Product.findById(id);
    return obj;
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
    const product = await addProduct.save();
    return product;
}

const deleteProduct = async (id)=>{
    const deletedObj = await Product.findOneAndDelete({ _id: id });
    if(!deletedObj)
        return "Product Not found!";
    return deletedObj;
}

const updateProduct = async (id, updates)=>{
    const updatedObj = await Product.findOneAndUpdate({ _id: id }, updates, {new:true});
    if(!updatedObj)
        return "Product Not found!";
    
    return updatedObj;
}

module.exports.getAllProducts = getAllProducts;
module.exports.addNewProduct = addNewProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.updateProduct = updateProduct;
module.exports.findProduct = findProduct;


